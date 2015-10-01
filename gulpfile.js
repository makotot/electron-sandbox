var gulp = require('gulp'),
  babel = require('gulp-babel')
  watch = require('gulp-watch'),
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  del = require('del'),
  rucksack = require('rucksack-css'),
  cssnano = require('cssnano'),
  runSequence = require('run-sequence'),
  connect = require('electron-connect').server.create();


gulp.task('clean', function (done) {
  del(['./dist'], function () {
    done();
  });
});

gulp.task('style', function () {
  return gulp
    .src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('style:watch', function (done) {
  gulp
    .src('./src/scss/*.scss')
    .pipe(watch('./src/scss/**/*.scss'))
    .pipe(sass())
    .pipe(postcss([
      rucksack(),
      cssnano()
    ]))
    .pipe(gulp.dest('./dist/css'));

  done();
});

gulp.task('script', function () {
  return gulp
    .src('./src/js/**/*.{js,jsx}')
    .pipe(babel())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('script:watch', function (done) {
  gulp
    .src('./src/js/**/*.{js,jsx}')
    .pipe(watch('./src/js/**/*.{js,jsx}'))
    .pipe(babel())
    .pipe(gulp.dest('./dist/js'));

  done();
});

gulp.task('serve', ['script:watch', 'style:watch'], function () {
  connect.start();

  gulp.watch('main.js', connect.restart);

  gulp.watch(['index.html'], connect.reload);
  gulp.watch(['./src/js/**/*.{js,jsx}'], connect.reload);
  gulp.watch(['./src/js/**/*.css'], connect.reload);
});

