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

require(['jquery', '../app', 'utils/sessionManager', 'views/login'],
	function($, app, sessionManager, LoginView) {
		app.initialize();

		$.when(sessionManager.requireLogin()).done(function() {
			var authCredential = sessionManager.getAuthCredentials();
			authCredential ? location.href = 'home.html#dashboard' : new LoginView({
				el: $('body')
			});
		});;
	});