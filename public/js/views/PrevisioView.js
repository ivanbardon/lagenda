var PrevisioView = Backbone.View.extend({
	template: _.template($('#previsio_template').html()),

	initialize: function(){

		this.render();

	},
	render: function(){
		var el = $(this.el);
		this.collection.each(function (model){
				var template = _.template($('#previsio_template').html());
				var html = template(model.toJSON());
				el.append(html);				
		});
		el.children().first().find('p').html('Avui');
	}
});