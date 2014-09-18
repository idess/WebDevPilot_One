define(function(require) {
	"use strict";

	// require library
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		ModalView = require('views/common/modal'),
		AlertView = require('views/common/alert');

	var application = {
		initialize: function() {
			var _sync = Backbone.sync;
			Backbone.sync = function(method, model, options) {
				options.error = function(model, response, options) {
					console.log('fetch error');
					console.log(model);
					console.log(response);
					console.log(options);
					if (options === 'Unauthorized') {
						eval(model.responseText);
					}
				};

				_sync(method, model, options);
			};

			Backbone.View.prototype.close = function() {
				this.remove();
				this.unbind();
				if (this.onClose) {
					this.onClose();
				}
			};

			Backbone.ModalView = ModalView;
			Backbone.AlertView = AlertView;
		}
	};

	return application;
});