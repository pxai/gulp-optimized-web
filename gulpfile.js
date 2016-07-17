var gulp = require('gulp');
//var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var browserSync = require('browser-sync');
var del = require('del');

gulp.task('say_hello', function() {
	console.log('Gulp says hello');
});

gulp.task('just_move', function () {
  return gulp.src('src/**/*')
    .pipe(gulp.dest('dist/'));
});

gulp.task('browserSync', function () {
  browserSync.init({
	server : {
	 baseDir: 'dist'
	}
  });
});

// Lint JS
gulp.task('lint', function() {
  return gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Concat & Minify CSS
gulp.task('cssnano', function () {
   return gulp.src('src/css/*.css')
    .pipe(cssnano())
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest('dist/css'));
//    .pipe(notify({ message: 'CSS minification completed' }));
});

// Concat & Minify JS
gulp.task('minify', function(){
  return gulp.src('src/js/*.js')
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
});

gulp.task('useref', function(){
  return gulp.src('src/*.html')
    .pipe(useref())
    .pipe(gulp.dest('dist'))
});

// Watch Our Files
gulp.task('watch',function() {
  // and now my watch begins...
  gulp.watch('src/js/*.js', ['minify']);
  gulp.watch('src/css/*.css', ['cssnano']);
  gulp.watch('src/index.html', ['useref']);
});

gulp.task('clean', function() {
  return del(['dist/js/*.js', 'dist/css/*.css', 'dist/*.html']);
});

// Default
gulp.task('move',['just_move']);
gulp.task('greet',['say_hello']);
gulp.task('default', ['useref','clean','minify','cssnano','browserSync','watch']);
