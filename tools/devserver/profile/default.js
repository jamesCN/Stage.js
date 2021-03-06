/**
 * All paths are relative to the devserver folder. (except below)
 * All paths that start with '/' will be treated as is, otherwise they will be resolved with __dirname (as the above dictates)
 *
 * simplest profile setting:
 * -------------------------
 * {
 * 	lesswatch: 'default'
 * }
 * which will serve '../../implementation' on 'localhost:4000/' with theme 'default' monitored
 *
 * @author Tim.Liu
 * @created 2014.4.18
 */

module.exports = {

	port: '5000',

	//standard express-session middleware config
	session: {
		name: 'stagejs',
		secret: 'stagejs dev server session',
		resave: true,
		saveUninitialized: true
		//store: [your customized session store here]
	},

	db: {
		tingo: { path: '../tmp/db/dev.tingo' }
	},

	store: {

	},

	auth: {
		enabled: false, //whether or not server.secure(router) will take effect
		superadmin: 'pwd123'
	},

	//mount the client webroot folders
	clients: {
		//format - uri:webroot path
		//normally if you don't put '/' path here, '/': '../../implementation' will be added for you.
		'/': '../build/dist/site', 
		'/dev': '../../implementation', //this will be available under uri /dev
		//'/devmobile': '../build/dist/mobile'
	},

	//use enabled: false to turn off LESS monitor.
	lesswatch: {
		//default client: '/'.
		//use client: '[path]' set in the clients config section above to change the monitored webroot.
		//only 1 webroot can be monitored with its theme changes, which will, most likely always, be your development one.
		client: '/dev',

		//multiple themes can be monitored under the watched webroot.
		themes: ['default', 'site', 'project'] 
	},

	//use enabled: false to disable empty-ing all.json upon templates change.
	tplwatch: {
		client: '/dev'
	},

	//use enabled: false to disable this special change mirroring service 
	cordovawatch: {
		enabled: false,
		client: '/dev',
		index: 'mobile.html',
		files: [ //in glob format
			'!bower_components/**',
			'js/**',
			'static/**/*.html',
			'themes/mobile/**',
			'!themes/**/less/**'
		],
		mirror: '../../../www'
	},

	//cors (front-end crossdomain ajax support)
	crossdomain: true,

	//proxied (back-end request pass-through/foward) -- (through http-proxy)
	proxied: {
		'/api': {
			//enabled: true,
			path: '', //can change /api to /abc on targeted host
			https: false, //default on http requests
			host: '172.22.16.100',
			port: '8080',
			username: '',
			password: '',
			headers: {
				//'Authorization': 'API token',
				'Origin': 'abc.com',
				//...
			}
		},
		//can be multiple
		//'/other': {}, '/special': {}, '/3rd-party': {} ...
	},

	//whether to use the express/connect errorhandler in general
	errorpage: true 

};