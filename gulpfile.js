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
  connect = require('electron-connect').server.create(),
  packager = require('electron-packager');


gulp.task('clean', function (done) {
  del(['./dist']).then(function () {
    done();
  });
});

gulp.task('template', function () {
  return gulp
    .src('./src/index.html')
    .pipe(useref())
    .pipe(gulp.dest('./dist'));
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
      .pipe(gulp.dest('./dist/js'));
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

gulp.task('serve', function () {
  runSequence('clean', ['template', 'lint', 'script', 'style'], connect.start);

  //connect.start();

  gulp.watch('main.js', connect.restart);

  gulp.watch(['./src/scss/**/*.scss'], ['style']);
  gulp.watch(['./src/js/**/*.{js,jsx}'], ['script']);
  gulp.watch(['./src/index.html'], ['template']);
  gulp.watch(['./dist/index.html'], connect.reload);
  gulp.watch(['./dist/**/*.js'], connect.reload);
  gulp.watch(['./dist/**/*.css'], connect.reload);
});

gulp.task('build', function () {
  runSequence('clean', ['template', 'lint', 'script', 'style']);
});


gulp.task('package', ['build'], function (done) {
  packager({
    dir: './',
    out: './',
    name: 'ElectronSandbox',
    arch: 'x64',
    platform: 'darwin',
    version: '0.36.0',
    icon: './icons/headphone.icns',
    overwrite: true,
    asar: false,
    prune: true,
    'app-version': require('./package.json').version,
    ignore: [
      'src',
      'node_modules\/(babel-eslint|babel-plugin-transform-object-assign|babel-preset-es2015|babel-preset-react|babelify|browserify|cssnano|del|electron-connect|eslint-config-makotot|eslint-plugin-react|gulp|gulp-babel|gulp-eslint|gulp-if|gulp-plumber|gulp-postcss|gulp-sass|gulp-useref|gulp-watch|postcss-calc|postcss-reporter|rucksack-css|run-sequence|stylelint|stylelint-config-makotot|vinyl-buffer|vinyl-source-stream|watchify)'
    ]
  }, function (err, path) {
    if (err) {
      console.error(err);
    }
    console.log(path);
    done();
  });
});

