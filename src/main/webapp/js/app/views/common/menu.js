/**
 * Modal View
 */
define(function(require) {

	"use strict";

	// require library
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		TbAttackInfo = require('views/popup/attackInfoPopup'),
		TbIpRetrieve = require('views/tools/ipRetrievePopup'),
		TabView = require('views/popup/tab');

	var toolbarTpl = require('text!tpl/common/toolbar.html'),
		toolbarTemplate = _.template(toolbarTpl);

	// require i18n
	var locale = require('i18n!nls/menu'),
		strLocale = require('i18n!nls/str');

	var MenuView = Backbone.View.extend({
		tagName: "ul",
		className: "nav",
		parentMenuTemplate: _.template('<li class="has-sub <%= menu.menuKey %>"><a class="menu-icon"><b class="caret pull-right"></b> <i class="fa fa-laptop"></i> <span><%= menuName %></span></a><ul class="sub-menu"></ul></li>'),
		childMenuTemplate: _.template('<li class="<%= menu.url %>"><a href="#<%= menu.url %>"><%= menuName %></a></li>'),
		initialize: function(options) {
			this.render();
		},
		events: {
		},
		render: function() {
			var view = this;

			this.$el.empty();

			_.each(this.collection, function(menu) {
				if (menu.upperMenuKey) {
					$('.' + menu.upperMenuKey + ' ul', view.el).append(view.childMenuTemplate({
						menu: menu,
						menuName: eval('locale.menu.' + menu.menuKey)
					}));
				} else {
					view.$el.append(view.parentMenuTemplate({
						menu: menu,
						menuName: eval('locale.menu.' + menu.menuKey)
					}));
				}
			});

			return this;
		}
	});

	return MenuView;
});
