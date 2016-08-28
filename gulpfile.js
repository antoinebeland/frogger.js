"use strict";

var constants = {
  BUILD_DIRECTORY: "build",
  HEADER_LICENSE: '/*! Frogger.js | (c) Antoine Béland | MIT license */\n',
  RELEASE_DIRECTORY: "release",
  SOURCES_DIRECTORY: "src",
  SERVER_PORT: 8080
};

var gulp = require('gulp');
var connect = require('gulp-connect');
var header = require('gulp-header');
var open = require('open');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var rename = require("gulp-rename");
var sourceMaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');


/**
 * Build Task
 * ----------
 * Compiles the files of the 'src' directory to generate a minified file
 * in the 'build' folder with a map file.
 */
gulp.task('build', function () {

  try {
    var tsResult = tsProject.src()
      .pipe(sourceMaps.init())
      .pipe(ts(tsProject));

    return tsResult.js
      .pipe(uglify())
      .pipe(rename({ suffix: '.min' }))
      .pipe(sourceMaps.write(".", { includeContent: false, sourceRoot: "../" + constants.SOURCES_DIRECTORY }))
      .pipe(gulp.dest(constants.BUILD_DIRECTORY));

  } catch(e) {
    console.log(e);
  }
});

/**
 * Release Task
 * ------------
 * Compiles the files of the 'src' directory to generate a minified file
 * in the 'build' folder without a map file.
 */
gulp.task('release', function () {

  try {
    var tsResult = tsProject.src()
      .pipe(ts(tsProject));

    return tsResult.js
      .pipe(uglify())
      .pipe(header(constants.HEADER_LICENSE))
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest(constants.RELEASE_DIRECTORY));

  } catch(e) {
    console.log(e);
  }
});

/**
 * Run Task
 * --------
 * Starts a web server and open the default web browser to the index file.
 */
gulp.task('run', function () {
  connect.server({
    port: constants.SERVER_PORT,
    livereload: true
  });
  open("http://localhost:" + constants.SERVER_PORT + "/" + constants.BUILD_DIRECTORY);
});

/**
 * Default Task
 * ------------
 * Creates a watcher to automatically call the 'build' task when a project file is changed.
 * Starts the 'run' task.
 */
gulp.task('default', ['run'], function () {
  var watcher = gulp.watch(constants.SOURCES_DIRECTORY + '/**/*.ts', ['build']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});
