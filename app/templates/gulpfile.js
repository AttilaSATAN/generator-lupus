'use strict';

var gulp    = require( 'gulp' ),
    gutil   = require( 'gulp-util' ),
    fork    = require( 'child_process' ).fork,
    tinyLr  = require( 'tiny-lr' ),
    async   = require( 'async' );

var dirs = {
    app: [
        'views/{,*/}*.html',
        'routes/{,*/}*.js',
        'models/{,*/}*.js',
        'libs/{,*/}*.js',
        'controllers/{,*/}*.js',
        'config/{,*/}*.js',
        'app.js',
    ],
    public: [
        'public/scripts/{,*/}*.js',
        'public/less/{,*/}*.less',
        'public/styles/{,*/}*.css',
        'public/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
    ]
};

var livereload = {
    instance: null,

    port: 35729,

    start: function( callback ) {
        livereload.instance = tinyLr();

        livereload.instance.listen( livereload.port, callback );
    },

    changed: function( event, callback ) {
        var filepath = event.path;

        livereload.instance.changed({
            body: {
                files: [ filepath ]
            }
        });
        if( callback ) callback();
    }
};

var app = {
    instance: {},

    path: 'app.js',

    env: { NODE_ENV: 'development', port: 3001 },

    start: function( callback ) {
        process.execArgv.push( '--harmony' );

        app.instance = fork( app.path, { silent: true, env: app.env } );
        app.instance.stdout.pipe( process.stdout );
        app.instance.stderr.pipe( process.stderr );

        gutil.log( gutil.colors.cyan( 'Starting' ), 'express server ( PID:', app.instance.pid, ')' );

        if( callback ) callback();
    },

    stop: function( callback ) {
        if( app.instance.connected ) {
            app.instance.on( 'exit', function() {
                gutil.log( gutil.colors.red( 'Stopping' ), 'express server ( PID:', app.instance.pid, ')' );
                if( callback ) callback();
            });
            return app.instance.kill( 'SIGINT' );
        }
        if( callback ) callback();
    },

    restart: function( event ) {
        async.series([
            app.stop,
            app.start,
            function( callback ) {
                livereload.changed( event, callback );
            }
        ]);
    }
};


gulp.task( 'server', function( callback ) {
    async.series([
        app.start,
        livereload.start
    ], callback );
});


gulp.task( 'watch', function() {
    gulp.watch( dirs.app, app.restart );
    gulp.watch( dirs.public, livereload.changed );
});


gulp.task( 'default', [ 'server', 'watch' ] );
