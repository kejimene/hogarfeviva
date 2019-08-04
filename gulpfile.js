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
            .src("src/scss/*.scss")
            .pipe(sass())
            .on("error", sass.logError)
            .pipe(gulp.dest("dist/css"))
    );
}

function copy() {
    return (
        gulp
            .src("src/html/*")
            .pipe(gulp.dest("dist"))
    );
}

// Clean assets
function clean() {
    return del(["./dist/*"]);
}

function watchFiles() {
    gulp.watch("./src/scss/**/*", style);
    //gulp.watch("./assets/js/**/*", gulp.series(scriptsLint, scripts));
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

const build = gulp.series(clean, gulp.parallel(style, copy));
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));
 
exports.style = style;
exports.clean = clean;
exports.default = build;
exports.watch = watch;