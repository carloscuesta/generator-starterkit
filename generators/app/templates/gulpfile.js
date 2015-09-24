var gulp = require('gulp'),<% if (cssPrepro == 'less') { %>
    less = require('gulp-less'),<% } else { %>
    sass = require('gulp-sass'),<% } %> <% if (templateLang == 'jade') { %>
    jade = require('gulp-jade'),<% } else { %>
    minifyHTML = require('gulp-minify-html'), <% } %>
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    ftp = require('vinyl-ftp'),<% if (useBabel == true) { %>
    babel = require('gulp-babel'),<% } %>
    cssimport = require('gulp-cssimport'),
    beautify = require('gulp-beautify');

/* routes: object that contains the paths */

var routes = {
    styles: {
        scss: 'src/styles/*.scss',
        _scss: 'src/styles/_includes/*.scss',
        less: 'src/styles/*.less',
        _less: 'src/styles/_includes/*.less',
        css: 'dist/assets/css/'
    },

    templates: {
        jade: 'src/templates/*.jade',
        _jade: 'src/templates/_includes/*.jade',
        html: 'src/templates/*.html'
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
        ftpUploadDir: '<%= ftpDeployDir %>'
    }
};

/* ftpCredentials: info used to deploy @ ftp server */

var ftpCredentials = {
    host: '<%= ftpHost %>',
    user: '<%= ftpUser %>',
    password: '<%= ftpPassword %>'
};

/* Compiling Tasks */

// SCSS

gulp.task('styles', function() {<% if (cssPrepro == 'less') { %>
    return gulp.src(routes.styles.less)
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "Error: Compiling LESS.",
                message:"<%= error.message %>"
            })
        }))
        .pipe(less({}))
        .pipe(cssimport({}))
        .pipe(autoprefixer('last 3 versions'))
        .pipe(rename('style.css'))
        .pipe(gulp.dest(routes.styles.css))
        .pipe(browserSync.stream())
        .pipe(notify({
            title: 'Less Compiled and Minified succesfully!',
            message: 'less task completed.',
        }));<% } else {%>
    return gulp.src(routes.styles.scss)
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "Error: Compiling SCSS.",
                message:"<%%= error.message %>"
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
        .pipe(notify({
            title: 'SCSS Compiled and Minified succesfully!',
            message: 'scss task completed.',
        }));<% } %>
});

// Templating

gulp.task('templates', function() {<% if (templateLang == 'jade') { %>
    return gulp.src([routes.templates.jade, '!' + routes.templates._jade])
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "Error: Compiling Jade.",
                message:"<%%= error.message %>"
            })
        }))
        .pipe(jade())
        .pipe(gulp.dest(routes.files.html))
        .pipe(browserSync.stream())
        .pipe(notify({
            title: 'Jade Compiled succesfully!',
            message: 'Jade task completed.',
        }));<% } else {%>
    return gulp.src(routes.templates.html)
        .pipe(minifyHTML())
        .pipe(browserSync.stream())
        .pipe(gulp.dest(routes.files.html))
        .pipe(notify({
            title: 'HTML minified succesfully!',
            message: 'templates task completed.',
        }));<% }%>
});


/* Scripts (js) ES6 => ES5, minify and concat into a single file.*/

gulp.task('scripts', function() {
    return gulp.src(routes.scripts.js)
        .pipe(concat('script.js'))<% if (useBabel == true) { %>
        .pipe(babel())<% } %>
        .pipe(uglify())
        .pipe(gulp.dest(routes.scripts.jsmin))
        .pipe(browserSync.stream())
        .pipe(notify({
            title: 'JavaScript Minified and Concatenated!',
            message: 'your js files has been minified and concatenated.',
        }));
});

/* Image compressing task */

gulp.task('images', function() {
    gulp.src(routes.files.images)
        .pipe(imagemin())
        .pipe(gulp.dest(routes.files.imgmin))
        .pipe(notify({
            title: 'Images optimized!',
            message: 'your images has been compressed.',
        }));
});

/* Deploy, deploy dist/ files to an ftp server */

gulp.task('deploy', function() {
    var connection = ftp.create({
        host: ftpCredentials.host,
        user: ftpCredentials.user,
        password: ftpCredentials.password
    });

    return gulp.src(routes.deployDirs.baseDirFiles, {
        base: routes.deployDirs.baseDir,
        buffer: false
    })
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "Error: Deploy failed.",
                message:"<%%= error.message %>"
            })
        }))
        .pipe(connection.dest(routes.deployDirs.ftpUploadDir))
        .pipe(notify({
            title: 'Deploy succesful!',
            message: 'Your deploy has been done!.',
        }));
});

/* Preproduction beautifiying task (SCSS, JS) */

gulp.task('beautify', function() {
    gulp.src(routes.scripts.js)
        .pipe(beautify({indentSize: 4}))
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "Error: Beautify failed.",
                message:"<%%= error.message %>"
            })
        }))
        .pipe(gulp.dest(routes.scripts.base))
        .pipe(notify({
            title: 'JS Beautified!',
            message: 'beautify task completed.',
        }));
});

/* Serving (browserSync) and watching for changes in files */

gulp.task('browser-sync', function() {
    browserSync.init({
        server: './dist/'
    });
    <% if (cssPrepro=='less') { %>
    gulp.watch([routes.styles.less, routes.styles._less], ['styles']);<% } else { %>
    gulp.watch([routes.styles.scss, routes.styles._scss], ['styles']);<% } %> <% if (templateLang == 'jade') { %>
    gulp.watch([routes.templates.jade, routes.templates._jade], ['templates']);<% } else { %>
    gulp.watch(routes.templates.html, ['templates']);<% } %>
    gulp.watch(routes.scripts.js, ['scripts', 'beautify']);
});

gulp.task('build', ['templates', 'styles', 'scripts', 'images', 'browser-sync']);

gulp.task('default', function() {
    gulp.start('build');
});

