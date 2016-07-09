/*eslint-disable */
'use strict';
import gulp from 'gulp'
import gulpSequence from 'gulp-sequence';

import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';

import bower from 'bower-files';
import rollup from 'rollup';


import browserSync from 'browser-sync';

import compressJs from 'gulp-uglify';
import compressCss from 'gulp-cssnano';
import rimraf from 'gulp-rimraf';

import concat from 'gulp-concat';
import replace from 'gulp-replace';

import plumber from 'gulp-plumber';

import config from '../config';
import onError from '../utils/handleErrors';


// const onError = function(error) {
//   notifier.notify({
//     message: error.message,
//     title: error.plugin,
//     sound: 'Pop'
//   });
//   console.log(error);
//   this.emit('end')
// };

// server
const reload = browserSync.reload;

// Browser
gulp.task('browser-sync', () => {
  browserSync.init(config.browserSync);
});

// Watch
gulp.task('watch', () => {
  gulp.watch(config.js.src, ['build:js:main', reload]);
  gulp.watch(config.sass.src, ['build:sass', reload]);
  gulp.watch(config.html.src, ['build:html:dev', reload]);
  gulp.watch(config.datasets.src, ['move:datasets', reload]);
});

// const read = {
//   entry: './' + workingDir + 'src/js/index.js',
//   plugins: [
//     babel({
//       babelrc: false,
//       presets: ["es2015-rollup"],
//       runtimeHelpers: true
//     })
//   ]
// };
//
// const write = {
//   format: 'iife',
//   sourceMap: true,
//   dest: './' + workingDir + 'build/js/main.js'
// };

// Javascript VENDOR
gulp.task('build:js:main', () => {
 return rollup
 .rollup(config.rollup.read)
 .then( function ( bundle ) {
   bundle.write(config.rollup.write);
 })
});

// Javascript VENDOR
gulp.task('build:js:vendor', () => {
  const lib = bower();
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.js'))
    .pipe(compressJs())
    .pipe(gulp.dest(config.js.build));
});

// COMPRESSION
gulp.task('compress:js', ['clean:map'], () => {
  return gulp.src(config.js.compress.src)
    .pipe(compressJs())
    .pipe(gulp.dest(config.js.compress.build));
});

gulp.task('compress:css', () => {
  return gulp.src(config.sass.compress.src)
    .pipe(compressCss())
    .pipe(gulp.dest(config.sass.compress.build));
});

// HTML
var envReplace = function (env) {
  return gulp.src([config.html.src])
    .pipe(replace('__REPLACE_ENV__', env))
    .pipe(gulp.dest(config.html.replace.build));
}

gulp.task('build:html:dev', () => {
  return envReplace('development');
});

gulp.task('build:html:dist', () => {
  return envReplace('production');
});

const sassOptions = {
  outputStyle: 'expanded'
};

const autoprefixerOptions = {
  browsers: ['last 2 versions']
};

// CSS
gulp.task('build:sass', () => {
  return gulp.src(config.sass.src)
  .pipe(plumber({ errorHandler: onError }))
  .pipe(sourcemaps.init())
  .pipe(sass(sassOptions))
  .pipe(sourcemaps.write())
  // .pipe(sourcemaps.write('./maps', { addComment: false }))
  .pipe(autoprefixer(autoprefixerOptions))
  .pipe(gulp.dest(config.sass.build));
});

// Datasets
gulp.task('move:datasets', () => {
  return gulp.src(config.datasets.src)
  .pipe(gulp.dest(config.datasets.src));
  // .pipe(reload({stream:true}));
});

// Clean
gulp.task('clean', () => {
   return gulp.src(config.clean.build, { read: false })
		.pipe(rimraf({ force: true }));
});

gulp.task('clean:map', function () {
  return gulp.src(config.clean.map, { read: false })
    .pipe(rimraf({ force: true }));
});

gulp.task('move', ['move:datasets']);
gulp.task('build:assets', ['build:js:main', 'build:js:vendor', 'build:sass', 'move']);
gulp.task('compress', ['compress:js', 'compress:css']);

gulp.task('default', gulpSequence('browser-sync', 'watch'));
// gulp.task('default', gulpSequence('clean', ['build:html:dev', 'build:assets'], 'browser-sync', 'watch'));
gulp.task('dist', gulpSequence('clean', ['build:html:dist', 'build:assets'], 'compress'));
