/* Inicialització en català per a l'extensió 'UI date picker' per jQuery. */
/* Writers: (joan.leon@gmail.com). */
(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define([ "../datepicker" ], factory );
	} else {

		// Browser globals
		factory( jQuery.datepicker );
	}
}(function( datepicker ) {

datepicker.regional['ca'] = {
	closeText: 'Tanca',
	prevText: 'Anterior',
	nextText: 'Següent',
	currentText: 'Avui',
	monthNames: ['Gener','Febrer','Març','Abril','Maig','Juny',
	'Juliol','Agost','Setembre','Octubre','Novembre','Desembre'],
	monthNamesShort: ['gen','feb','març','abr','maig','juny',
	'jul','ag','set','oct','nov','des'],
	dayNames: ['Diumenge','Dilluns','Dimarts','Dimecres','Dijous','Divendres','Dissabte'],
	dayNamesShort: ['dg','dl','dt','dc','dj','dv','ds'],
	dayNamesMin: ['dg','dl','dt','dc','dj','dv','ds'],
	weekHeader: 'Set',
	dateFormat: "d/m/yy",
	firstDay: 1,
	isRTL: false,
	showMonthAfterYear: false,
	yearSuffix: ''};
datepicker.setDefaults(datepicker.regional['ca']);

return datepicker.regional['ca'];

}));