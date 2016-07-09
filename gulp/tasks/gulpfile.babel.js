/*eslint-disable */
'use strict';
import gulp from 'gulp'
import gulpSequence from 'gulp-sequence';

// import sass from 'gulp-sass';
// import sourcemaps from 'gulp-sourcemaps';
// import autoprefixer from 'gulp-autoprefixer';


// import rollup from 'rollup';


import browserSync from 'browser-sync';

// import compressJs from 'gulp-uglify';
// import compressCss from 'gulp-cssnano';
import rimraf from 'gulp-rimraf';

// import concat from 'gulp-concat';
// import replace from 'gulp-replace';

// import plumber from 'gulp-plumber';

import config from '../config';
import onError from '../utils/handleErrors';

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
