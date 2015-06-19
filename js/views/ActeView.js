//1º hago la vista para toda la colección de actos
var ActeView = Backbone.View.extend({

    initialize: function () {
		this.render();
        var el = $(this.el);
        el.children().click(function (e){
            
            e.stopPropagation();
            el.find('article').slideUp('fast');

            if ($(this).find('article').css('display')==='none'){
                $(this).find('article').slideDown('fast');
            };
            body.stop(true,true).animate(
            {
              //realizamos la animacion hacia el ancla
              scrollTop: listado.offset().top
            },500);
        })
	},
    render: function(){
        var el = $(this.el);
        this.collection.each(function (model){
            var template = _.template($('#dia_template').html());
            var html = template(model.toJSON());
            el.append(html);
        });
    }
});
