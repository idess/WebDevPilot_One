define(function(require) {

	"use strict";

	// require library
	var $ = require('jquery'),
		Backbone = require('backbone');

	// require i18n
	var locale = require('i18n!nls/str');

	var CommonModel = Backbone.Model.extend({
		defaults: {
		},
		obtainCertification: function(options) {
			this.fetch({
				method: "POST",
				contentType: 'application/json',
				data: JSON.stringify(this.toJSON()),
				success: options.success,
				error: function(model, response) {
					console.log('fetch error');
					console.log(model);
					console.log(response);
				}
			});
		}
	});

	return CommonModel;

});