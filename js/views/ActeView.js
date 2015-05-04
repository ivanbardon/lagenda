var acteView;
//vista de un dia concreto
var ActeView = Backbone.View.extend({
    template: _.template($('#acte_template').html()),
    events: {
        'click' : "_click",
    },
    initialize: function () {
        this.render();
    },
    render:function (eventName) {
        $(this.$el).html(this.template(this.model.toJSON()));
        return this;
    },
    _click:function(e){
        
    }
});

//2º hago la vista para toda la colección
var BotoActeView = Backbone.View.extend({
    events: {
		'click' : "_click",
	},
    initialize: function () {
		this.render();
	},
     render: function(){
       var el = $(this.el);
       this.collection.each(function(model){
            var template = _.template($('#dia_template').html());
            var html = template(model.toJSON());
            el.append(html);
        });
    },
    _click:function(e){
        e.preventDefault();
        var id = $(e.target).data("id");
        var item = this.collection.get(id);
        var el = $(e.target);
        if(item != undefined){
            if(el.hasClass("panel_seleccionado")){
                $.seleccionado = undefined;
                el.removeClass("panel_seleccionado");
            }
            else{
                el.addClass("panel_seleccionado");
                el.siblings().hide();

                if($.seleccionado != undefined){
                    $.seleccionado.removeClass("panel_seleccionado");
                }
                $.seleccionado = el;
                
                if(acteView != undefined){
                    acteView.undelegateEvents();
                }
                // Definim una vista pasanli el contenedor i el item seleccionat
                acteView = new ActeView({el:$('#contenedor'), model: item});
            }
        }
    }
});
