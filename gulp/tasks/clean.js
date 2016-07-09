import gulp from 'gulp'
import rimraf from 'gulp-rimraf';

import config from '../config';

gulp.task('clean', () => {
   return gulp.src(config.clean.build, { read: false })
		.pipe(rimraf({ force: true }));
});

gulp.task('clean:map', function () {
  return gulp.src(config.clean.map, { read: false })
    .pipe(rimraf({ force: true }));
});
