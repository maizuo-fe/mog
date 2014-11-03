var gulp = require('gulp');

var duo = require('gulp-duojs');

gulp.task('compile', function () {
  gulp.src('src/index.js')
    .pipe(duo({standalone: 'mog'}))
    .pipe(gulp.dest('./dest'))
    .on('error', function (err) {
      console.log(err);
    });
});

