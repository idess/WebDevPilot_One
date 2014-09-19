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
			frameView.closeCurrentContainer();
			console.log("realtime1");
			require(['views/realtime/realtimeUsingSockjs'], function(Realtime) {
				var realtime = new Realtime().render();
				$('#container', frameView.el).append(realtime.el);
				frameView.setCurrentContainer(realtime);
			});
			frameView.selectMenuItem('realtime');
		}
	});
});