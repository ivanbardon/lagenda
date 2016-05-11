var Acte = Backbone.Model.extend({

    url: "index.php/actes",

    initialize: function(model){

        var fixDate = this.get('dia').split('-');
        var fixHora = this.get('hora').slice(0, -3);
        
        var fixFecha = fixDate[2]+'/'+fixDate[1]+'/'+fixDate[0];

        this.set('dia', fixFecha);
        this.set('hora', fixHora);

        if (diasConActos.indexOf(this.get('diaNum')) == -1){
            diasConActos.push(this.get('diaNum'))
        }

    }
});