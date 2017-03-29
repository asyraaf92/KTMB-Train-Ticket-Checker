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
		format: 'dd-mmm-yyyy',
	});


	// ---------------------- API PROCESSES ---------------------------

	// ------------------ Populate Origin select box ------------------
	$.getJSON("./api.php?option=GetOrigin", function(data){
		// show loading
		$('.se-pre-con').fadeIn('slow');

		var states = "";
        $.each(data, function(state, obj){
        	var up = "<optgroup label='"+state+"'>";
        	var options= "";

        	for(var i=0;i<obj.length;i++)
        	{
        		options += "<option value='"+obj[i].Code+"'>"+obj[i].Nama+"</option>";
        	}

        	var down = "</optgroup>";

        	states += up+options+down;
            
        });

        // append to select box
        $("#originSelect").append(states);
    	$('#originSelect').material_select();

    	// hide loading
		$('.se-pre-con').fadeOut('slow');
    });


	// ------------------ Populate Destination select box ------------------
	$('#originSelect').change(function(){

		// clear previous data before append new one
		$('#destSelect').empty();
		$('#destSelect').append('<option value="" disabled selected>Select Destination</option>');

		var originCode = $('#originSelect').val();

		$.getJSON("./api.php?option=GetDest&Origin="+originCode, function(data){
			// show loading
			$('.se-pre-con').fadeIn('slow');

			var states = "";
	        $.each(data, function(state, obj){
	        	var up = "<optgroup label='"+state+"'>";
	        	var options= "";

	        	for(var i=0;i<obj.length;i++)
	        	{
	        		options += "<option value='"+obj[i].Code+"'>"+obj[i].Nama+"</option>";
	        	}

	        	var down = "</optgroup>";

	        	states += up+options+down;
	            
	        });

	        // append to select box
	        $("#destSelect").append(states);
	    	$('#destSelect').material_select();

	    	// hide loading
			$('.se-pre-con').fadeOut('slow');
	    });
	});


	// ------------------ Get train list ------------------
	$('#datepicker').change(function(){

		var originCode = $('#originSelect').val();
		var destCode = $('#destSelect').val();
		var date = $('#datepicker').val();

		if(originCode == null || destCode == null)
		{
			alert("select all first");
		}
		else
		{
			alert("yay");
		}


	});

});