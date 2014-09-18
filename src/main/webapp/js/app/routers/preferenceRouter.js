define(function(require) {

	"use strict";

	// require library
	var $ = require('jquery'),
		Backbone = require('backbone');

	var frameView;

	return Backbone.Router.extend({
		routes: {
			"preference1": "preference1"
		},
		setOptions: function(options) {
			frameView = options.frameView;
		},
		preference1: function() {
			console.log("preference1");
			frameView.selectMenuItem('preferences');
		}
	});
});