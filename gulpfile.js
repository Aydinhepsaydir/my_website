var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();

gulp.task("sass", function() {
  return gulp
    .src("app/style/scss/stylesheet.scss") // Get source files with gulp.src
    .pipe(sass()) // Sends it through a gulp plugin
    .pipe(gulp.dest("app/style/css")) // Outputs the file in the destination folder
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: "app"
    }
  });
});

gulp.task("watch", gulp.parallel("sass", "browserSync"), function() {
  //reload whenever sass file is changed and saved
  gulp.watch("app/scss/**/*.scss", ["sass"]);

  //reload whenever js or html is changed and saved
  gulp.watch("./app/*.html", borwserSync.reload);
  gulp.watch("./app/js/**/*.js", browserSync.reload);
});
