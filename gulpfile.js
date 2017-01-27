/**
 * Module Dependencies
 */

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');
var g_sass = require('gulp-sass');
var pug = require('gulp-pug');
var css_files = [
  // this is the sass path
  './libs/**/*.sass'

  // this is the css path
  ,'./public/css'
];

var pug_files = [

  // this is the pug path
  './public/**/*.pug'

];

/**
 * Gulp Tasks
 */

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync({
    proxy: "localhost:7000",  // what do you want to proxy
    port: 5000,  // use *different* port than above
    notify: true
  });
});

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: 'server.js'
		,ext: 'js pug sass'
    ,ignore: [
      'gulpfile.js',
      'node_modules/'
    ]
  })
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      reload({ stream: false });
    }, 1000);
  });
});
gulp.task('sass', ()=> {
  return gulp.src(css_files[0])
  .pipe(gulp.dest(css_files[1]))
  // .pipe(browserSync.reload)
});
gulp.task("pug", ()=> {
  return gulp.src(pug_files[0])
  .pipe(pug({pretty: true}))
});
gulp.task('default', ['browser-sync', 'sass', 'pug'], function () {
	gulp.watch([pug_files[0]], reload);
  gulp.watch([css_files[0]], reload);
});
