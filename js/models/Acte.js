var Acte = Backbone.Model.extend(
    {
        url: function(){
            return "index.php/actes/" + encodeURIComponent(this.nom);
        },
        initialize: function(model){
            
        }
    }
);