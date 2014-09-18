define(function(require) {

	"use strict";

	// require library
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		FrameView = require('views/frame'),
		frameView = new FrameView({
			el: $('body')
		}).render(),
		MainRouter = require('routers/mainRouter');

	frameView.renderMenu();

	return {
		initialize: function() {
			var mainRouter = new MainRouter();
			mainRouter.setOptions({
				frameView: frameView
			});
		},
		initHistoryApi: function() {
			Backbone.history.start();
		}
	};
});