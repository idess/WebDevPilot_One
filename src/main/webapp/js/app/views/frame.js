define(function(require) {

	"use strict";

	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		MenuView = require('views/common/menu'),
		CommonModel = require('models/common'),
		tpl = require('text!tpl/frame.html'),
		template = _.template(tpl),
		$menuItems;

	var currentContainer;

	return Backbone.View.extend({
		initialize: function() {},
		render: function() {
			this.$el.html(template());
			return this;
		},
		events: {
			"click .logout": "logout"
		},
		logout: function() {
			var common = new CommonModel();
			common.fetch({
				async: false,
				method: 'POST',
				contentType: 'application/json',
				url: 'api/logout'
			});
			location.href = '/';
		},
		renderMenu: function() {
			var menus = [{
				"menukey": "charts",
				"higherkey": "",
				"url": ""
			}, {
				"menukey": "realtime",
				"higherkey": "",
				"url": ""
			}, {
				"menukey": "preferences",
				"higherkey": "",
				"url": ""
			}, {
				"menukey": "lineChart",
				"higherkey": "charts",
				"url": "lineChart"
			}, {
				"menukey": "realtime1",
				"higherkey": "realtime",
				"url": "realtime1"
			}, {
				"menukey": "preference1",
				"higherkey": "preferences",
				"url": "preference1"
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
		},
		setCurrentContainer: function(currentView) {
			currentContainer = currentView;
		},
		getCurrentContainer: function() {
			return currentContainer;
		},
		closeCurrentContainer: function() {
			if (currentContainer) {
				currentContainer.close();
			}
		}

	});

});
