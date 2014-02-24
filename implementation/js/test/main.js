;Application.setup({

    /**
     * ================
     * Development ONLY
     * ================
     */
    
    //CROSSDOMAIN [Warning: Crossdomain Authentication]
    //If you ever need crossdomain development, we recommend that you TURN OFF local server's auth layer/middleware. 
    crossdomain: {
        //enabled: true,
        protocol: '', //https or not? default: '' -> http
        host: '127.0.0.1', 
        port: '5000',
        username: 'admin',
        password: '123'
        /*----------------*/
    },

    //You can override other production config vars if wanted.
    fullScreen: true,

    //template: '<div region="banner" view="Banner"></div><div region="center"></div><div region="footer" view="Footer"></div>',
    //contextRegion: 'center'

}).run();


;(function(){

    Application.create('Context', {
        //don't name so this is the Default context.
        layout: [
            '<div region="abc" view="Banner"></div>',
            '<div region="efg"></div>'
        ],

    });

    Application.create('Context', {
        name: 'Login',
        layout: [
            '<div region="2"></div>',
            '<div region="3"></div>'
        ],

    });     

    //Regionals
    Application.create('Regional', {
        context: 'Default',
        name: 'Banner',
        layout: [
                '<div class="navbar navbar-default">',

                    '<div class="navbar-header">',//A
                      '<button data-target=".navbar-responsive-collapse" data-toggle="collapse" class="navbar-toggle" type="button">',//1
                        '<span class="icon-bar"></span>',
                        '<span class="icon-bar"></span>',
                        '<span class="icon-bar"></span>',
                      '</button>',
                      '<a href="#" class="navbar-brand">Brand</a>',//2
                    '</div>',

                    '<div class="navbar-collapse collapse navbar-responsive-collapse">',//B
                      '<ul class="nav navbar-nav">',//1
                        '<li class="active"><a href="#">Active</a></li>',
                        '<li><a href="#">Link</a></li>',
                        '<li class="dropdown">',
                          '<a data-toggle="dropdown" class="dropdown-toggle" href="#">Dropdown <b class="caret"></b></a>',
                          '<ul class="dropdown-menu">',
                            '<li><a href="#">Action</a></li>',
                            '<li><a href="#">Another action</a></li>',
                            '<li><a href="#">Something else here</a></li>',
                            '<li class="divider"></li>',
                            '<li class="dropdown-header">Dropdown header</li>',
                            '<li><a href="#">Separated link</a></li>',
                            '<li><a href="#">One more separated link</a></li>',
                          '</ul>',
                        '</li>',
                      '</ul>',
                      '<form class="navbar-form navbar-left">', //2
                        '<input type="text" placeholder="Search" class="form-control col-lg-8">',
                      '</form>',
                      '<ul class="nav navbar-nav navbar-right">', //3
                        '<li><a href="#">Link</a></li>',
                        '<li class="dropdown">',
                          '<a data-toggle="dropdown" class="dropdown-toggle" href="#">Dropdown <b class="caret"></b></a>',
                          '<ul class="dropdown-menu">',
                            '<li><a href="#">Action</a></li>',
                            '<li><a href="#">Another action</a></li>',
                            '<li><a href="#">Something else here</a></li>',
                            '<li class="divider"></li>',
                            '<li><a href="#">Separated link</a></li>',
                          '</ul>',
                        '</li>',
                      '</ul>',
                    '</div>',<!-- /.nav-collapse -->
                '</div>'
                ]
    });


})();