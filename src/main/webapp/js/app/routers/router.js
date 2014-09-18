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
		MainRouter = require('routers/mainRouter'),
		ChartRouter = require('routers/chartRouter'),
		PreferenceRouter = require('routers/preferenceRouter'),
		RealtimeRouter = require('routers/realtimeRouter');

	frameView.renderMenu();

	return {
		initialize: function() {
			var mainRouter = new MainRouter();
			mainRouter.setOptions({
				frameView: frameView
			});
			var chartRouter = new ChartRouter();
			chartRouter.setOptions({
				frameView: frameView
			});
			var preferenceRouter = new PreferenceRouter();
			preferenceRouter.setOptions({
				frameView: frameView
			});
			var realtimeRouter = new RealtimeRouter();
			realtimeRouter.setOptions({
				frameView: frameView
			});
		},
		initHistoryApi: function() {
			Backbone.history.start();
		}
	};
});