'use strict';

const gulp = require('gulp');
const ava = require('gulp-ava');

gulp.task('test', () => {
	return gulp.src([
		'test/unit/**/*.unit.js'
	]).pipe(ava({verbose: true}));
});
