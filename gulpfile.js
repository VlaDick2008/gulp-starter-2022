const gulp = require('gulp'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass')(require('sass')),
  browserSync = require('browser-sync').create(),
  cleanCSS = require('gulp-clean-css');

const scss = () => {
  return gulp
    .src('app/scss/*.scss')
    .pipe(sass())
    .pipe(cleanCSS({ compatibility: '*' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream());
};

const html = () => {
  return gulp.src('app/*.html').pipe(browserSync.stream());
};

const server = () => {
  browserSync.init({
    server: {
      baseDir: 'app/',
    },
  });
};

const watcher = () => {
  gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('app/*.html', gulp.parallel('html'));
};

exports.scss = scss;
exports.watch = watcher;
exports.server = server;
exports.html = html;

exports.dev = gulp.series(html, scss, gulp.parallel(watcher, server));

// .pipe(browserSync.stream())
