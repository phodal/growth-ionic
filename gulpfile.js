var gulp = require('gulp'),
  del = require('del'),
  path = require('path'),
  svgSprite = require('gulp-svg-sprite');


gulp.task('svg-font', function () {
  // Basic configuration example
  config = {
    mode: {
      css: {     // Activate the «css» mode
        bust: false,
        render: {
          css: true  // Activate CSS output (with default options)
        }
      },
      symbol: true      // Activate the «symbol» mode
    }
  };

  return gulp.src('growth-ui/*.svg', {cwd: './'})
    .pipe(svgSprite(config))
    .pipe(gulp.dest('src/assets/svg-font/'));
});
