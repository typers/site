var gulp        = require ('gulp')
    , sass      = require ('gulp-sass')
    , concatCss = require ('gulp-concat-css')
    , webserver = require ('gulp-webserver')
    , webpack   = require ('gulp-webpack')
    , wp        = require ('webpack')
    , path      = require ('path');

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
    'assets/css/*.css'
  ];

  return gulp.src(assets)
    .pipe(concatCss('package.css'))
    .pipe(gulp.dest('static/css/'));
});

gulp.task('webpack', function () {
  return gulp.src('assets/js/main.js')
    .pipe(webpack({
      output: {
        filename: 'package.js',
        publicPath: 'http://localhost:8000/assets'
      },
      resolve: {
        root: [path.join(__dirname, 'node_modules')]
      },
      plugins: [
        new wp.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery'
        })
      ]
    }))
    .pipe(gulp.dest('static/js/'));
});

gulp.task('webserver', function () {
  return gulp.src('.')
    .pipe(webserver({
      livereload: true,
      directoryListening: true,
      open: true,
      port: 8000
    }));
});

gulp.task('watch', function () {
  gulp.watch('assets/scss/*.scss', ['sass']);
  gulp.watch('assets/css/*.css', ['concat-css']);
  gulp.watch(['assets/js/*.js', 'assets/js/*.jsx'], ['webpack']);
});

gulp.task('default', ['sass', 'concat-css', 'webpack', 'watch']);
