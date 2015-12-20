'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var open = require('gulp-open');
var connect = require('gulp-connect');
var minifyCss = require('gulp-minify-css');
var open = require('gulp-open');

function isArray (arr) {
  return typeof path == 'object' && path.hasOwnProperty('length');
}

function genFile (path, filename, shouldUglify, dist) {
  var fileList = [];
  if (isArray(path)) {
    fileList = path;
  } else {
    fileList.push(path);
  }
  var file = gulp.src(fileList);
  if (shouldUglify) {
    file
      .pipe(concat(filename.replace('.js', '.min.js')))
      .pipe(uglify())
      .pipe(gulp.dest(dist));
  }
  file
    .pipe(concat(filename))
    .pipe(gulp.dest(dist));
}

gulp.task('dev', function () {
  gulp
    .src(['./src/angular-json-explorer.js', './src/angular-json-explorer.css'])
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload({port: 5000}));
});

gulp.task('dist', function () {
  gulp
    .src('./src/angular-json-explorer.js')
    .pipe(uglify())
    .pipe(concat('angular-json-explorer.min.js'))
    .pipe(gulp.dest('./dist'));

  gulp
    .src('./src/angular-json-explorer.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(concat('angular-json-explorer.min.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {
  gulp.watch('./src/**/*', ['dev', 'dist']);
});

gulp.task('run', function () {
  connect.server({
    root: ['demo', 'dist'],
    port: 5000,
    livereload: true
  });
});

gulp.task('open', function () {
  gulp
    .src(__filename)
    .pipe(open({uri: 'http://127.0.0.1:5000'}));
});

gulp.task('default', ['dev', 'run', 'watch', 'open']);