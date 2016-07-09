import babel from 'rollup-plugin-babel';

const workingDir = "sketch/tutorial/hierarchies/tree/";

const rollupRead = {
  entry: './' + workingDir + 'src/js/index.js',
  plugins: [
    babel({
      babelrc: false,
      presets: ["es2015-rollup"],
      runtimeHelpers: true
    })
  ]
};

const rollupWrite = {
  format: 'iife',
  sourceMap: true,
  dest: './' + workingDir + 'build/js/main.js'
};

module.exports = {
    browserSync: {
      server: {
        baseDir: "./" + workingDir + "build/"
      },
      files: ['./' + workingDir + 'build/**/*.*'],
      browser: 'google chrome',
      port: 5000,
    },
    rollup : {
      read : rollupRead,
      write : rollupWrite
    },
    js: {
        src: workingDir + 'src/js/**/*.js',
        build: workingDir + 'build/js',
        compress: {
          src: workingDir + 'build/js/*.js',
          build: './' + workingDir + 'build/js'
        }
    },
    sass: {
        src: workingDir + 'src/sass/**/*.scss',
        build: workingDir + 'build/css',
        compress: {
          src: workingDir + 'build/css/*.css',
          build: './' + workingDir + 'build/css'
        }
    },
    html: {
        src: workingDir + 'src/index.html',
        build: workingDir + 'build/',
        replace: {
          build: './' + workingDir + 'build',
        }
    },
    datasets: {
        src: workingDir + 'src/datasets/*',
        build: workingDir + 'build/datasets',
    },
    clean: {
      build: './' + workingDir + 'build/*',
      map: './' + workingDir + 'build/js/*.js.map',
    },
    task: {
      build: {
        js: {
          main: 'build:js:main',
          vendor: 'build:js:vendor'
        },
        sass: 'build:sass',
        html: {
          dev: 'build:html:dev',
          dist: 'build:html:dist'
        }
      },
      compress: {
        js: 'compress:js',
        css: 'compress:css',
      },
      move: {
        datasets: 'move:datasets'
      }
    }
  };
