var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon')

gulp.task('default', function() {
    gulp.src(['./src/ng-json-explorer.js'])
    .pipe(concat('ng-json-explorer.min.js'))
    .pipe(gulp.dest('./dist/js'));

    gulp.src(['./src/ng-json-explorer.css'])
    .pipe(concat('ng-json-explorer.min.css'))
    .pipe(gulp.dest('./dist/css'));

    gulp.src(['./src/index.html'])
    .pipe(concat('index.html'))
    .pipe(gulp.dest('./dist'));

    gulp.src(['./src/app.js'])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));

    gulp.src(['./src/data.js'])
    .pipe(concat('data.js'))
    .pipe(gulp.dest('./dist/js'));

    gulp.src(['./bower_components/angularjs/angular.min.js'])
    .pipe(gulp.dest('./dist/libs/js'));
});