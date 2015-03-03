define(function(require) {

	"use strict";

	// require library
	var Backbone = require('backbone');

	var LoginStatusModel = Backbone.Model.extend({
		defaults: {
			"userName": "",
			"loginDate": "",
			"loginYN": "",
			"controller": ""
		}
	});

	return LoginStatusModel;
});
