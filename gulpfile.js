const { watch, series, dest, src } = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass")(require("sass"));
const cleanCss = require("gulp-clean-css");
const purgecss = require("gulp-purgecss");
const concat = require("gulp-concat");
const minify = require("gulp-minify");

function copyHtml() {
  return src(["./src/*.html"]).pipe(dest("./dist"));
}

function compileSass() {
  return src("./src/scss/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("./src/css/"));
}

function devPackCSS() {
  return src("./src/css/*.css")
    .pipe(concat("style.css"))
    .pipe(dest("./dist/assets/css/"));
}

function packCSS() {
  return src("./src/css/*.css")
    .pipe(concat("style.css"))
    .pipe(cleanCss())
    .pipe(
      purgecss({
        content: ["./dist/**/*.html", "./dist/**/*.js"],
      })
    )
    .pipe(dest("./dist/assets/css/"));
}

function packJs() {
  return src(["./src/js/*.js"])
    .pipe(concat("style.js"))
    .pipe(minify({ ext: { min: ".min.js" }, noSource: true }))
    .pipe(dest("./dist/assets/js"));
}

function packJsMain() {
    //.pipe(concat('index.js'))
    return src(["./src/js_main/*.js"])
    .pipe(minify({ ext: { min: ".min.js" }, noSource: true }))
    .pipe(dest("./dist/assets/js"));
}

// Serve from browserSync server
function browsersyncServe(cb) {
  browserSync.init({
    watch: true,
    server: "./dist",
  });
  cb();
}

function browsersyncReload(cb) {
  browserSync.reload();
  cb();
}

// Watch Files & Reload browser after tasks
function watchTask() {
  watch("./src/scss/*.scss", compileSass);
  watch("./src/css/*.css", devPackCSS);
  watch("./src/js_main/*.js", packJsMain);
  watch(["./dist/assets/css/*.css", "./dist/assets/js/*.js", "./dist/*.*"],browsersyncReload);
}

// Default Gulp Task
exports.default = series(browsersyncServe, watchTask);
exports.toProduction = series(packCSS);
exports.init = series(copyHtml, compileSass, devPackCSS, packJs, packJsMain);
