var Noticia = Backbone.Model.extend({
	defaults: {
		"titul":"",
		"text": ""
	},
	initialize: function(model){

		this.set('titul', this.get('titul'));
		this.set('text1', this.get('text'));

	}
});