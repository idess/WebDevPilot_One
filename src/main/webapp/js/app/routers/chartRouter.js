define(function(require) {

	"use strict";

	// require library
	var $ = require('jquery'),
		Backbone = require('backbone');

	var frameView;

	return Backbone.Router.extend({
		routes: {
			"lineChart": "lineChart"
		},
		setOptions: function(options) {
			frameView = options.frameView;
		},
		lineChart: function() {
			console.log("lineChart");
			frameView.selectMenuItem('charts');
		}
	});
});