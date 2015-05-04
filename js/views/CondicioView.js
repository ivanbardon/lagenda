var CondicioView = Backbone.View.extend(
{
	template: _.template($('#condicio_template').html()),

	initialize: function(){
		this.render();
	},
	render: function(){
       var el = $(this.el);
       this.collection.each(function(model){
            var template = _.template($('#condicio_template').html());
            var html = template(model.toJSON());
            el.append(html);
        });
    },
}

);