$(document).ready(function() {

	// initialize select box
    $('select').material_select();

    // initialize datepicker
	$('.datepicker').pickadate({
		onSet: function( arg ){
	        if ( 'select' in arg ){ //prevent closing on selecting month/year
	            this.close();
	        }
	    },
		onClose: function(){
	        $(document.activeElement).blur()
	    },
		selectMonths: true, // Creates a dropdown to control month
		selectYears: 15, // Creates a dropdown of 15 years to control year
		format: 'dd/mm/yyyy',
	});

	// initialize modal
	$('.modal').modal();


	// ---------------------- API PROCESSES ---------------------------

  // --------------------- JS Group By function ---------------------
  // thanks to https://www.consolelog.io/group-by-in-javascript/
  Array.prototype.groupBy = function(prop) {
    return this.reduce(function(groups, item) {
      const val = item[prop]
      groups[val] = groups[val] || []
      groups[val].push(item)
      return groups
    }, {})
  }

  $.postJSON = function(url, data, callback) {
      return jQuery.ajax({
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      'type': 'POST',
      'url': url,
      'data': JSON.stringify(data),
      'dataType': 'json',
      'success': callback
      });
  };

	// ------------------ Populate Origin select box ------------------
	setTimeout(function(){
		// show loading
		$('.se-pre-con').fadeIn('slow');

		$.getJSON("https://eticket.ktmb.com.my/e-ticket/api/ondlist", function(data){
      var data = data.groupBy('STATE');
			var states = "";
	        $.each(data, function(state, obj){
	        	var up = "<optgroup label='"+state+"'>";
	        	var options= "";

	        	for(var i=0;i<obj.length;i++)
	        	{
	        		options += "<option value='"+obj[i].CODE+"'>"+obj[i].NAME+"</option>";
	        	}

	        	var down = "</optgroup>";

	        	states += up+options+down;
	        });

	        // add additional options, temp fix for select box overlap under footer bug.
	        var addop = '<option value="" disabled></option><option value="" disabled></option>';

	        // append to select box
	        $("#originSelect").append(states+addop);
	    	  $('#originSelect').material_select();
	    })
	    .done(function() {
			// hide loading
			$('.se-pre-con').fadeOut('slow');

			Materialize.toast('Origins loaded.', 2500, 'green');
		})
		.fail(function() {
			// hide loading
			$('.se-pre-con').fadeOut('slow');

			Materialize.toast('Error! Failed to load contents.', 2500, 'red');
		});

		// remove animation class after animation executes. this cause a bug to date picker
		$("#searchBar").removeClass('animated');

	}, 500); // set timeout to allow animation effects first, then execute this function



	// ------------------ Populate Destination select box ------------------
	$('#originSelect').change(function(){
		// show loading
		$('.se-pre-con').fadeIn('slow');

		// clear previous data before append new one
		$('#destSelect').empty();
		$('#destSelect').append('<option value="" disabled selected>Select Destination</option>');
		$('#trainList').empty();

		var originCode = $('#originSelect').val();

		$.getJSON("https://eticket.ktmb.com.my/e-ticket/api/ondlist?origincode="+originCode, function(data){
      var data = data.groupBy('STATE');
      var states = "";
	        $.each(data, function(state, obj){
	        	var up = "<optgroup label='"+state+"'>";
	        	var options= "";

	        	for(var i=0;i<obj.length;i++)
	        	{
	        		options += "<option value='"+obj[i].CODE+"'>"+obj[i].NAME+"</option>";
	        	}

	        	var down = "</optgroup>";

	        	states += up+options+down;

	        });

	        // add additional options, temp fix for select box overlap under footer bug.
        	var addop = '<option value="" disabled></option><option value="" disabled></option>';

	        // append to select box
	        $("#destSelect").append(states+addop);
	    	$('#destSelect').material_select();
	    })
	    .done(function() {
			// hide loading
			$('.se-pre-con').fadeOut('slow');

			Materialize.toast('Destinations loaded.', 2500, 'green');
		})
		.fail(function() {
			// hide loading
			$('.se-pre-con').fadeOut('slow');

			Materialize.toast('Error! Failed to load contents.', 2500, 'red');
		});
	});

	// ------------- Focus to date picker and show message to select date ---------------
	$('#destSelect').change(function(){
		// clear previous train list before append new
		$('#trainList').empty();
		$('#datepicker').focus();
		Materialize.toast('Please choose the travel date', 2500);
	});


	// ------------------ Get train list ------------------
	$('#datepicker').change(function(){
		// show loading
		$('.se-pre-con').fadeIn('slow');

		// clear previous train list before append new
		$('#trainList').empty();

		var originCode = $('#originSelect').val();
		var destCode = $('#destSelect').val();
		var date = $('#datepicker').val();
    // for future features, able to set number of passengers
    var adult = 1;
    var child = 0;

		if(originCode != null || destCode != null)
		{
      var params = {Origin:originCode,Destination:destCode,DateJourney:date,Direction:"O",NoAdult:adult,Nochild:child};

			$.postJSON('https://eticket.ktmb.com.my/e-ticket/api/GETCONNECTINGV2', params, function(data){
				var sep = "<br><hr><br>";
				var cards = "";
				var delay = 0.4;

            if(data['ConnectingList'][0]['TripList'] != null)
            {
  		        $.each(data['ConnectingList'][0]['TripList'], function(index, obj){

  		        	var arrival = obj.ArrivalTime;
  		        	var departure = obj.DepartureTime;
                var duration = obj.Duration;
  		        	var trainnum = obj.TrainNumber;
  		        	var trainname = obj.TrainName;
                var coachname = obj.CoachName;
                var coachcode = obj.CoachCode;
                var fareadult = obj.SeatFareAdult;
                var farechild = obj.SeatFareChild;

  		        	cards += '<div class="row">'+
  								'<div class="col s12">'+
  									'<div class="card animated fadeInLeft" style="animation-delay: '+delay+'s;">'+
  										'<div class="card-content">'+
  											'<span class="card-title"><b>'+trainname+' ('+trainnum+') - '+coachname+' ('+coachcode+')</b></span>'+
  											'<table>'+
  												'<tr>'+
  													'<th>Departure</th><td> : </td><td>'+ departure + '</td>'+
  												'</tr>'+
  												'<tr>'+
  													'<th>Arrival</th><td> : </td><td>' + arrival + '</td>'+
  												'</tr>'+
                          '<tr>'+
  													'<th>Duration</th><td> : </td><td>' + duration + '</td>'+
  												'</tr>'+
                          '<tr>'+
  													'<th>Fare</th><td> : </td>'+
                            '<td><ul><li>Adult <b>(' + fareadult + ')</b></li><li>Child <b>(' + farechild + ')</b></li></ul></td>'+
  												'</tr>'+
  											'</table>'+
  										'</div>'+
  										'<div class="card-action">'+
  											'<button class="waves-effect waves-light btn blue darken-2" id="showCoach" value="'+trainnum+'" value2="'+coachcode+'"><i class="material-icons left">view_list</i>Show Coach</button>'+
  										'</div>'+
  									'</div>'+
  								'</div>'+
  							'</div>';

      					// increase delay time for each cards
      					delay += 0.4;

  		        });

  		        // append train list
  		        $('#trainList').append(sep+cards);
            }
            else
            {
              $('#trainList').append(sep+'<h4 class="header"><i>No trains available :(</i></h4>');
            }
		    })
			.done(function() {
				// hide loading
				$('.se-pre-con').fadeOut('slow');

				Materialize.toast('Trains and Coaches loaded.', 2500, 'green');
			})
			.fail(function() {
				// hide loading
				$('.se-pre-con').fadeOut('slow');

				Materialize.toast('Error! Failed to load trains list. Please try again later.', 2500, 'red');
			});
		}
		else
		{
			// hide loading
			$('.se-pre-con').fadeOut('slow');

			Materialize.toast('Error! Please select both Origin and Destination.', 2500, 'red');
		}
	});


	// ------------------ Show coach details ------------------
	$(document).on('click','#showCoach',function(){
		// empty/clear previous data before append new one
		$('#coachDetail').empty();

		var originCode = $('#originSelect').val();
		var destCode = $('#destSelect').val();
		var date = $('#datepicker').val();
		var trainnum = $(this).val();
    var coachcode = $(this).attr('value2');

		// show progress bar
		$('.progress').fadeIn('slow');

		// open modal
		$('#coachModal').modal('open');

		$.getJSON("https://eticket.ktmb.com.my/e-ticket/api/LABELLIST?OriginCode="+originCode+"&DestinationCode="+destCode+"&DateJourney="+date+"&TrainNumber="+trainnum+"&CoachCode="+coachcode, function(data){

			var table = "<table class='striped centered'>"+
                    "<thead><tr>"+
                      "<th>Coach Label</th>"+
                      "<th>Availability</th>"+
                    "</tr></thead><tbody>";

	        $.each(data, function(index, obj){

	        	var labelname = obj.LABEL_NAME;
	        	var availability = obj.AVAILBILIITY;

	        	table += "<tr>"+
					   			     "<td>"+labelname+"</td>"+
                       "<td>"+availability+"</td>"+
					   		     "</tr>";

	        });

          table += "</tbody></table>";

	        // append coach detail
	        $('#coachDetail').append(table);
	    })
	    .done(function() {
			// hide loading
			$('.progress').fadeOut('slow');

			Materialize.toast('Coach details loaded.', 2500, 'green');
		})
		.fail(function() {
			// hide loading
			$('.progress').fadeOut('slow');

			Materialize.toast('Error! Failed to load contents.', 2500, 'red');

			// open modal
			$('#coachModal').modal('close');
		});
	});

});
