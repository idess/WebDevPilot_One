define(function(require) {

	"use strict";

	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone');

	var LoginInfoModel = Backbone.Model.extend({
		defaults: {
			"loginYN": false
		},
		url: "requireLogin"
	});

	var loginInfoModel = new LoginInfoModel();

	return {
		requireLogin: function() {
			loginInfoModel.fetch({
				async: false,
				method: 'POST',
				contentType: 'application/json'
			});
		},
		getAuthCredentials: function() {
			return loginInfoModel.get('loginYN');
		}
	};
});