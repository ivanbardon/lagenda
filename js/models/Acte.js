var Acte = Backbone.Model.extend({

    url: "index.php/actes",
    defaults: {
        diaNum : ""
    },

    initialize: function(model){

    	var fixHora = this.get('hora').slice(0, -3);
    	var fixDate = this.get('dia').split('-');
        var fixNum = this.get('dia').slice(8)

    	if(fixDate[1].indexOf('0')==0){
    		var fixMes = fixDate[1].slice(1)
    	}else{
    		var fixMes = fixDate[1];
    	};
    	if(fixDate[2].indexOf('0')==0){
    		var fixDia = fixDate[2].slice(1)
    	}else{
    		var fixDia = fixDate[2]
    	};
    	var fixFecha = fixDia+'/'+fixMes+'/'+fixDate[0];
    	
    	this.set('dia', fixFecha);
        this.set('hora', fixHora);
    	this.set('diaNum', fixNum);
        
    }
});