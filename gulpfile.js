"use strict";

/**
 * Gulp usage file for the whole project.
 */

var gulp = require("gulp");
var rename = require("gulp-rename");
var ts = require("gulp-typescript");
var eventStream = require("event-stream");
var jade = require("gulp-jade");
var path = require("path");
var tslint = require("gulp-tslint");
var install = require("gulp-install");
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");
var sequence = require("run-sequence");
var browserify = require("browserify");
var tsify = require("tsify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var copy = require("gulp-copy");
var babel = require("gulp-babel");
var rimraf = require("gulp-rimraf");
var ignore = require("gulp-ignore");


// Declaring some constants for use during the gulp build process. Mainly the locations of certain files and naming
// conventions for more easier access later in the process.
var fromDefinitelyTypedClient = [
    // Real location for the definitions
    "bower/yhbt-definitions/typedefinitions/client.d.ts",
    // Sub-repo location
    "../yhbt-definitions/typedefinitions/client.d.ts"
];

var typeDefinitionsClient = fromDefinitelyTypedClient
    .concat([ "typescript/**/*.ts" ]);

var jadeLocation = [
    "jade/**/*.jade"
];

var tmpLocation = "./tmp/";
var releaseLocation = "./release/";

var taskTslintClient = "tslint-client";
gulp.task(taskTslintClient, function() {
    return gulp.src(typeDefinitionsClient).pipe(tslint()).pipe(tslint.report("verbose"));
});

var taskJade = "jade";
gulp.task(taskJade, function() {
    return gulp.src(jadeLocation).pipe(jade()).pipe(gulp.dest(tmpLocation));
});

var taskTscClient = "ts-client";
gulp.task(taskTscClient, function() {
    var tsc = gulp
        .src(typeDefinitionsClient)
        .pipe(ts({
            typescript: require("typescript"),
            declarationFiles: true,
            noImplicitAny: true,
            noExternalResolve: false,
            removeComments: true,
            module: "commonjs",
            showErrors: true
        }));

    return eventStream.merge(
        tsc.js.pipe(gulp.dest(tmpLocation))
    );
});

var taskCopyToReleaseLocation = "copy";
gulp.task(taskCopyToReleaseLocation, function() {
    return gulp.src([
            tmpLocation + "**/*.*",
            tmpLocation + "!**/*.jade",
            tmpLocation + "!**/*.js"
        ])
        .pipe(copy(releaseLocation, { prefix: 1 }));
});

var babelToReleaseLocation = "babel";
gulp.task(babelToReleaseLocation, function() {
    return gulp.src(path.join(tmpLocation) + "**/*.js")
        .pipe(babel({
            comments: false,
        }))
        .pipe(gulp.dest(path.join(releaseLocation)));
});

/**
 * Run with: gulp default.
 * Executes the default task, essentially going through all possible steps.
 */
gulp.task("default", function() {
    sequence(
        [
            taskTslintClient,
            taskJade
        ],
        [
            taskTscClient,
        ],
        [
            babelToReleaseLocation,
            taskCopyToReleaseLocation
        ]
    );
});
