module.exports = {
	src: {
		root: '../../implementation', //path relative to this config.js
		index: 'index.html', //path relative to root
		templates: 'static/template', //path relative to root
	},
	js: {
		targets: false
	},
	structure : { //path are relative to the distFolder and src.root above

		js: {
			'all.min.js': true, //'all' is a hard coded name - see loadIndexHTML() in build.js
			lib: {
				'dependencies.json': 'js/lib/dependencies.json'
			}
		},
		themes: {
			'site': {
				css: {
					'main.css':'themes/site/css/main.css'
				},
				img: { 
					texture: 'themes/site/img/texture', 
					'sprite.png': 'themes/site/img/sprite.png',
					'square.png': 'themes/site/img/square.png',
					'square@2x.png': 'themes/site/img/square@2x.png'
				},
				fonts: 'themes/site/fonts'
			}
		},
		static: {
			template: { 'all.json': 'static/template/all.json' },
			resource: {
				default: {
					diagram: 'static/resource/default/diagram',
					download: 'static/resource/default/download'
				}
			}
		},		
		'index.html': true,
		'HOWTO.md': 'HOWTO.md',
		'CHANGELOG.md': '../CHANGELOG.md'
		
	}
};