var Condicio = Backbone.Model.extend({

	initialize: function(){
		var codi = this.get('code');
		var icono1 = $('#meteo_icon');
		var icono2 = $('#icono_actual_weather');

		if (codi=='26'||codi=='27'||codi=='28'||codi=='29'||codi=='30'||codi=='33'||codi=='44'){
			icono1.addClass('icon-solinubol');
			icono2.addClass('icon-solinubol');
			this.set('text','Sol i nubol')
		}else if (codi=='31'||codi=='32'||codi=='34'){
			icono1.addClass('icon-sol');
			icono2.addClass('icon-sol');
			this.set('text','Calor')
		}else if (codi=='0'||codi=='1'||codi=='2'||codi=='24'||codi=='18'||codi=='19'||codi=='20'||codi=='21'||codi=='22'||codi=='23'){
			icono1.addClass('icon-vent');
			icono2.addClass('icon-vent');
			this.set('text','fa Vent')
		}else if (codi=='3'||codi=='4'||codi=='37'||codi=='38'||codi=='39'||codi=='40'||codi=='45'||codi=='47'){
			icono1.addClass('icon-trons');
			icono2.addClass('icon-trons');
			this.set('text','Plou i trona')
		}else if (codi=='7'||codi=='13'||codi=='14'||codi=='15'||codi=='16'||codi=='41'||codi=='42'||codi=='43'||codi=='46'){
			icono1.addClass('icon-neu');
			icono2.addClass('icon-neu');
			this.set('text','Neva')
		}else if (codi=='6'||codi=='8'||codi=='9'||codi=='10'||codi=='11'){
			icono1.addClass('icon-pluja');
			icono2.addClass('icon-pluja');
			this.set('text','Plou')
		}else if (codi=='12'){
			icono1.addClass('icon-moltapluja');
			icono2.addClass('icon-moltapluja');
			this.set('text','Plou fort')
		}
	}
});