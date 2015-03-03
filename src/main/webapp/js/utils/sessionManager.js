define(function(require) {

	"use strict";

	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		LoginStatusModel = require('models/loginStatus');

	var loginStatusModel = new LoginStatusModel();
	loginStatusModel.fetch({
		url: "requireLogin",
		async: false,
		method: 'POST',
		contentType: 'application/json'
	});

	return {
		UserName: loginStatusModel.get('userName'),
		LoginDate: loginStatusModel.get('loginDate'),
		isLogin: loginStatusModel.get('loginYN'),
		isController: loginStatusModel.get('controller')
	};
});
