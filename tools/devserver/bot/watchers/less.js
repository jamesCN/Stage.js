/**
 * This is the LESS themes watch-n-recompile bot
 *
 * Only the main.less @ themes/[theme-name]/less/main.less will be recompiled.
 * Any file change under themes/[theme-name]/ will trigger the recompile.
 * Produced main.css will always be @ themes/[theme-name]/css/main.css
 *
 * Only themes specified in the lesswatch list will be monitored
 * server.get('profile').lesswatch
 *
 * @author Tim Liu
 * @created 2013.10.27
 * @updated 2014.04.18
 * @updated 2014.07.31 (Yan.Zhu + Windows support)
 */

var _ = require('underscore'),
    path = require('path'),
    os = require('os'),
    fs = require('fs-extra'),
    less = require('less'),
    colors = require('colors'),
    watch = require('watch'),
    compiler = require('../../../shared/less-css.js');

_.str = require('underscore.string');

module.exports = function(server) {

    var profile = server.get('profile');
    if (!profile.lesswatch || profile.lesswatch.enabled === false) return;

    var selectedClient = "/";
    if (!_.isArray(profile.lesswatch)) {
        if (!_.isString(profile.lesswatch)) {
            //config object
            selectedClient = profile.lesswatch.client;
            profile.lesswatch = profile.lesswatch.themes;
        }
        //single theme name string
        if (_.isString(profile.lesswatch))
            profile.lesswatch = [profile.lesswatch];
    }

    //convert name array into name map
    var watchlist = _.object(profile.lesswatch, profile.lesswatch);

    // watch the client themes folder
    var themesFolder = path.join(profile.clients[selectedClient], 'themes');
    fs.readdir(themesFolder, function(err, list) {
        if (err) throw err;

        function doCompile(e, f) {
            console.log('[Theme file'.yellow, e, ':'.yellow, f, ']'.yellow);
            var name = _.compact((f.replace(themesFolder, '')).split(path.sep)).shift();
            compiler(path.join(themesFolder, name));
        }

        var themeFolders = [];
        _.each(list, function(theme) {
            //monitor only the selected theme(s) in config.
            if (theme in watchlist) {
                var root = path.join(themesFolder, theme);
                themeFolders.push({
                    name: theme,
                    glob: path.join(root, '**/*.less')
                });
            }
        });

        var watchedThemes = _.map(themeFolders, function(t) {
            return t.name;
        });


        var watchedThemesPath = _.map(watchedThemes, function(t) {
            return path.join(themesFolder, t);
        });
        watch.createMonitor(themesFolder, {
            filter: function(f, stat) {
                var pass = _.any(watchedThemesPath, function(path) {
                    if (_.str.startsWith(f, path)) return true;
                    return false;
                });
                if (!pass) return false;
                if (stat.isDirectory()) return true;
                if (_.str.endsWith(f, '.less')) return true;
                return false;
            }
        }, function(monitor) {
            console.log('[watcher]', ('Themes ' + watchedThemes).yellow, '-', ('lessjs v' + less.version.join('.')).grey);
            _.each(['created', 'changed', 'removed'], function(e) {
                monitor.on(e, function(f) {
                    doCompile(e, f);
                });
            });
        });

    });
};
