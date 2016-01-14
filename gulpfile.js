var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var rewriteCSS = require('gulp-rewrite-css');

var js_files = [
    "./bower_components/angular/angular.js",
    "./bower_components/zlib.js/bin/zlib_and_gzip.min.js",
    "./bower_components/Chart.js/Chart.js",
    "./bower_components/angular-chart.js/dist/angular-chart.js",
    "./bower_components/leaflet/dist/leaflet.js",
    "./bower_components/angular-leaflet-directive/dist/angular-leaflet-directive.js",
    "./bower_components/moment/moment.js",
    "./bower_components/angular-moment/angular-moment.js",
    "./js/app.js"
];

var css_files = [
    "./bower_components/semantic/dist/components/reset.css",
    "./bower_components/semantic/dist/components/site.css",
    "./bower_components/semantic/dist/components/container.css",
    "./bower_components/semantic/dist/components/header.css",
    "./bower_components/semantic/dist/components/icon.css",
    "./bower_components/semantic/dist/components/list.css",
    "./bower_components/semantic/dist/components/segment.css",
    "./bower_components/angular-chart.js/dist/angular-chart.css",
    "./bower_components/leaflet/dist/leaflet.css",
    "./css/basics.css",
    "./css/colors.css"
];

gulp.task('scripts', function() {
    gulp.src(js_files)
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('styles', function() {
    gulp.src(css_files)
        .pipe(rewriteCSS({destination:'./dist/'}))
        .pipe(concat('all.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('./dist/'));
});
