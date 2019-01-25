var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();

// Create setup files
var buildSass = function(done) {
  // Compile the setup files
  gulp
    .src("app/style/scss/**/*.scss")
    .pipe(sass()) // Sends it through a gulp plugin
    .pipe(gulp.dest("app/style/css"));
  // Signal completion
  done();
};

var startServer = function(done) {
  // Initialize BrowserSync
  browserSync.init({
    server: {
      baseDir: "./app/"
    }
  });
  // Signal completion
  done();
};

// Reload the browser when files change
var reloadBrowser = function(done) {
  browserSync.reload();
  done();
};

// Watch for changes
var watchSource = function(done) {
  gulp.watch("app/style/scss", gulp.series(exports.default, reloadBrowser));
  gulp.watch("app/*.html", gulp.series(exports.default, reloadBrowser));
  done();
};

// Default task
// gulp
exports.default = gulp.series(buildSass);

// Watch and reload
// gulp watch
exports.watch = gulp.series(exports.default, startServer, watchSource);
