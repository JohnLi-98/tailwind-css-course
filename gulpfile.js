// Dependency imports
const gulp = require("gulp");
const uglify = require("gulp-uglify");
const livereload = require("gulp-livereload");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const plumber = require("gulp-plumber");
const sourcemaps = require("gulp-sourcemaps");
// const sass = require("gulp-sass");
const minifyCss = require("gulp-minify-css");

const DIST_PATH = "public/dist";
// const STYLES_PATH = "public/scss/**/*.scss";
const STYLES_PATH = "public/css/**/*.css";
const SCRIPTS_PATH = "public/scripts/**/*.js";

gulp.task("styles", function () {
  console.log("starting css style task");

  return gulp
    .src("public/css/styles.css")
    .pipe(
      plumber(function (err) {
        console.log("Styles task Error");
        console.log(err);
        this.emit("end");
      })
    )
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(concat("styles.css"))
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload());
});

// gulp.task("styles", function () {
//   console.log("starting sass style task");

//   return gulp
//     .src("public/scss/styles.scss")
//     .pipe(
//       plumber(function (err) {
//         console.log("Styles task Error");
//         console.log(err);
//         this.emit("end");
//       })
//     )
//     .pipe(sourcemaps.init())
//     .pipe(autoprefixer())
//     .pipe(
//       sass({
//         outputStyle: "compressed",
//       })
//     )
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest(DIST_PATH))
//     .pipe(livereload());
// });

gulp.task("scripts", function () {
  console.log("starting scripts task");

  return gulp
    .src(SCRIPTS_PATH)
    .pipe(
      plumber(function (err) {
        console.log("Scripts task error");
        console.log(err);
        this.emit("end");
      })
    )
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat("scripts.js"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload());
});

gulp.task("default", gulp.series("styles", "scripts"), function () {
  console.log("starting default tasks");
});

gulp.task("watch", function () {
  require("./server");
  livereload.listen();
  gulp.watch(STYLES_PATH, gulp.series("styles"));
  gulp.watch(SCRIPTS_PATH, gulp.series("styles"));
});
