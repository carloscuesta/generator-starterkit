var gulp = require('gulp'),
<% if (cssPrepro == 'less') { %>    less = require('gulp-less'),<% } else { %>    sass = require('gulp-sass'),<% } %>
    jade = require('gulp-jade'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    ftp = require('vinyl-ftp'),
    babel = require('gulp-babel'),
    cssimport = require('gulp-cssimport'),
    beautify = require('gulp-beautify');

/* routes: object that contains the paths */

var routes = {
    styles: {
        scss: 'src/styles/*.scss',
        _scss: 'src/styles/_includes/*.scss',
        css: 'dist/assets/css/'
    },

    templates: {
        jade: 'src/templates/*.jade',
        _jade: 'src/templates/_includes/*.jade'
    },

    scripts: {
        base:'src/scripts/',
        js: 'src/scripts/*.js',
        jsmin: 'dist/assets/js/'
    },

    files: {
        html: 'dist/',
        images: 'src/images/*',
        imgmin: 'dist/assets/files/img/'
    },

    deployDirs: {
        baseDir: 'dist/',
        baseDirFiles: 'dist/**',
        ftpUploadDir: 'FTP-DIRECTORY'
    }
};

/* ftpCredentials: info used to deploy @ ftp server */

var ftpCredentials = {
    host: 'HOST',
    user: 'USER',
    password: 'PASSWORD'
};

/* Compiling Tasks */

// SCSS

gulp.task('styles', function() {
    <% if (cssPrepro == 'sass') { %>
    return gulp.src(routes.styles.scss)
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "Error: Compiling SCSS.",
                message:"<%= errorMessage %>"
            })
        }))
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(cssimport({}))
        .pipe(autoprefixer('last 3 versions'))
        .pipe(rename('style.css'))
        .pipe(gulp.dest(routes.styles.css))
        .pipe(browserSync.stream())
        <% } else { }%>
        .pipe(notify({
            title: 'SCSS Compiled and Minified succesfully!',
            message: 'scss task completed.',
        }));
});
