var gulp = require('gulp');
var webServer = require('gulp-webserver');

gulp.task('run', function() {
  gulp.src('app')
    .pipe();
});

gulp.task('run', function() {
  gulp.src('build')
    .pipe(webServer({
      livereload: true,
      fallback: "index.html",
      port: 8080,
      open: true
    }));
});

gulp.task('default', function() {
  // TODO
});