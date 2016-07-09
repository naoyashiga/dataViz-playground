/*eslint-disable */
var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');

const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

var bower = require('bower-files');
var rollup = require('rollup');
var babel = require('rollup-plugin-babel');

var browserSync = require('browser-sync');

var compressJs = require('gulp-uglify');
var compressCss = require('gulp-cssnano');
var rimraf = require('gulp-rimraf');

var concat = require('gulp-concat');
var replace = require('gulp-replace');

var plumber = require('gulp-plumber');
var notifier = require('node-notifier');

var workingDir = "sketch/tutorial/hierarchies/tree/";

const onError = function(error) {
  notifier.notify({
    message: error.message,
    title: error.plugin,
    sound: 'Pop'
  });
  console.log(error);
  this.emit('end')
};

// server
const reload = browserSync.reload;

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
  gulp.watch(workingDir + 'src/js/**/*.js', ['build:js:main', reload]);
  gulp.watch(workingDir + 'src/sass/**/*.scss', ['build:sass', reload]);
  gulp.watch(workingDir + 'src/*.html', ['build:html:dev', reload]);
  gulp.watch(workingDir + 'src/datasets/*', ['move:datasets', reload]);
  gulp.watch(workingDir + 'src/fonts/*', ['move:fonts', reload]);
});

const read = {
  entry: './' + workingDir + 'src/js/index.js',
  plugins: [
    babel({ runtimeHelpers: true })
  ]
};

const write = {
  format: 'iife',
  sourceMap: true,
  dest: './' + workingDir + 'build/js/main.js'
};

// Javascript VENDOR
gulp.task('build:js:main', function() {
 return rollup
 .rollup(read)
 .then( function ( bundle ) {
   bundle.write(write);
 })
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

const sassOptions = {
  outputStyle: 'expanded'
};

const autoprefixerOptions = {
  browsers: ['last 2 versions']
};

// CSS
gulp.task('build:sass', function() {
  return gulp.src('./' + workingDir + 'src/sass/*.scss')
  .pipe(plumber({ errorHandler: onError }))
  .pipe(sourcemaps.init())
  .pipe(sass(sassOptions))
  .pipe(sourcemaps.write())
  // .pipe(sourcemaps.write('./maps', { addComment: false }))
  .pipe(autoprefixer(autoprefixerOptions))
  .pipe(gulp.dest(workingDir + 'build/css'));
});

// Datasets
gulp.task('move:datasets', function() {
  return gulp.src('./' + workingDir + 'src/datasets/*')
  .pipe(gulp.dest(workingDir + 'build/datasets'));
  // .pipe(reload({stream:true}));
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
gulp.task('build:assets', ['build:js:main', 'build:js:vendor', 'build:sass', 'move']);
gulp.task('compress', ['compress:js', 'compress:css']);

gulp.task('default', gulpSequence('browser-sync', 'watch'));
// gulp.task('default', gulpSequence('clean', ['build:html:dev', 'build:assets'], 'browser-sync', 'watch'));
gulp.task('dist', gulpSequence('clean', ['build:html:dist', 'build:assets'], 'compress'));
