
var app = app || {};

app.appView = Backbone.View.extend({
	el: '#todoapp',

	statsTemplate: _.template( $('#stast-template').html() ),

	events: {
		'keypress #new-todo': 'createOnEnter',
		'click #clear-completed': 'clearCompleted',
		'click #toggle-all': 'toggleAllComplete'
	},

	initialize: function() {
		this.allCheckbox = this.$('#toggle-all')[0];
		this.$input = this.$('#new-todo');
		this.$footer = this.$('#footer');
		this.$main = this.$('#main');

		this.listenTo(app.Todos, 'add', this.addOne);
		this.listenTo(app.Todos, 'reset', this.addAll);
		this.listenTo(app.Todos, 'change:completed', this.filterOne);
		this.listenTo(app.Todos, 'filter', this.filterAll);
		this.listenTo(app.Todos, 'all', this.render);

		app.Todos.fetch();
	},

	render: function() {
		var completed = app.Todos.completed().length;
		var remaining = app.Todos.remaining().length;

		if (app.Todos.length) {
			this.$main.show();
        	this.$footer.show();

	        this.$footer.html(this.statsTemplate({
	        	completed: completed,
	        	remaining: remaining
	        }));

	        this.$('#filters li a')
	        	.removeClass('selected')
	        	.filter('[href="#/' + ( app.TodoFilter || '' ) + '"]')
	        	.addClass('selected');
      	} else {
        	this.$main.hide();
        	this.$footer.hide();
      	}

    	this.allCheckbox.checked = !remaining;
    },

	addOne: function(item) {
		var view = new app.TodoView({model: item});
		$('#todo-list').append(view.render().el);
	},

	addAll: function() {
		this.$('#todo-list').html('');
		app.Todos.each(this.addOne, this)
	}
});