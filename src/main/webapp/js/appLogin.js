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

require(['jquery', 'utils/sessionManager', 'views/login'],
	function($, sessionManager, LoginView) {
		sessionManager.isLogin ? location.href = 'home.html#dashboard' : new LoginView({
			el: $('body')
		});
	});
