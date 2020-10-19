const gulp = require("gulp");
const zip = require("gulp-zip");

function bundle() {
	return gulp.src([
		"**/*",
		"!node_modules/**",
		"!src/**",
		"!bundled/**",
		"!gulpfile.js",
		"!package.json",
		"!package-lock.json",
		"!.gitignore",
	])
		.pipe(zip('todo-list.zip'))
		.pipe(gulp.dest('bundled'));
}

exports.bundle = bundle;
