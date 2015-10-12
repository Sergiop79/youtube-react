'use strict';

 var gulp         = require('gulp');
 var browserify   = require('browserify');
 var babelify     = require('babelify');
 var source       = require('vinyl-source-stream');
 var rename       = require('gulp-rename');
 var uglify       = require('gulp-uglify');
 var sass         = require('gulp-sass');
 var autoprefixer = require('gulp-autoprefixer');

 gulp.task('build', function () {
  return browserify({
    entries: 'app.js',
    extensions: ['.js'],
    debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'))
  });


 gulp.task('sass', function () {
  gulp.src('./scss/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./dist'));
  });


 gulp.task('compress', function () {
    return gulp.src('dist/bundle.js')
        .pipe(uglify())
        .pipe(rename('bundle.min.js'))
        .pipe(gulp.dest('dist'));
 });

gulp.task('watch', function () {
    gulp.watch(['app.js', './components/**/*.js'], ['build']);
    gulp.watch('./scss/**/*.scss', ['sass']);
});

 gulp.task('default', ['build', 'sass']);
