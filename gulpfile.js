var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var cache = require('gulp-cached')
var notify = require('gulp-notify')
var plumber = require('gulp-plumber')

//** Post CSS Modules **//
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
//** Browser-Sync **//
var browserSync = require('browser-sync').create();

var paths = {
    sass : {
        src: 'source/assets/sass/**/*.scss',
        dest: 'product/assets/css/'
    },
    scripts: {
        src: 'source/assets/js/**/*.js',
        dest : 'product/assets/js/'
    },
    html: {
        src: 'source/**/*.html',
        dest: 'product/'
    },
    images: {
        src: 'source/assets/images/**/*',
        dest: 'product/assets/images/'
    },
    fonts: {
        src: 'source/assets/fonts/**/*',
        dest: 'product/assets/fonts/'
    },
    css: {
        src: 'source/assets/css/**/*',
        dest: 'product/assets/css/'
    },
    maps: './maps'
}

//sass
gulp.task('sass',function () {
    // load post-css plugins
    var processors = [
        mqpacker,
        autoprefixer({
            browsers: ['last 3 versions', 'ie >=6', 'Firefox >= 2', 'Chrome >= 1', 'Safari >= 3', 'Opera >= 6']
        })
    ]
    // start sass task
    return gulp.src(paths.sass.src)
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(sourcemaps.init()) // init sourcemaps
        .pipe(sass.sync({outputStyle: 'expanded'}).on('error', sass.logError)) // compile scss
        .pipe(postcss(processors)) // autoprefix and combine media queries
        .pipe(sourcemaps.write(paths.maps)) // write emaps relative to source dir
        .pipe(cache('cashe-sass'))
        .pipe(gulp.dest(paths.sass.dest)) // pipe to css folder
        .pipe(browserSync.reload({
            stream: true,
            once: true
        }))
        .pipe(notify({
            title: 'SASS task complete!',
            message: new Date()
        }))
})
//html
gulp.task('html',function () {
    gulp.src(paths.html.src)
        .pipe(gulp.dest(paths.html.dest))
        .pipe(cache('cashe-html'))
        .pipe(browserSync.reload({
            stream: true,
            once: true
        }))
})
//js
gulp.task('js',function () {
    gulp.src(paths.scripts.src)
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(cache('cashe-js'))
        .pipe(browserSync.reload({
            stream: true,
            once: true
        }))
})
//copy
gulp.task('copy',function () {
    gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest))
    gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest))
    gulp.src(paths.css.src)
        .pipe(gulp.dest(paths.css.dest))
})
//server
gulp.task('server',function () {
    browserSync.init({
        server: {
            baseDir: './product',
            ext: 'html'
        }
    })
})
//watch
gulp.task('watch', function () {
    gulp.watch(paths.sass.src, ['sass'])
    gulp.watch(paths.html.src, ['html'])
    gulp.watch(paths.scripts.src, ['js'])
    gulp.watch(paths.images.src, paths.fonts.src, paths.css.src, ['copy'])
})
//default
gulp.task('default',['copy','sass', 'html', 'js', 'server', 'watch'])

