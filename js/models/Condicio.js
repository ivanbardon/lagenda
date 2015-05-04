var Condicio = Backbone.Model.extend({

	initialize: function(){
		if (this.get('code')==26||27||28||29||30||44){
			$('#meteo_icon').addClass('icon-solinubol');
			$('#icono_actual_weather').addClass('icon-solinubol')
		}else if (this.get('code')==31||32){
			$('#meteo_icon').addClass('icon-sol');
			$('#icono_actual_weather').addClass('icon-sol')
		}else if (this.get('code')==0||1||2||24||18||19||20||21||22||23){
			$('#meteo_icon').addClass('icon-vent');
			$('#icono_actual_weather').addClass('icon-vent')
		}else if (this.get('code')==3||4||37||38||39||40||45||47){
			$('#meteo_icon').addClass('icon-trons');
			$('#icono_actual_weather').addClass('icon-trons')
		}else if (this.get('code')==7||13||14||15||16||41||42||43||46){
			$('#meteo_icon').addClass('icon-neu');
			$('#icono_actual_weather').addClass('icon-neu')
		}else if (this.get('code')==6||8||9||10){
			$('#meteo_icon').addClass('icon-pluja');
			$('#icono_actual_weather').addClass('icon-pluja')
		}else if (this.get('code')==11||12){
			$('#meteo_icon').addClass('icon-moltapluja');
			$('#icono_actual_weather').addClass('icon-moltapluja')
		}
	}
});