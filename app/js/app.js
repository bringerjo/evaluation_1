(function main() {


// Empty value field input on click.
$('.ipt').click(function(){
	$(this).val("");
});



//Add line to earnings.
$('#earnings-btn--addLine').click(function(){
	$(".earnings").append("<div class='earnings-information'>" + "<label>" + "Autres" + "</label>" + "<div class='input'>" + "<input type='number' class='ipt' id='field-earningsAdd' name='others' value='0'>" + "</div>" + "</div>");
		//Remove value input add on click.
		$('#field-earningsAdd').click(function(){
			$(this).val("");
		});
});

//Add line to spendings.
$('#spending4-btn--addLine').click(function(){
	$(".add-spending").append("<div class='spending-information'>" + "<label>" + "Autres" + "</label>" + "<div class='input'>" + "<input type='number' class='ipt' id='field-spendingsAdd' name='exit' value='0'>" + "</div>" + "</div>");
		//Remove value input on click.
		$('#field-spendingsAdd').click(function(){
			$(this).val("");
		});
});

//Add line to saving.
$('#saving-btn--addLine').click(function(){
	$(".saving").append("<div class='saving-titleAdd'>" + "<label>" + "Autre épargne" + "</label>" + "<div class='input'>" + "<input type='number' class='ipt' id='field-savingAdd' name='saving' value='0'>" + "</div>" + "</div>");
		//On click on input empty input. 
		$('#field-savingAdd').click(function(){
			$(this).val("");
		});
});

//Calculate budget on click
$('#btn-calculate').click(function(){
	
	//to alert if the 3 mandatory fields are empty
	if ($('#field-rent').val() == 0 || $('#field-water').val() == 0 || $('#field-tel').val() == 0) {
		alert("Un des champs obligatoire est vide.")
		return false;
	};

	//Get and add earnings and display in html "Total revenus".
	var $earnings = $('#field-salary, #field-help, #field-annuities, #field-others');
	var resultEarnings = 0;

	$earnings.each(function(){
		resultEarnings += parseFloat($(this).val());
	});
	$(".total_earnings p").html(resultEarnings);

	//Calculate food at month
	var calculFood = $('#field-food').val();
	var resultFood = calculFood * 4.33;
	//Calculate Gazoil/transport at month.
	var calculTransport = $('#field-transport').val();
	var resultTransport = calculTransport * 4.33;
	//Calculate activity at month.
	var calculActivity = $('#field-activity').val();
	var resultActivity = calculActivity / 12 ;
	//Calculate exit at month.
	var calculExit = $('#field-exit').val();
	var resultExit = calculExit * 4.33;
	//Get and add spendings and display in html "Total dépenses".
	var $spendings = $('#field-rent,#field-credits,#field-water,#field-tel,#field-homeInsurance,#field-vehicleInsurance,#field-careExpenses,#field-incomeTaxes,#field-localTaxes');
	var resultSpendings = 0;
	var totalSpending = 0;

	$spendings.each(function(){
		resultSpendings += parseFloat($(this).val());
		totalSpending = resultSpendings + resultFood + resultTransport + resultActivity + resultExit;
		totalSpending = Math.round(totalSpending);
	});
	$(".total_spending p").html(totalSpending);

	//Get and add saving and display in html "Total épargne(s)".
	var $saving = $('#field-saving');
	var resultSaving = 0;

	$saving.each(function(){
		resultSaving += parseFloat($(this).val());
	});
	$(".total_saving p").html(resultSaving);

	//Add earnings and savings
	function add(a, b){
		return a+b;
	}
	var addition = (add(resultEarnings,resultSaving));

	//Subtracte total of earnings and savings to spendings and display result in html
	function subtraction(a, b){
		return a-b;
	}
	var result = (subtraction(addition,totalSpending));
	$(".total_budget p").html(result);
	

	//display message according to the budget.
	if (result < 0) {
		$(".proposed-activity").html("<p>"+"Il vous reste: "+ result + " € " + "</p>" + "<p>" + "Malheureusement il va falloir faire des économie le mois prochain." + "</p>");
	}else if (result > 0 && result< 100 ) {
		$(".proposed-activity").html("<p>"+"Il vous reste: "+ result + " € " + "</p>" + "<p>" + "Pourquoi pas aller au cinéma ou mettre l'argent de coté." + "</p>");
	}else if (result >=100 && result< 500 ) {
		$(".proposed-activity").html("<p>"+"Il vous reste: "+ result + " € " + "</p>" + "<p>" + "Pourquoi pas se faire un bon restaurant." + "</p>");
	}else if (result >=500) {
		$(".proposed-activity").html("<p>"+"Il vous reste: "+ result + " € " + "</p>" + "<p>" + "Un petit week end ferai peut-être du bien." + "</p>");
	}else if (result = 0) {
		$(".proposed-activity").html("<p>"+"Il vous reste: "+ result + " € " + "</p>" + "<p>" + "Malheureusement il va falloir ce serrer la ceinture." + "</p>");
	};

});//Fin .click "Calculer".

// Fonctionality button reset.
$('#btn-reset').click(function(){
	$(".ipt").val("0");
});

})();//Fin function main