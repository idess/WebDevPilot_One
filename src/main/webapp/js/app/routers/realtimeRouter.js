define(function(require) {

	"use strict";

	// require library
	var $ = require('jquery'),
		Backbone = require('backbone');

	var frameView;

	return Backbone.Router.extend({
		routes: {
			"realtime1": "realtime1"
		},
		setOptions: function(options) {
			frameView = options.frameView;
		},
		realtime1: function() {
			console.log("realtime1");
			frameView.selectMenuItem('realtime');
		}
	});
});