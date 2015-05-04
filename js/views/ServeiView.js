var ServeiView = Backbone.View.extend(
{
	template: _.template($('#servei_template').html()),

	initialize: function(){
		this.render();
	},
	render: function(){
       var el = $(this.el);
       this.collection.each(function(model){
            var template = _.template($('#servei_template').html());
            var html = template(model.toJSON());
            el.append(html);
        });
    },
}

);