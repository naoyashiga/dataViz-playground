import gulp from 'gulp'
import browserSync from 'browser-sync';
import config from '../config';

// server
const reload = browserSync.reload;

// Browser
gulp.task('browser-sync', () => {
  browserSync.init(config.browserSync);
});

// Watch
gulp.task('watch', () => {
  gulp.watch(config.js.src, [config.task.build.js.main, reload]);
  gulp.watch(config.sass.src, [config.task.build.sass, reload]);
  gulp.watch(config.html.src, [config.task.build.html.dev, reload]);
  gulp.watch(config.datasets.src, [config.task.move.datasets, reload]);
});
