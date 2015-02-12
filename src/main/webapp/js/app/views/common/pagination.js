/**
 * Pagination
 *
 * paginationType 종류
 * 1. readMorePaginator (더보기)
 * 2. basicPaginator ( < 1 2 3 ... 6 7 > )
 *
 */
define(function(require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		bootstrap = require('bootstrap'),
		locale = require('i18n!nls/str');

	var readMoreTpl = require('text!tpl/common/readMorePagination.html'),
		basicPaginationTpl = require('text!tpl/common/basicPagination.html');

	var Pagination = Backbone.View.extend({

		readMoreTemplate: _.template(readMoreTpl),

		basicPaginationTemplate: _.template(basicPaginationTpl),

		initialize: function(options) {

			this.startRowSize = 0; // 쿼리 리스트범위조회 시작조건 값
			this.endRowSize = 0; // 쿼리 리스트범위조회 끝조건 값
			this.totalRowSize = null; // 쿼리 리스트 총 개수 값
			this.rowSize = 5; // 조회 리스트 개수값
			this.changeValue = 5; // 플러스버튼, 마이너스버튼 이벤트시 증가, 감소되는 값
			// 이벤트 적용1 
			// 이벤트를 등록한다. 
			//this.evt = options.evt;
		},

		events: {
			'click #rowSizeAllBtn': 'rowSizeAllBtn',
			'click #rowSizePlusBtn': 'rowSizePlusBtn',
			'click #rowSizeMinusBtn': 'rowSizeMinusBtn',
			'blur #listRowSizeInput': 'changeListRowSize',
			'click #backToTopBtn': 'backToTop',
			// 이벤트 적용2
			// 더보기 실행시 readMorePagination()을 호출
			//'click #readMoreBtn' : 'readMorePagination'
		},

		render: function() {

			$("[data-toggle='tooltip']", this.el).tooltip();
			return this;
		},

		renderPaginationType: function(paginationType) {

			var thisView = this;
			// paginationType에 따라 template를 달리한다.
			if (paginationType === 'readMorePaginator') {
				thisView.$el.html(this.readMoreTemplate());
				$('#listRowSizeInput', this.el).val(this.rowSize);
			} else if (paginationType === 'basicPaginator') {
				thisView.$el.html(this.basicPaginationTemplate());
			}
			return thisView;
		},

		rowSizeAllBtn: function() {
			// this.totalRowSize가 500 이상일경우 All버튼을 누르면 500까지만 보여줌
			if (this.totalRowSize > 500) {
				$('#listRowSizeInput', this.el).val(500);
				this.rowSize = 500;
			} else {
				$('#listRowSizeInput', this.el).val(this.totalRowSize);
				this.rowSize = this.totalRowSize;
			}
			Backbone.Utils.Tip.validationTooltip($('#listRowSizeInput', this.el), true);
		},

		rowSizePlusBtn: function() {
			// this.rowSize input 에 +10을 함
			var listCountValue = parseInt($('#listRowSizeInput', this.el).val()) + parseInt(this.changeValue);

			// 숫자인지 아닌지, 1-500 범위를 벗어났는지 체크 
			var result = Backbone.Utils.validation.invaildNumber500Range(listCountValue);
			if (result != true) {
				Backbone.Utils.Tip.validationTooltip($('#listRowSizeInput', this.el), result);
				$('#listRowSizeInput', this.el).val(listCountValue);
				this.rowSize = 0;
				return false;
			} else {
				Backbone.Utils.Tip.validationTooltip($('#listRowSizeInput', this.el), result);
				$('#listRowSizeInput', this.el).val(listCountValue);
				this.rowSize = listCountValue;
			}
		},
		rowSizeMinusBtn: function() {
			// this.rowSize input 에 -10을 함
			var listCountValue = parseInt($('#listRowSizeInput', this.el).val()) - parseInt(this.changeValue);

			// 숫자인지 아닌지, 1-500 범위를 벗어났는지 체크 
			var result = Backbone.Utils.validation.invaildNumber500Range(listCountValue);
			if (result != true) {
				Backbone.Utils.Tip.validationTooltip($('#listRowSizeInput', this.el), result);
				$('#listRowSizeInput', this.el).val(listCountValue);
				this.rowSize = 0;
				return false;
			} else {
				Backbone.Utils.Tip.validationTooltip($('#listRowSizeInput', this.el), result);
				$('#listRowSizeInput', this.el).val(listCountValue);
				this.rowSize = listCountValue;
			}
		},
		changeListRowSize: function() {

			var listCountValue = $('#listRowSizeInput', this.el).val();
			// 숫자인지 아닌지, 1-500 범위를 벗어났는지 체크 
			var result = Backbone.Utils.validation.invaildNumber500Range(listCountValue);
			if (result != true) {
				Backbone.Utils.Tip.validationTooltip($('#listRowSizeInput', this.el), result);
				this.rowSize = 0;
				return false;
			} else {
				Backbone.Utils.Tip.validationTooltip($('#listRowSizeInput', this.el), result);
				this.rowSize = listCountValue;
			}

		},

		backToTop: function() {
			$('body').animate({
				scrollTop: 0
			}, 500);
		},

		hidePaginationView: function() {
			$('#readMoreBtn', this.el).css("visibility", "hidden");
			$('#listRowSizeInput', this.el).css("visibility", "hidden");
			$('#rowSizePlusBtn', this.el).css("visibility", "hidden");
			$('#rowSizeMinusBtn', this.el).css("visibility", "hidden");
			$('#rowSizeAllBtn', this.el).css("visibility", "hidden");
		},
		showPaginationView: function() {

			$('#readMoreBtn', this.el).css("visibility", "");
			$('#listRowSizeInput', this.el).css("visibility", "");
			$('#rowSizePlusBtn', this.el).css("visibility", "");
			$('#rowSizeMinusBtn', this.el).css("visibility", "");
			$('#rowSizeAllBtn', this.el).css("visibility", "");
		},

		getPaginationType: function(paginationType) {
			return {
				'type': this.renderPaginationType(paginationType)
			};
		},

		setTotalRowSize: function(setTotalRowSize1) {
			this.totalRowSize = parseInt(setTotalRowSize1);
			this.showPaginationView();

			if (parseInt(this.totalRowSize) == parseInt(0)) {
				this.startRowSize = 0;
				this.endRowSize = 0;

				var thisView = this;
				thisView.hidePaginationView();
			} else if (parseInt(this.totalRowSize) <= parseInt(this.endRowSize)) {
				var thisView = this;
				thisView.hidePaginationView();
			}
		},

		readMorePagination: function() {
			var thisView = this;
			thisView.showPaginationView();

			if (this.totalRowSize != 0 && this.totalRowSize != null) {
				this.startRowSize = parseInt(this.endRowSize);

				this.endRowSize = parseInt(this.endRowSize) + parseInt(this.rowSize);

				if (this.endRowSize >= this.totalRowSize) {
					this.endRowSize = this.totalRowSize;

					thisView.hidePaginationView();

				}

			} else if (this.totalRowSize == null) {
				// 최초 리스트를 조회할때 필요한 endRowSize, startRowSize
				this.startRowSize = parseInt(0);

				this.endRowSize = parseInt(this.rowSize);

				this.totalRowSize = null;

			}

			return {
				'endRowSize': this.endRowSize,
				'startRowSize': this.startRowSize
			};

			// 이벤트 적용3
			//			this.evt.trigger('pagination', {
			//				'endRowSize': this.endRowSize,
			//				'startRowSize': this.startRowSize
			//			});
		},
		setInitialization: function() {
			this.totalRowSize = null;
			this.endRowSize = 0;
			this.startRowSize = 0;
			this.rowSize = 5;
			$('#listRowSizeInput', this.el).val(this.changeValue);
		},
		getPaginationRowValue: function() {

			this.startRowSize = 0;
			this.endRowSize = this.rowSize;

			return {
				'startRowSize': this.startRowSize,
				'endRowSize': this.endRowSize
			};

		},
	});

	return Pagination;

});
