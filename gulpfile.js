/*eslint-disable */
var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');

var bower = require('bower-files');
var rollup = require('rollup');
var babel = require('rollup-plugin-babel');

var browserSync = require('browser-sync');

var compressJs = require('gulp-uglify');
var compressCss = require('gulp-cssnano');
var rimraf = require('gulp-rimraf');

var concat = require('gulp-concat');
var replace = require('gulp-replace');

var reload = browserSync.reload;

var workingDir = "test/";

// Browser
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./" + workingDir + "build/"
    },
    files: ['./' + workingDir + 'build/**/*.*'],
    browser: 'google chrome',
    port: 5000,
  });
});

// Watch
gulp.task('watch', function() {
  gulp.watch(workingDir + 'src/js/**/*.js', ['build:js:main']);
  gulp.watch(workingDir + 'src/css/**/*.css', ['build:css']);
  gulp.watch(workingDir + 'src/*.html', ['build:html']);
  gulp.watch(workingDir + 'src/datasets/*', ['move:datasets']);
  gulp.watch(workingDir + 'src/fonts/*', ['move:fonts']);
});

// Javascript VENDOR
gulp.task('build:js:main', function() {
 return rollup.rollup({
   entry: './' + workingDir + 'src/js/index.js',
   plugins: [
		 babel({ runtimeHelpers: true })
	 ]
 }).then( function ( bundle ) {
   bundle.write({
     format: 'iife',
     sourceMap: true,
     dest: './' + workingDir + 'build/js/main.js'
   });
   browserSync.reload();
 });
});

// Javascript VENDOR
gulp.task('build:js:vendor', () => {
  const lib = bower();
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.js'))
    .pipe(compressJs())
    .pipe(gulp.dest(workingDir + 'build/js'));
});

// COMPRESSION
gulp.task('compress:js', ['clean:map'], function() {
  return gulp.src(workingDir + 'build/js/*.js')
    .pipe(compressJs())
    .pipe(gulp.dest('./' + workingDir + 'build/js'));
});

gulp.task('compress:css', function() {
  return gulp.src(workingDir + 'build/css/*.css')
    .pipe(compressCss())
    .pipe(gulp.dest('./' + workingDir + 'build/css'));
});

// HTML
var envReplace = function (env) {
  return gulp.src([workingDir + 'src/index.html'])
    .pipe(replace('__REPLACE_ENV__', env))
    .pipe(gulp.dest('./' + workingDir + 'build'));
}

gulp.task('build:html:dev', function() {
  return envReplace('development');
});

gulp.task('build:html:dist', function() {
  return envReplace('production');
});

// CSS
gulp.task('build:css', function() {
  return gulp.src('./' + workingDir + 'src/css/*.css')
  .pipe(gulp.dest(workingDir + 'build/css'))
  .pipe(reload({stream:true}));
});

// Datasets
gulp.task('move:datasets', function() {
  return gulp.src('./' + workingDir + 'src/datasets/*')
  .pipe(gulp.dest(workingDir + 'build/datasets'))
  .pipe(reload({stream:true}));
});

// Fonts
gulp.task('move:fonts', function() {
  return gulp.src('./' + workingDir + 'src/fonts/*')
  .pipe(gulp.dest('./' + workingDir + 'build/fonts'))
  .pipe(reload({stream:true}));
});

// Clean
gulp.task('clean', function() {
   return gulp.src('./' + workingDir + 'build/*', { read: false })
		.pipe(rimraf({ force: true }));
});

gulp.task('clean:map', function () {
  return gulp.src('./' + workingDir + 'build/js/*.js.map', { read: false })
    .pipe(rimraf({ force: true }));
});

gulp.task('move', ['move:datasets', 'move:fonts']);
gulp.task('build:assets', ['build:js:main', 'build:js:vendor', 'build:css', 'move']);
gulp.task('compress', ['compress:js', 'compress:css']);

gulp.task('default', gulpSequence('clean', ['build:html:dev', 'build:assets'], 'browser-sync', 'watch'));
gulp.task('dist', gulpSequence('clean', ['build:html:dist', 'build:assets'], 'compress'));
