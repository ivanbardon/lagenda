var Noticia = Backbone.Model.extend({
	defaults: {
		"titul":"",
		"text1": ""
	},
	initialize: function(model){
		var tituls = this.get('content').split("\n")[1];
		var text1 = this.attributes.description.content.slice(0,-3);

		this.set('titul', tituls);
		this.set('text1', text1);
		// console.log(model)

	}
});