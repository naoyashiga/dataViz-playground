import gulp from 'gulp'
import compressJs from 'gulp-uglify';
import compressCss from 'gulp-cssnano';
import config from '../config';

gulp.task(config.task.compress.js, ['clean:map'], () => {
  return gulp.src(config.js.compress.src)
    .pipe(compressJs())
    .pipe(gulp.dest(config.js.compress.build));
});

gulp.task(config.task.compress.css, () => {
  return gulp.src(config.sass.compress.src)
    .pipe(compressCss())
    .pipe(gulp.dest(config.sass.compress.build));
});
