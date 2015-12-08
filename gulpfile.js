var gulp = require('gulp'),
  gulpIf = require('gulp-if'),
  browserify = require('browserify'),
  watchify = require('watchify'),
  babelify = require('babelify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  eslint = require('gulp-eslint'),
  plumber = require('gulp-plumber'),
  watch = require('gulp-watch'),
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  del = require('del'),
  runSequence = require('run-sequence'),
  useref = require('gulp-useref'),
  jsonEditor = require('gulp-json-editor'),
  connect = require('electron-connect').server.create();


gulp.task('clean', function (done) {
  del(['./app/dist']).then(function () {
    done();
  });
});

gulp.task('template', function () {
  return gulp
    .src('./src/index.html')
    .pipe(useref())
    .pipe(gulp.dest('./app/dist'));
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
    .pipe(gulp.dest('./app/dist/css'));
});

gulp.task('script', function () {
  var bundler = browserify('src/js/app.jsx', {
    debug: true
  })
  .transform(babelify, {
    "presets": ["es2015", "react"],
    "plugins": ["transform-object-assign"]
  });

  function rebundle () {
    bundler
      .bundle()
      .on('error', function (err) {
        console.error(err); this.emit('end');
      })
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(gulp.dest('./app/dist/js'));
  }

  bundler.on('update', function () {
    console.log('-> bundling...');
    rebundle();
  });

  rebundle();
})

gulp.task('lint', function () {
  return gulp
    .src('./src/js/**/*.{js,jsx}')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('packagejson', function (done) {
  return gulp
    .src('./package.json')
    .pipe(jsonEditor(function (json) {
      json.main = 'main.js';
      json.devDependencies = {};

      return json;
    }))
    .pipe(gulp.dest('./app'));
});


gulp.task('serve', function () {
  runSequence('clean', ['lint', 'template', 'script', 'style']);

  connect.start();

  gulp.watch('./app/main.js', connect.restart);

  gulp.watch(['./src/scss/**/*.scss'], ['style']);
  gulp.watch(['./src/index.html'], ['template']);
  gulp.watch(['./src/js/**/*.{js,jsx}'], ['script']);
  gulp.watch(['./app/dist/index.html'], connect.reload);
  gulp.watch(['./app/dist/**/*.js'], connect.reload);
  gulp.watch(['./app/dist/**/*.css'], connect.reload);
});

gulp.task('build', function () {
  runSequence('clean', ['lint', 'template', 'script', 'style', 'packagejson']);
});

