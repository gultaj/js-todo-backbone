
var app = app || {};

app.TodoView = Backbone.View.extend({
	tagName: 'li',

	template: _.template($('#item-template').html()),

	events: {
		'click .toggle': 'toggleCompleted',
		'dblclick label': 'edit',
		'click .destroy': 'clear',
		'keypress .edit': 'updateOnEnter',
		'blur .edit': 'close'
	},

	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
		this.listenTo(this.model, 'visible', this.toggleVisible);
	},

	render: function() {
		this.$el.html(this.template(this.model.attributes));

		this.$el.toggleClass('completed', this.model.get('completed'));
		this.toggleVisible();

		this.$input = this.$('.edit');
		return this;
	},

	toggleVisible: function() {
		this.$el.toggleClass('hidden', this.isHidden());
	},

	isHidden: function() {
		var isCompleted = this.model.get('completed');

		return ((!isCompleted && app.TodoFilter === 'completed') || (isCompleted && app.TodoFilter === 'active'));
	},

	edit: function() {
		this.$el.addClass('editing');
		this.$input.focus();
	},

	updateOnEnter: function(event) {
		if (event.which === ENTER_KEY) this.close();
	},

	close: function() {
		var value = this.$input.val().trim();

		if (value) {
			this.model.save({title: value});
		} else {
			this.clear();
		}

		this.$el.removeClass('editing');
	},

	toggleCompleted: function(event) {
		this.model.toggle();
	},

	clear: function() {
		this.model.destroy();
	}
});