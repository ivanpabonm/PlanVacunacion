const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

style = () =>{
    return gulp.src([
        'node_modules/bootstrap/scss/bootstrap.scss', './src/scss/style.scss'
        ])
    .pipe(sass())     
    .pipe(gulp.dest('./src/css'))     
    .pipe(browserSync.stream());
};

js = () => {
    return gulp.src([
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/popper.js/dist/popper.min.js',
        'node_modules/jquery/dist/jquery.min.js'
        ])
    .pipe(gulp.dest('./src/js'))
    .pipe(browserSync.stream());
};

fonts = () => {
    return gulp
      .src([
        "./node_modules/@fortawesome/fontawesome-free/*/",
        "!./node_modules/@fortawesome/fontawesome-free/{less,less/}",       "!./node_modules/@fortawesome/fontawesome-free/{scss,scss/}",
        "!./node_modules/@fortawesome/fontawesome-free/.",       "!./node_modules/@fortawesome/fontawesome-free/.{txt,json,md}"
      ])
      .pipe(gulp.dest("./src/fonts/font-awesome"));
  };

  watch = () =>{
    browserSync.init({
        server: {
            baseDir: './src'
        }
    });
    gulp.watch('./src/scss/style.scss', style);
    gulp.watch('./src/*html').on('change', browserSync.reload);
};

gulp.task('build', 
     gulp.parallel(style, js, fonts))
 gulp.task('default',
     gulp.series('build', watch))

