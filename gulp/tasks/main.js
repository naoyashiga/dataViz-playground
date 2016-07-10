/*eslint-disable */
'use strict';
import gulp from 'gulp'
import gulpSequence from 'gulp-sequence';

import config from '../config';

gulp.task('move', [config.task.move.datasets]);

gulp.task('build:assets',
[
  config.task.build.js.main,
  config.task.build.js.vendor,
  config.task.build.sass,
  'move'
]);

gulp.task('compress',
[
  config.task.compress.js,
  config.task.compress.css
]);

gulp.task('default', gulpSequence('browser-sync', 'watch'));
// gulp.task('default',
// gulpSequence(
//   'clean',
//   [config.task.build.html.dev, 'build:assets'],
//   'browser-sync',
//   'watch'
// ));

gulp.task('dist',
gulpSequence(
  'clean',
  [config.task.build.html.dist, 'build:assets'],
  'compress'
));
