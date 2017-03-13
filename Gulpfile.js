const gulp = require('gulp');
const babel = require('gulp-babel');
const connect = require('gulp-connect');
const plumber = require('gulp-plumber');

gulp.task('babel', () =>
    gulp.src('./index.js')
        .pipe(plumber())
        .pipe(babel())
        .pipe(gulp.dest('dist'))
);

gulp.task('connect', () => {
    connect.server();
});

gulp.task('watch', () => {
    gulp.watch('./index.js', ['babel']);
});

gulp.task('default', ['babel', 'connect', 'watch']);