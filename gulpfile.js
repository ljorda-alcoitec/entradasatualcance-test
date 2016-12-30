var browserSync = require('browser-sync');
var cache = require('gulp-cache');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var cleanCSS = require('gulp-clean-css');
var ngannotate = require('gulp-ng-annotate');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var rev = require('gulp-rev');
var runSequence = require('run-sequence');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var foreach = require('gulp-foreach');
var path = require('path');



gulp.task('clean', function() {
	return del(['dist']);
});

gulp.task('jshint', function() {
	return gulp.src(['app/js/**/*.js'])
	    .pipe(jshint())
	    .pipe(jshint.reporter(stylish));
});

gulp.task('usemin', ['jshint'], function() {

	return gulp.src('app/**/*.html')
        .pipe(foreach(function(stream, file){

            var name = path.basename(file.path);
       	
            return stream
                .pipe(usemin({
                    css: [ cleanCSS(), rev() ],
                    js: [ ngannotate(), uglify(), rev() ]
                }));
        }))
        .pipe(gulp.dest('dist/'));
});


gulp.task('imagemin', function() {
	return del(['dist/img']), gulp.src('app/img/**/*')
	    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
	    .pipe(gulp.dest('dist/img'));
});

gulp.task('copyfonts', function() {
	gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
	    .pipe(gulp.dest('./dist/fonts'));
	
	return gulp.src('./bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')
	    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('default', function(callback) {
    runSequence('clean', 'usemin', 'imagemin', 'copyfonts', callback);
});

gulp.task('browser-sync', ['default'], function () {
	var files = [
	    'app/**/*.html',
	    'app/css/**/*.css',
	    'app/img/**/*.png',
	    'app/js/**/*.js',
	    'dist/**/*'
	];

	browserSync.init(files, {
		server: {
			baseDir: "dist",
			index: "index.html"
		},
		reloadDelay: 1000
	});
        // Watch any files in dist/, reload on change
  return gulp.watch(['dist/**']).on('change', browserSync.reload);
});

gulp.task('watch', ['browser-sync'], function() {
    gulp.watch('{app/js/**/*.js, app/css/**/*.css, app/**/*.html}', ['default']);
    gulp.watch('app/img/**/*', ['default']);
});

