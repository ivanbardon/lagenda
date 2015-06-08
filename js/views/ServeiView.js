var ServeiView = Backbone.View.extend({
	template: _.template($('#servei_template').html()),

	initialize: function(){
		this.render();
	},
	render: function(){
       var el = $(this.el);
       el.append('<a href="https://ws1.ics.gencat.cat/VisitesIServeis/programacio_visites/Visites.aspx"><img src="images/visites.png" /></a>');
       this.collection.each(function(model){
            var template = _.template($('#servei_template').html());
            var html = template(model.toJSON());
            el.append(html);
        });
    },
}

);