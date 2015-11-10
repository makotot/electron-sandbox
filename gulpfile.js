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
    .src('./src/scss/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      rucksack(),
      cssnano()
    ]))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('style:watch', function (done) {
  gulp
    .src('./src/scss/*.scss')
    .pipe(watch('./src/scss/**/*.scss'))
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      require('stylelint')(),
      require('rucksack-css')(),
      require('cssnano')(),
      require('postcss-reporter')()
    ]))
    .pipe(gulp.dest('./dist/css'));

  done();
});

gulp.task('script', function () {
  return gulp
    .src('./src/js/**/*.{js,jsx}')
    .pipe(plumber())
    .pipe(babel({
    }))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('script:watch', function (done) {
  gulp
    .src('./src/js/**/*.{js,jsx}')
    .pipe(watch('./src/js/**/*.{js,jsx}'))
    .pipe(plumber())
    .pipe(babel({
    }))
    .pipe(gulp.dest('./dist/js'));

  done();
});

gulp.task('lint', function () {
  return gulp
    .src('./src/js/**/*.{js,jsx}')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('serve', ['lint', 'script:watch', 'style:watch'], function () {
  connect.start();

  gulp.watch('main.js', connect.restart);

  gulp.watch(['index.html'], connect.reload);
  gulp.watch(['./src/js/**/*.{js,jsx}'], connect.reload);
  gulp.watch(['./src/scss/**/*.scss'], connect.reload);
});

gulp.task('build', ['lint', 'script', 'style']);

