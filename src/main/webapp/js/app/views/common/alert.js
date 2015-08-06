define(function(require) {

	"use strict";

	// require library
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone');

	var topSize = 70,
		boxInterval = 20;

	var AlertView = Backbone.View.extend({
		tagName: "div",
		className: "alert alert-dismissible fade",
		template: ['<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
			'<div class="glyphicon" aria-hidden="true"></div>',
			'<div class="sr-only"><%= title %></div>',
			'<div class="message"><%= message %></div>'
		].join("\n"),
		initialize: function(options) {
			_.bindAll(this, "render", "remove");
			this.template = _.template(this.template);
			if (options) {
				this.alert = options.alert || "info";
				this.title = options.title || "";
				this.message = options.message || "";
				this.fixed = options.fixed || false;
			}
		},
		render: function() {
			var self = this;
			this.$el.addClass("alert-" + this.alert).html(this.template({
				title: this.title,
				message: this.message
			})).alert();
			this.$el.attr('role', 'alert');

			if (this.alert === 'success') this.$('.glyphicon').addClass('glyphicon-ok-sign');
			else if (this.alert === 'warning') this.$('.glyphicon').addClass('glyphicon-minus-sign');
			else if (this.alert === 'danger') this.$('.glyphicon').addClass('glyphicon-exclamation-sign');
			else this.$('.glyphicon').addClass('glyphicon-info-sign');

			if (this.fixed) {
				this.$el.addClass("alert-fixed");
			}
			window.setTimeout(function() {
				self.$el.addClass("in");
			}, 20);
			return this;
		},
		remove: function() {
			var self = this;
			this.$el.removeClass("in");
			window.setTimeout(function() {
				self.$el.remove();
			}, 1000);
		}
	});

	/**
	 * Create Alert View and show
	 * @param title alert title
	 * @param message alert message
	 * @param alertType alert type(success, info, warning, danger), default: info
	 * @returns {AlertView}
	 */
	AlertView.show = function(title, message, alertType) {
		var $alertbox = $('.alert-container');
		if ($alertbox.length === 0) {
			var $alertbox = $(document.createElement('div'));
			$alertbox.addClass('alert-container');
			$(document.body).append($alertbox);
		}

		var alert = new AlertView({
			alert: alertType,
			title: title,
			message: message,
			fixed: true
		});

		$alertbox.prepend(alert.render().el);

		window.setTimeout(function() {
			alert.remove();
		}, 8000);

		return alert;
	};

	return AlertView;
});
