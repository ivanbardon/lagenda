var Acte = Backbone.Model.extend({

    url: "index.php/actes",

    initialize: function(model){

        var fixDate = this.get('dia').split('-');
        var fixHora = this.get('hora').slice(0, -3);
        var fixDia = fixDate[2];
        
        var fixFecha = fixDia+'/'+fixDate[1]+'/'+fixDate[0];

        this.set('dia', fixFecha);
        this.set('hora', fixHora);

    }
});