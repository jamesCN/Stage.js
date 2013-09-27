/**
 * This is the Application Build Config.
 *
 * ================
 * Config/Structure
 * ================
 * {} - create folder
 * 'string' - copy file or folder
 * true/false - read'n'save from task memory, gzip or not.
 *
 * 
 * @author Tim.Liu
 * @created 2013.09.25
 */

module.exports = {
	clientBase: '../../',
	index: 'app/index.html',
	structure : {
		scripts: {
			_try: {}, //autoload scripts - usually patches after dist built
			'app.min.js': true, //!!Hardcoded path see - loadIndexHTML() below;
			'config.js': 'app/scripts/config.js' //-non minified or copied
		},
		static: {
			menu: {
				'menu.json': 'app/static/menu/menu.json'
			},
			resources: 'app/static/resources'
		},
		themes: {
			_default: 'app/themes/_default'
		},
		'404.html': 'app/404.html',
		'index.html': false
	}
};