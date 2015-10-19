var gulp = require('gulp');

var PATHS = {
    src: 'src/**/*.ts',
    html: 'src/**/*.html'
};

gulp.task('clean', function (done) {
    var del = require('del');
    del(['dist'], done);
});

gulp.task('convert', function () {
    var ts = require('gulp-typescript');
    var sourcemaps = require('gulp-sourcemaps');
    var tsProject = ts.createProject('tsconfig.json');
    var tsResult = gulp.src(PATHS.src)
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));

    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});

gulp.task('copyfiles', ['convert'], function () { // the second argument to task indicates dependency on completion
    gulp.src(PATHS.html)
        .pipe(gulp.dest('dist'));
});

gulp.task('dev', ['convert', 'copyfiles'], function () {
    var http = require('http');
    var connect = require('connect');
    var serveStatic = require('serve-static');
    var open = require('open');

    var port = 9000, app;

    gulp.watch(PATHS.src, ['convert']);
    gulp.watch(PATHS.html, ['copyfiles']);

    app = connect().use(serveStatic(__dirname));
    http.createServer(app).listen(port, function () {
        open('http://localhost:' + port);
    });
});

