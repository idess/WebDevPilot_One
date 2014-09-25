define(function(require, d3) {

	"use strict";

	// require library
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		d3 = require('d3'),
		nv = require('nv.d3.min');

	// require template
	var tpl = require('text!tpl/dashboard.html'),
		template = _.template(tpl);

	return Backbone.View.extend({
		render: function() {
			this.$el.html(template());

			// area chart
			var data1 = [{
				key: 'Sqrt',
				values: []
			}, {
				key: 'Cbrt',
				values: []
			}, {
				key: '4th',
				values: []
			}];

			for (var i = 0; i <= 128; i++) {
				var x2 = 20 * (i / 128);
				data1[0].values.push({
					x: x2,
					y: Math.sqrt(x2)
				});
				data1[1].values.push({
					x: x2,
					y: Math.pow(x2, (1 / 3))
				});
				data1[2].values.push({
					x: x2,
					y: Math.pow(x2, (1 / 4))
				});
			}
			$('#area').css({
				'height': '300px'
			});
			nv.addGraph(function() {
				var chart = nv.models.stackedAreaChart().margin({
						left: 100
					}) // Adjust chart margins to give the x-axis some breathing room.
					.useInteractiveGuideline(true) // We want nice looking tooltips and a guideline!
					.transitionDuration(350) // how fast do you want the lines to transition?
					.showLegend(true) // Show the legend, allowing users to turn on/off line series.
					.showYAxis(true) // Show the y-axis
					.showXAxis(true) // Show the x-axis
					.showControls(false) // Allow user to choose 'Stacked', 'Stream', 'Expanded'
					// mode.
				;

				chart.xAxis // Chart x-axis settings
					.axisLabel('Time (ms)').tickFormat(d3.format(',r'));

				chart.yAxis // Chart y-axis settings
					.axisLabel('Voltage (v)').tickFormat(d3.format('.02f'));

				d3.select('#area svg') // Select the <svg> element you want to render the chart in.
					.datum(data1) // Populate the <svg> element with chart data...
					.call(chart); // Finally, render the chart!

				// Update the chart when window resizes.
				nv.utils.windowResize(function() {
					chart.update()
				});
				return chart;
			});

			// line chart
			var data2 = [{
				key: 'Layer 1',
				values: []
			}, {
				key: 'Layer 2',
				values: []
			}, {
				key: 'Layer 3',
				values: []
			}];

			for (var i = 0; i < 256; i++) {
				var x = 40 * (i / 256) - 20;
				data2[0].values.push({
					x: x,
					y: Math.sin(x) * (x / 4)
				});
				data2[1].values.push({
					x: x,
					y: Math.cos(x) * (x / Math.PI)
				});
				data2[2].values.push({
					x: x,
					y: Math.sin(x) * (x / 2)
				});
			}

			$('#line').css({
				'height': '300px'
			});
			nv.addGraph(function() {
				var chart = nv.models.lineChart().margin({
						left: 100
					}) // Adjust chart margins to give the x-axis some breathing room.
					.useInteractiveGuideline(true) // We want nice looking tooltips and a guideline!
					.transitionDuration(350) // how fast do you want the lines to transition?
					.showLegend(true) // Show the legend, allowing users to turn on/off line series.
					.showYAxis(true) // Show the y-axis
					.showXAxis(true) // Show the x-axis
				;

				chart.xAxis // Chart x-axis settings
					.axisLabel('Time (ms)').tickFormat(d3.format(',r'));

				chart.yAxis // Chart y-axis settings
					.axisLabel('Voltage (v)').tickFormat(d3.format('.02f'));

				d3.select('#line svg') // Select the <svg> element you want to render the chart in.
					.datum(data2) // Populate the <svg> element with chart data...
					.call(chart); // Finally, render the chart!

				// Update the chart when window resizes.
				nv.utils.windowResize(function() {
					chart.update()
				});
				return chart;
			});

			// bubble chart
			var DATA_LENGTH = 24;

			var data = [{
				key: 'A',
				values: []
			}, {
				key: 'B',
				values: []
			}];

			for (var i = 0; i < DATA_LENGTH; i++) {
				for (var j = 0; j < data.length; j++) {
					data[j].values.push({
						x: (Math.random() * 1000),
						y: (Math.random() * 200),
						r: Math.random() * 15 + 1
					});
				}
			}

			$('#bubble').css({
				'height': '300px'
			});
			nv.addGraph(function() {
				var chart = nv.models.scatterChart().showDistX(true) // showDist, when true, will
					// display those little
					// distribution lines on the
					// axis.
					.showDistY(true).transitionDuration(350).color(d3.scale.category10().range());

				// Configure how the tooltip looks.
				chart.tooltipContent(function(key) {
					return '<h3>' + key + '</h3>';
				});

				// Axis settings
				chart.xAxis.tickFormat(d3.format('.02f'));
				chart.yAxis.tickFormat(d3.format('.02f'));

				// We want to show shapes other than circles.
				chart.scatter.onlyCircles(true);

				d3.select('#bubble svg').datum(data).call(chart);

				nv.utils.windowResize(chart.update);

				return chart;
			});

			return this;
		},

	});

});