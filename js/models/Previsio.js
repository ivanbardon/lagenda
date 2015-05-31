var Previsio = Backbone.Model.extend({
	defaults: {
		"clase": "" 
	},

	initialize: function(model){
		var codi = this.get('code');
		var dia = this.get('day');

		if (dia=="Mon"){
			this.set('day','Dilluns')

		}else if (dia=="Tue"){
			this.set('day','Dimarts')
		}else if (dia=="Wed"){
			this.set('day','Dimecres')
		}else if (dia=="Thu"){
			this.set('day','Dijous')
		}else if (dia=="Fri"){
			this.set('day','Divendres')
		}else if (dia=="Sat"){
			this.set('day','Dissabte')
		}else if (dia=="Sun"){
			this.set('day','Diumenge')
		};

		if (codi=='26'||codi=='27'||codi=='28'||codi=='29'||codi=='30'||codi=='44'){
			this.set('clase','icon-solinubol')
			this.set('text','Sol i nubol')
		}else if (codi=='31'||codi=='32'||codi=='33'||codi=='34'){
			this.set('clase','icon-sol')
			this.set('text','Calor')
		}else if (codi=='0'||codi=='1'||codi=='2'||codi=='24'||codi=='18'||codi=='19'||codi=='20'||codi=='21'||codi=='22'||codi=='23'){
			this.set('clase','icon-vent')
			this.set('text','una mica de vent')
		}else if (codi=='3'||codi=='4'||codi=='37'||codi=='38'||codi=='39'||codi=='40'||codi=='45'||codi=='47'){
			this.set('clase','icon-trons')
			this.set('text','Pluja i trons')
		}else if (codi=='7'||codi=='13'||codi=='14'||codi=='15'||codi=='16'||codi=='41'||codi=='42'||codi=='43'||codi=='46'){
			this.set('clase','icon-neu')
			this.set('text','Neu')
		}else if (codi=='6'||codi=='8'||codi=='9'||codi=='10'){
			icono.addClass('icon-pluja')
			icono.textass('Pluja suau')
		}else if (codi=='11'||codi=='12'){
			this.set('clase','icon-moltapluja')
			this.set('text','Plou fort')
		}
	}
});