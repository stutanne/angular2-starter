var gulp = require('gulp');
var del = require('del');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var http = require('http');
var connect = require('connect');
var serveStatic = require('serve-static');
var open = require('open');
var cache = require('gulp-cached');

var port = 9000;
var app;
var PATHS = {
    src: 'src/**/*.ts',
    html: 'src/**/*.html'
};
var tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', function (done) {
    del(['dist'], done);
});

gulp.task('convert', function () {
    var tsResult = gulp.src(PATHS.src)
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));

    return tsResult.js
        .pipe(cache('converting'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});

gulp.task('copyfiles', ['convert'], function () { // the second argument to task indicates dependency on completion
    gulp.src(PATHS.html)
        .pipe(gulp.dest('dist'));
});

gulp.task('dev', ['convert', 'copyfiles'], function () {
    gulp.watch(PATHS.src, ['convert']);
    gulp.watch(PATHS.html, ['copyfiles']);

    app = connect().use(serveStatic(__dirname));
    http.createServer(app).listen(port, function () {
        open('http://localhost:' + port);
    });
});

