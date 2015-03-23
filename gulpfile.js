var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');


gulp.task('concat-ga', function () {
	return gulp.src(['./src/listener.*.js', './src/actions.progress.js', './src/actions.ga.js'])
		.pipe(concat('GoogleAnalytics'))
		.pipe(uglify())
		.pipe(rename('vimeo.event.tracker.ga.js'))
		.pipe(gulp.dest('./dist'));
});

gulp.task('concat-ua', function () {
	return gulp.src(['./src/listener.*.js', './src/actions.progress.js', './src/actions.ua.js'])
		.pipe(concat('UniversalAnalytics'))
		.pipe(uglify())
		.pipe(rename('vimeo.event.tracker.ua.js'))
		.pipe(gulp.dest('./dist'));
});

gulp.task('concat-gtm', function () {
	return gulp.src(['./src/listener.*.js', './src/actions.progress.js', './src/actions.gtm.js'])
		.pipe(concat('GoogleTagManager'))
		.pipe(uglify())
		.pipe(rename('vimeo.event.tracker.gtm.js'))
		.pipe(gulp.dest('./dist'));
});


gulp.task('default', ['concat-ga', 'concat-ua', 'concat-gtm']);
