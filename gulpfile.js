require('babel-core/register');
// require('./gulpfile.babel.js');

const rd = require('require-dir');

rd('gulp/tasks', {
    recurse: true
});
