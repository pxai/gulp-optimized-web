var gulp = require('gulp');
//var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

// Lint JS
gulp.task('lint', function() {
  return gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Concat & Minify JS
gulp.task('minify', function(){
  return gulp.src('src/js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Watch Our Files
gulp.task('watch', function() {
  //gulp.watch('src/*.js', ['lint', 'minify']);
  gulp-watch('src/js/*.js', ['minify']);
});

// Default
gulp.task('default', ['minify', 'watch']);
