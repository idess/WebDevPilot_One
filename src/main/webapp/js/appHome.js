require.config({

	baseUrl: 'js/lib',

	paths: {
		app: '../app',
		utils: '../utils',
		views: '../app/views',
		models: '../app/models',
		collections: '../app/collections',
		routers: '../app/routers',
		tpl: '../tpl',
		nls: '../nls',
		bootstrap: '../../bootstrap/js/bootstrap'
	},

	// Set the config for the i18n
	// locale : "en-us",

	map: {
		'*': {
			'epoch': 'epoch.min',
			'nv': 'nv.d3.min'
		}
	},

	shim: {
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'bootstrap': {
			deps: ['jquery'],
			exports: 'bootstrap'
		}
	}
});

require(['jquery', '../app', 'utils/sessionManager', 'routers/router'],
	function($, app, sessionManager, router) {
		app.initialize();

		$.when(sessionManager.requireLogin()).done(function() {
			var authCredential = sessionManager.getAuthCredentials();
			authCredential === true ? (router.initialize(), router.initHistoryApi()) : location.href = '/';
		});
	});