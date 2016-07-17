var gulp = require('gulp');
//var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');

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

gulp.task('cssnano', function () {
  return gulp.src('src/css/*.css')
    .pipe(concat('all.css'))
    .pipe(cssnano())
    .pipe(rename('all.min.css'))
    .pipe(gulp.dest('dist/css'));
//    .pipe(notify({ message: 'CSS minification completed' }));
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
gulp.task('watch', ['browserSync','minify','cssnano'],function() {
  gulp.watch('src/**/*', ['minify']);
});

// Default
gulp.task('move',['just_move']);
gulp.task('default', ['minify', 'watch']);
gulp.task('greet',['say_hello']);
