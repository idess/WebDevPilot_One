define(function(require) {
	"use strict";

	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		locale = require('i18n!nls/str'),
		Tpl = require('text!tpl/tab-example/tableContent.html');

	return Backbone.View.extend({
		className: 'tab-pane',
		template: _.template(Tpl),
		events: {

		},
		/**
		 * options.tabView: Content가 들어갈 tab의 view 객체
		 */
		initialize: function(options) {
			options = options || {};
			if (options.tabView) this.tabView = options.tabView;
			this.info = {
				key: this.cid,
				title: '제목2'
			};
		},
		render: function() {
			this.$el.html(this.template({
				locale: locale
			}));
			this.$el.attr('id', this.info.key);

			return this;
		},
		getInfo: function() {
			return this.info;
		}
	});
});
