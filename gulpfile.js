const gulp = require('gulp');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const order = require("gulp-order");
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');


gulp.task('css', function () {
    return gulp.src('./src/less/style.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 1 versions'],
            cascade: false
        }))
        .pipe(csso({
            restructure: false,
            sourceMap: true
        }))
        .pipe(gulp.dest('./build/css'))
})

gulp.task('html', function() {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./build'))
})

gulp.task('js', function() {
    return gulp.src('./src/js/*.js')
        .pipe(order([
            "vars.js",
            "common.js"
        ], {base: './src/js'}))
        .pipe(concat('main.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('./build/js'))
})

gulp.task('img', function() {
    return gulp.src('./src/img/*.{jpg,png}')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'))
})

gulp.task('fonts', function() {
    return gulp.src('./src/fonts/**/*.*')
        .pipe(gulp.dest('./build/fonts'))
})

gulp.task('watcher', function () {
    gulp.watch('./src/less/*.less', gulp.series('css'))
    gulp.watch('./src/*.html', gulp.series('html'))
    gulp.watch('./src/js/*.js', gulp.series('js'))
})

gulp.task('build', gulp.parallel('html', 'css', 'js', 'img', 'fonts'))