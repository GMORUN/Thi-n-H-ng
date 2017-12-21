'use strict'

import gulp from 'gulp';
import del from 'del';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
import runSequence from 'run-sequence';
import babelify from 'babelify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer'

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

// Optimize images
gulp.task('images', () =>
gulp.src('src/assets/images/**/*')
  .pipe($.cache($.imagemin({
    progressive: true,
    interlaced: true
  })))
  .pipe(gulp.dest('dist/assets/images'))
  .pipe($.size({title: 'images'}))
);

// Copy all files at the root level (app)
gulp.task('copy', () =>
gulp.src([
  'src/*',
  '!src/*.html',
  'node_modules/apache-server-configs/dist/.htaccess'
], {
  dot: true
}).pipe(gulp.dest('dist'))
  .pipe($.size({title: 'copy'}))
)

// Compile and automatically prefix stylesheets
gulp.task('styles', () => {
  const AUTOPREFIXER_BROWSERS = [
    'ie >= 9',
    'ie_mob >= 9',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.0',
    'bb >= 10'
  ];

// For best performance, don't add Sass partials to `gulp.src`
return gulp.src([
  'src/assets/scss/**/*.scss',
  'src/assets/styles/**/*.css'
])
  .pipe($.newer('.tmp/styles'))
  .pipe($.sourcemaps.init())
  .pipe($.sass({
    precision: 10
  }).on('error', $.sass.logError))
  .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
  .pipe(gulp.dest('.tmp/styles'))
  .pipe(browserSync.reload({stream:true}))
  // Concatenate and minify styles
  .pipe($.if('*.css', $.cssnano()))
  .pipe($.size({title: 'styles'}))
  .pipe($.sourcemaps.write('./'))
  .pipe(gulp.dest('dist/assets/styles'))
  .pipe(gulp.dest('src/assets/styles'))
  .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('babelfy', () => {
  return   gulp.src([
    './src/assets/scripts/main.js',
    // Other scripts
    './src/assets/scripts/jquery-1.11.3.min.js',
    './src/assets/scripts/topMenu.js'
  ])
    .pipe($.sourcemaps.init())
    .pipe($.babel({
      presets: ['es2015']
    }))
    .pipe($.concat('main.js'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp/scripts'))
});

gulp.task('order-scripts', () =>
  gulp.src([
    // Other scripts
    './src/assets/scripts/jquery-1.11.3.min.js',
    './src/assets/scripts/topMenu.js'
  ])
    // Output files
    .pipe($.size({title: 'scripts'}))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/assets/scripts'))
    .pipe(gulp.dest('.tmp/assets/scripts'))
);

gulp.task('browserify:dist', () => {
  return browserify({
    entries: 'src/assets/scripts/main.js',
    debug: true
  })
    .transform(babelify.configure({
      presets : ["es2015"]
    }))
    .bundle()
    .pipe(source('main.min.js'))
    .pipe(buffer())
    .pipe($.uglify())
    .pipe(gulp.dest('./dist/assets/scripts'));
});

gulp.task('browserify', () => {
  return browserify({
    entries: 'src/assets/scripts/main.js',
    debug: true
  })
    .transform(babelify.configure({
      presets : ["es2015"]
    }))
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe($.uglify())
    .pipe(gulp.dest('.tmp/assets/scripts'))
});

// Scan your HTML for assets & optimize them
gulp.task('html', () => {
  return gulp.src('src/**/*.html')
    .pipe($.useref({
      searchPath: '{.tmp,app}',
      noAssets: true
    }))

    // Minify any HTML
    // .pipe($.if('*.html', $.htmlmin({
    //   removeComments: true,
    //   collapseWhitespace: true,
    //   collapseBooleanAttributes: true,
    //   removeAttributeQuotes: true,
    //   removeRedundantAttributes: true,
    //   removeEmptyAttributes: true,
    //   removeScriptTypeAttributes: true,
    //   removeStyleLinkTypeAttributes: true,
    //   removeOptionalTags: true
    // })))
    // Output files
    .pipe($.if('*.html', $.size({title: 'html', showFiles: true})))
    .pipe(gulp.dest('dist'));
});

// Clean output directory
gulp.task('clean', () => del(['.tmp', 'dist/*', '!dist/.git'], {dot: true}));

// Watch files for changes & reload
gulp.task('serve', ['order-scripts', 'browserify', 'styles'], () => {
  browserSync({
                notify: false,
                // Customize the Browsersync console logging prefix
                logPrefix: 'WSK',
                // Allow scroll syncing across breakpoints
                scrollElementMapping: ['main', '.mdl-layout'],
                server: ['.tmp', 'src']
              });

gulp.watch(['src/**/*.html'], reload);
gulp.watch(['src/assets/**/**/*.{scss,css}'], ['styles']);
gulp.watch(['src/assets/scripts/**/*.js'], ['babelfy', 'browserify', reload]);
gulp.watch(['src/assets/images/**/*'], reload);
});

// Watch files for changes & reload
gulp.task('serve:css', ['styles'], () => {
  browserSync({
                notify: false,
                // Customize the Browsersync console logging prefix
                logPrefix: 'WSK',
                // Allow scroll syncing across breakpoints
                scrollElementMapping: ['main', '.mdl-layout'],
                server: ['.tmp', 'src']
              });

gulp.watch(['src/assets/**/*.html'], reload);
gulp.watch(['src/assets/**/**/*.{scss,css}'], ['styles']);
gulp.watch(['src/assets/images/**/*'], reload);
});


// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], () =>
browserSync({
  notify: false,
  logPrefix: 'WSK',
  // Allow scroll syncing across breakpoints
  scrollElementMapping: ['main', '.mdl-layout'],
  server: 'dist'
})
);

// Build production files, the default task
gulp.task('default', ['clean'], cb =>
runSequence(
  'styles',
  ['html', 'babelfy', 'browserify:dist', 'order-scripts', 'images', 'copy'],
  cb
)
);
