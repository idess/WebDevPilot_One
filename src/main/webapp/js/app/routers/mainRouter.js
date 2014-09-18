define(function(require) {

	"use strict";

	// require library
	var $ = require('jquery'),
		Backbone = require('backbone');

	var frameView;

	return Backbone.Router.extend({
		routes: {
			"": "dashboard",
			"dashboard": "dashboard",
			"menu11": "menu11",
			"menu21": "menu21",
			"menu31": "menu31"
		},
		setOptions: function(options) {
			frameView = options.frameView;
		},
		dashboard: function() {
			console.log("dashboard");
			frameView.selectMenuItem('');
		},
		menu11: function() {
			frameView.selectMenuItem('menu1');
		},
		menu21: function() {
			frameView.selectMenuItem('menu2');
		},
		menu31: function() {
			frameView.selectMenuItem('menu3');
		}
	});
});