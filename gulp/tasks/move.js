import gulp from 'gulp'
import config from '../config';

gulp.task('move:datasets', () => {
  return gulp.src(config.datasets.src)
  .pipe(gulp.dest(config.datasets.build));
});
