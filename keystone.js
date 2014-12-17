if(process.env.NEWRELIC_LICENSE_KEY) require("newrelic");

var _ = require("underscore");

// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();


global.APP_ROOT = __dirname;

// Require keystone
var keystone = require('keystone');
	

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.


keystone.init({

	'name': 'EthereumDev',
	'brand': 'EthereumDev',

	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'jade',
	
	'auto update': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': 'o9}#e0{8JCiy,gb^6PF49miMa.M(|*eBSPnl-5"DnzT0=:^W@ZqRgFJ34%}0<d~T'

});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
  markdown: require('marked'),
  moment: require('moment'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

// Load your project's Routes

keystone.set('routes', require('./routes'));

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
  'content': ['posts', 'post-categories'],
  'Media': ['Video', 'Link', 'File'],
  'enquiries': 'enquiries',
  'users': 'users'
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
