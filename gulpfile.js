const gulp = require('gulp'); 
//const imagemin = require('imagemin');
//import imagemin from 'imagemin';
const { src, series, parallel, dest, watch } = require('gulp');

function copyHtml() {
    return src('src/*.html').pipe(gulp.dest('dist/'));
}

function imgTask() {
    return src('src/img/*.{png,jpg,jpeg,gif}').pipe(imagemin()).pipe(dest('dist/img'));
}

exports.imgTask = imgTask;
exports.copyHtml = copyHtml;
exports.default = copyHtml;
//throw new Error("None error");
/*
    //del = require('del'), // This doesn't works with gulp current verion ^8
    csso = require('gulp-csso'),
    browserSync = require('browser-sync').create(),
    autoPrefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass')(require('node-sass')),
    flatmap = require('gulp-flatmap'),
    usemin = require('gulp-usemin'),
    htmlmin = require('gulp-htmlmin'),
    //rev = require('gulp-rev'),
    runSequence = require('run-sequence'),
    uglify = require('gulp-uglify');
*/
// Set the browser that you want to support
const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

// Delete dist/ folder
gulp.task('clean', function() {
    return del(['./dist/**'], {force: true});
});


// Compile sass into CSS & auto-inject into browser
gulp.task('sass', function() {
    return gulp.src(['css/*.scss']) // sources where read scss files
    // Compile SASS files
    /*.pipe(sass({
        outputStyle: 'nested',
        precision: 10,
        includePaths: ['.'],
        onError: console.error.bind(console, 'Sass error:')
    }))*/ // Applies scss compilation
    // Auto-prefix css styles fro cross browsers compatibility
    .pipe(autoPrefixer({overrideBrowserslist: AUTOPREFIXER_BROWSERS}))
    // Minify the file
    .pipe(csso())
    // Output
    .pipe(gulp.dest("dist/css"))
    // Auto-inject into browsers
    .pipe(browserSync.stream());
});
    
// Move the javascript files into our /dist/js folder
gulp.task('js', function(){
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.js', 'node_modules/jquery/dist/jquery.js'])
        // Minify the files
        .pipe(uglify())
        // Output
        .pipe(gulp.dest('dist/js'))
        // Auto-inject into browsers
        .pipe(browserSync.stream());
});

// Gulp task to minify HTML files
gulp.task('pages', function() {
    return gulp.src('./*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('usemin', function() {
    return gulp.src('./*.html')
        .pipe(flatmap(function(stream, file) {
            return stream
            .pipe(usemin({
                css: [rev()],
                html: [function() { return htmlmin( { collapseWhitespace: true}) }],
                js: [uglify(), rev()],
                inlinejs: [uglify()],
                inlinecss: [cleanCss(), 'concat']
            }));
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('copyfiles', function() {
    return gulp.src('storage/**')
        .pipe(gulp.dest('dist/files/'));
});

// Static server + watching scss/html file
gulp.task('serve', gulp.series('sass', function() {
    browserSync.init({
        server: "./"
    });
    gulp.watch([/*'node_modules/bootstrap/scss/bootstrap.scss',*/ 'css/*.scss'], gulp.series('sass'));
    gulp.watch("*.html").on('change', browserSync.reload);
}));

//gulp.task('default', gulp.series('js', 'serve'));
gulp.task('default', gulp.series('js', 'copyfiles', 'usemin', 'serve'));