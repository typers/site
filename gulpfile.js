var gulp        = require ('gulp')
    , sass      = require ('gulp-sass')
    , concatCss = require ('gulp-concat-css');

gulp.task('sass', function () {
  return gulp.src('assets/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('assets/css/'));
});

gulp.task('concat-css', function () {
  var assets = [
    'assets/vendor/bootstrap/dist/css/bootstrap.css',
    'assets/vendor/animate.css/animate.css',
    'assets/fonts/Montserrat.css',
    'assets/fonts/Lato:300.css',
    'assets/fonts/Lato.css',
    'assets/css/*.css'
  ];

  return gulp.src(assets)
    .pipe(concatCss('package.css'))
    .pipe(gulp.dest('static/css/'));
});

gulp.task('watch', function () {
  gulp.watch('assets/scss/*.scss', ['sass']);
  gulp.watch('assets/css/*.css', ['concat-css']);
});

gulp.task('default', ['sass', 'concat-css', 'watch']);
