var gulp = require('gulp'),
  gulpIf = require('gulp-if'),
  babel = require('gulp-babel')
  eslint = require('gulp-eslint'),
  plumber = require('gulp-plumber'),
  watch = require('gulp-watch'),
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  del = require('del'),
  runSequence = require('run-sequence'),
  connect = require('electron-connect').server.create();


gulp.task('clean', function (done) {
  del(['./dist'], function () {
    done();
  });
});

gulp.task('style', function () {
  return gulp
    .src('./src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      require('stylelint')(),
      require('rucksack-css')(),
      require('cssnano')(),
      require('postcss-reporter')()
    ]))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('script', function () {
  return gulp
    .src('./src/js/**/*.{js,jsx}')
    .pipe(plumber())
    .pipe(babel({
    }))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('lint', function () {
  return gulp
    .src('./src/js/**/*.{js,jsx}')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('serve', ['lint', 'script', 'style'], function () {
  connect.start();

  gulp.watch('main.js', connect.restart);

  gulp.watch(['./src/scss/**/*.scss'], ['style'])
  gulp.watch(['./src/js/**/*.{js,jsx}'], ['script'])
  gulp.watch(['index.html'], connect.reload);
  gulp.watch(['./dist/**/*.js'], connect.reload);
  gulp.watch(['./dist/**/*.css'], connect.reload);
});

gulp.task('build', ['lint', 'script', 'style']);

