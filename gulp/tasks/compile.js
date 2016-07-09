import gulp from 'gulp'
import rollup from 'rollup';

import bower from 'bower-files';
import concat from 'gulp-concat';
import compressJs from 'gulp-uglify';

import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import compressCss from 'gulp-cssnano';
import plumber from 'gulp-plumber';

import config from '../config';
import onError from '../utils/handleErrors';

gulp.task('build:js:main', () => {
 return rollup
 .rollup(config.rollup.read)
 .then( function ( bundle ) {
   bundle.write(config.rollup.write);
 })
});


gulp.task('build:js:vendor', () => {
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
