var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserSync = require('browser-sync').create();

process.env.NODE_ENV = 'production';

//Bundle with Browserify
gulp.task('build:js', function(){
	browserify({entries:['./src/index.js'], debug:false})
	.transform('babelify')
	.bundle()
	.pipe(source('bundle.js'))
	.pipe(buffer())
	.pipe(gulp.dest('./public'))
});

//Start a server with root as the 'public' directory
gulp.task('default', ['build:js'], function() {
    browserSync.init({
        server: {
            baseDir: './public'
        }
    });
});