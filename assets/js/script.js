$(document).ready(function() {


	// initialize select box
    $('select').material_select();

    // initialize datepicker
	$('.datepicker').pickadate({
		onClose: function(){
	        $(document.activeElement).blur()
	    },
		selectMonths: true, // Creates a dropdown to control month
		selectYears: 15, // Creates a dropdown of 15 years to control year
		format: 'dd-mmm-yyyy',
	});



});