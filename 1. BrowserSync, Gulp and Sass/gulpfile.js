// Loading Plugins

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

// Defining Default Task

gulp.task('default', ['clean'], function() {
    // Start all Tasks
    gulp.start('browser-sync');
});

// Defining Additional Tasks

gulp.task('browser-sync', ['sass'], function() {
    // Initialize BrowserSync
    browserSync.init({
        server: "./"
    });
    // Initializing monitoring of .html and .scss file changes
    gulp.watch("Styles/scss/*.scss", ['sass']);
    gulp.watch("*.html").on('change', reload);
});

gulp.task('sass', function () {
    // Setup Sass compiling and corresponding sourcemaps generation
    return gulp.src("Styles/scss/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("Styles/css"))
        .pipe(reload({stream: true}));
});

gulp.task('clean', function() {
    // Clean up before startup - removing previously generated .css files
    return del(['Styles/css']);
});