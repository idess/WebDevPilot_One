define(function(require) {

	"use strict";

	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		MenuView = require('views/common/menu'),
		tpl = require('text!tpl/frame.html'),
		template = _.template(tpl),
		$menuItems;

	return Backbone.View.extend({
		initialize: function() {},
		render: function() {
			this.$el.html(template());
			return this;
		},
		events: {},
		renderMenu: function() {
			var menus = [{
				"menukey": "menu1",
				"higherkey": "",
				"url": ""
			}, {
				"menukey": "menu2",
				"higherkey": "",
				"url": ""
			}, {
				"menukey": "menu3",
				"higherkey": "",
				"url": ""
			}, {
				"menukey": "menu11",
				"higherkey": "menu1",
				"url": "menu11"
			}, {
				"menukey": "menu21",
				"higherkey": "menu2",
				"url": "menu21"
			}, {
				"menukey": "menu31",
				"higherkey": "menu3",
				"url": "menu31"
			}];
			var menuView = new MenuView({
				collection: menus
			});
			$('.navbar .navbar-collapse').append(menuView.el);

			$menuItems = $('.navbar .nav li', this.el);
		},
		renderAlertMessage: function() {

		},
		renderPresence: function() {

		},
		renderSystemTime: function() {

		},
		selectMenuItem: function(menuItem) {
			$menuItems.removeClass('active');
			if (menuItem) {
				$('.' + menuItem + '-menu').addClass('active');
			}
		}

	});

});