/**
 * Modal View
 */
define(function(require) {

	"use strict";

	// require library
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone');

	// require i18n
	var locale = require('i18n!nls/menu');

	var MenuView = Backbone.View.extend({
		tagName: "ul",
		className: "nav navbar-nav",
		parentMenuTemplate: _.template('<li class="<%= menu.menukey %>-menu"><a href="#" class="dropdown-toggle" data-toggle="dropdown"><%= menuName %><span class="caret"></span></a><ul class="dropdown-menu" role="menu"></ul></li>'),
		childMenuTemplate: _.template('<li><a href="#<%= menu.url %>"><%= menuName %></a></li>'),
		initialize: function(options) {
			this.render();
		},
		render: function() {
			var view = this;

			this.$el.empty();

			_.each(this.collection, function(menu) {
				if (menu.higherkey) {
					$('.' + menu.higherkey + '-menu ul', view.el).append(view.childMenuTemplate({
						menu: menu,
						menuName: eval('locale.menu.' + menu.menukey)
					}));
				} else {
					view.$el.append(view.parentMenuTemplate({
						menu: menu,
						menuName: eval('locale.menu.' + menu.menukey)
					}));
				}
			});

			return this;
		}
	});

	return MenuView;
});