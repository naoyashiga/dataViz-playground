import gulp from 'gulp'

// js
import rollup from 'rollup';
import bower from 'bower-files';
import concat from 'gulp-concat';
import compressJs from 'gulp-uglify';

// sass
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import compressCss from 'gulp-cssnano';
import plumber from 'gulp-plumber';

// html
import replace from 'gulp-replace';

import config from '../config';
import onError from '../utils/handleErrors';

gulp.task(config.task.build.js.main, () => {
 return rollup
 .rollup(config.rollup.read)
 .then( function ( bundle ) {
   bundle.write(config.rollup.write);
 })
});


gulp.task(config.task.build.js.vendor, () => {
  const lib = bower();
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.js'))
    .pipe(compressJs())
    .pipe(gulp.dest(config.js.build));
});

const sassOptions = {
  outputStyle: 'expanded'
};

const autoprefixerOptions = {
  browsers: ['last 2 versions']
};

gulp.task(config.task.build.sass, () => {
  return gulp.src(config.sass.src)
  .pipe(plumber({ errorHandler: onError }))
  .pipe(sourcemaps.init())
  .pipe(sass(sassOptions))
  .pipe(sourcemaps.write())
  // .pipe(sourcemaps.write('./maps', { addComment: false }))
  .pipe(autoprefixer(autoprefixerOptions))
  .pipe(gulp.dest(config.sass.build));
});

const envReplace = (env) => {
  return gulp.src([config.html.src])
    .pipe(replace('__REPLACE_ENV__', env))
    .pipe(gulp.dest(config.html.replace.build));
}

gulp.task(config.task.build.html.dev, () => {
  return envReplace('development');
});

gulp.task(config.task.build.html.dist, () => {
  return envReplace('production');
});
