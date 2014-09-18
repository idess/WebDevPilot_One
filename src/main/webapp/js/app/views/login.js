define(function(require) {

	"use strict";

	// require library
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone');

	// require model
	var LoginModel = require('models/login'),
		loginModel = new LoginModel();

	// require template
	var tpl = require('text!tpl/login.html'),
		template = _.template(tpl);

	// require i18n
	var locale = require('i18n!nls/str');

	return Backbone.View.extend({
		model: loginModel,
		events: {
			'click #loginBtn': 'login',
			'keypress #password': 'enterLogin'
		},
		initialize: function() {
			this.render();
		},
		render: function() {
			this.$el.empty();
			this.$el.removeClass();

			this.$el.html(template({
				locale: locale
			}));
			return this;
		},
		enterLogin: function() {
			if (event.keyCode === 13) {
				this.login();
			}
		},
		login: function(event) {
			loginModel.set({
				username: $('#userid').val(),
				password: $('#password').val()
			}, {
				silent: true
			});
			if (loginModel.isValid()) {
				loginModel.obtainCertification({
					success: this.success
				});
			} else {
				Backbone.AlertView.msg($('#alert'), {
					alert: "warning",
					message: loginModel.validationError
				});
			}
		},
		success: function() {
			if (loginModel.get('successLogin') == 'Y') {
				location.href = 'home.html#dashboard';
			} else {
				Backbone.AlertView.msg($('#alert'), {
					alert: loginModel.get('returnType'),
					message: loginModel.get('errorMessage')
				});
				Backbone.ModalView.msg({
					title: loginModel.get('returnType'),
					body: loginModel.get('errorMessage')
				});
			}
		}
	});
});