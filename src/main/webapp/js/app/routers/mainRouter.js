define(function(require) {

	"use strict";

	// require library
	var $ = require('jquery'),
		Backbone = require('backbone');

	var frameView;

	return Backbone.Router.extend({
		routes: {
			"": "dashboard",
			"dashboard": "dashboard"
		},
		setOptions: function(options) {
			frameView = options.frameView;
		},
		dashboard: function() {
			frameView.closeCurrentContainer();
			console.log("dashboard");
			require(['views/dashboard'], function(Dashboard) {
				var dashboard = new Dashboard().render();
				$('#container', frameView.el).append(dashboard.el);
				frameView.setCurrentContainer(dashboard);
			});
			frameView.selectMenuItem('');
		}
	});
});