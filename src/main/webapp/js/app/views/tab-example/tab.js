define(function(require) {

	"use strict";

	// require library
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		utils = require('utils/utils'),
		tpl = require('text!tpl/tab-example/link.html'),
		TabView = require('views/common/tab'),
		TabContentView = require('views/tab-example/tabContent'),
		TableContentView = require('views/tab-example/tableContent');

	// require i18n
	var locale = require('i18n!nls/str');

	return Backbone.View.extend({
		className: 'main',
		template: _.template(tpl),
		events: {},
		initialize: function() {
			this.tabView = new TabView();
		},
		render: function() {
			this.$el.html(this.template({
				locale: locale
			}));

			var $tab = this.$('#tab');
			$tab.html(this.tabView.el);
			this.tabView.render();

			// create link content view
			var tabContentView = new TabContentView({
				tabView: this.tabView
			});

			// create table content view
			var tableView = new TableContentView({
				tabView: this.tabView
			});

			this.tabView.addTab(tabContentView, false);
			this.tabView.addTab(tableView, false);

			this.tabView.showTab(0); // 첫번째 tab을 보여준다.

			return this;
		}
	});

});
