var RoundView = Backbone.View.extend({
	el: $('#bac-container'),
	model: Round,
	url: '/url',
	template: _.template($('#bacTemplate').html()),
	initialize: function() {
		this.render();
	},
	render: function() {
    this.$el.html(this.template());
    return this;
	}
});

console.log('RoundView');