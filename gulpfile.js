var gulp = require("gulp");
var sass = require("gulp-sass");
const browsersync = require("browser-sync").create();
const del = require("del");

// BrowserSync
function browserSync(done) {
    browsersync.init({
      server: {
        baseDir: "./dist/"
      },
      port: 3000
    });
    done();
  }

  
  // BrowserSync Reload
  function browserSyncReload(done) {
    browsersync.reload();
    done();
  }

function style() {
    return (
        gulp
            .src("src/css/scss/*.scss")
            .pipe(sass())
            .on("error", sass.logError)
            .pipe(gulp.dest("dist/css"))
            .pipe(browsersync.stream())
    );
}

function copyHTML() {
    return (
        gulp
            .src("src/html/*")
            .pipe(gulp.dest("dist"))
            .pipe(browsersync.stream())
    );
}
function copyCSS() {
  return (
      gulp
          .src("src/css/*.css")
          .pipe(gulp.dest("dist/css"))
          .pipe(browsersync.stream())
  );
}

function copyJS() {
  return (
      gulp
          .src("src/js/**/*.js")
          .pipe(gulp.dest("dist/js"))
          .pipe(browsersync.stream())
  );
}

function copyIMG() {
  return (
      gulp
          .src("src/img/**/*")
          .pipe(gulp.dest("dist/img"))
          .pipe(browsersync.stream())
  );
}

// Clean assets
function clean() {
    return del(["./dist/*"]);
}

function watchFiles() {
    gulp.watch("./src/css/scss/**/*", style);
    gulp.watch("./src/html/**/*", copyHTML);
    gulp.watch("./src/js/**/*.js", copyJS);
    //gulp.watch(
    //  [
    //    "./_includes/**/*",
    //    "./_layouts/**/*",
    //    "./_pages/**/*",
    //    "./_posts/**/*",
    //    "./_projects/**/*"
    //  ],
        gulp.series(browserSyncReload)
    //);
    //gulp.watch("./assets/img/**/*", images);
  }

const build = gulp.series(clean, gulp.parallel(style, copyHTML, copyCSS, copyJS, copyIMG));
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));
 
exports.style = style;
exports.clean = clean;
exports.default = build;
exports.watch = watch;
exports.browserSync = browserSync;