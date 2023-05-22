let gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass')(require('node-sass'));

// Compile sass into CSS & auto-inject into browers
gulp.task('sass', function() {
    return gulp.src([/*'node_modules/boostrap/scss/boostrap.scss',*/ 'css/*.scss']) // sources where read scss files
    .pipe(sass()) // Applies scss compilation
    .pipe(gulp.src("css"))
    .pipe(browserSync.stream());
});
    
// Move the javascript files into our /src/js folder
gulp.task('js', function(){
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('js'))
        .pipe(browserSync.stream());
});

// Static server + watching scss/html file
gulp.task('serve', gulp.series('sass', function() {
    browserSync.init({
        server: "./"
    });
    gulp.watch([/*'node_modules/bootstrap/scss/bootstrap.scss',*/ 'css/*.scss'], gulp.series('sass'));
    gulp.watch("*.html").on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('js', 'serve'));