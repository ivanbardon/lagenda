var Acte = Backbone.Model.extend({

    url: "index.php/actes",

    initialize: function(model){

    	var fixHora = this.get('hora').slice(0, -3);
    	var fixDate = this.get('dia').split('-');

    	if(fixDate[1].indexOf('0')==0){
    		var fixMes = fixDate[1].substr(1,1)
    	}else{
    		var fixMes = fixDate[1];
    	};
    	if(fixDate[2].indexOf('0')==0){
    		var fixDia = fixDate[2].substr(1,1)
    	}else{
    		var fixDia = fixDate[2]
    	};
    	var aux = fixDia+'/'+fixMes+'/'+fixDate[0];
    	
    	this.set('dia', aux);
    	this.set('hora', fixHora);
    }
});