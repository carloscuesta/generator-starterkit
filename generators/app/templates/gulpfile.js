var gulp = require('gulp'),<% if (cssPrepro == 'less') { %>
    less = require('gulp-less'),<% } else { %>
    sass = require('gulp-sass'),<% } %> <% if (templateLang == 'jade') { %>
    jade = require('gulp-jade'),<% } else { %>
    minifyHTML = require('gulp-minify-html'), <% } if (jsLinter == 'jscs') {%>
    jscs = require('gulp-jscs'),<% } if (jsLinter == 'jshint') {%>
    jshint = require('gulp-jshint'),<% } %>
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    minifyCss = require('gulp-minify-css'),
    uncss = require('gulp-uncss'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    ftp = require('vinyl-ftp'),<% if (useBabel == true) { %>
    babel = require('gulp-babel'),<% } %>
    cssimport = require('gulp-cssimport'),
    beautify = require('gulp-beautify'),
    sourcemaps = require('gulp-sourcemaps'),
    critical = require('critical').stream;

//* baseDirs: baseDirs for the project */

var baseDirs = {
    dist:'dist/',
    src:'src/',
    assets: 'dist/assets/'
};

/* routes: object that contains the paths */

var routes = {
    styles: {<% if (cssPrepro == 'less') { %>
 		less: baseDirs.src+'styles/*.less',
        _less: baseDirs.src+'styles/_includes/*.less',<% } else { %>
        scss: baseDirs.src+'styles/*.scss',
        _scss: baseDirs.src+'styles/_includes/*.scss',<% } %>
        css: baseDirs.assets+'css/'
    },

    templates: {<% if (templateLang == 'jade') { %>
    	jade: baseDirs.src+'templates/*.jade',
        _jade: baseDirs.src+'templates/_includes/*.jade',<% } else { %>
        html: baseDirs.src+'templates/*.html'<% } %>
    },

    scripts: {
        base:baseDirs.src+'scripts/',
        js: baseDirs.src+'scripts/*.js',
        jsmin: baseDirs.assets+'js/'
    },

    files: {
        html: 'dist/',
        images: baseDirs.src+'images/*',
        imgmin: baseDirs.assets+'files/img/',
        cssFiles: baseDirs.assets+'css/*.css',
        htmlFiles: baseDirs.dist+'*.html',
        styleCss: baseDirs.assets+'css/style.css'
    },

    deployDirs: {
        baseDir: baseDirs.dist,
        baseDirFiles: baseDirs.dist+'**',
        ftpUploadDir: 'FTP-DIRECTORY'
    }
};
/* ftpCredentials: info used to deploy @ ftp server */

var ftpCredentials = {
    host: '<%= ftpHost %>',
    user: '<%= ftpUser %>',
    password: '<%= ftpPassword %>'
};

/* Compiling Tasks */

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
            message: 'Jade task completed.'
        }));<% } else {%>
    return gulp.src(routes.templates.html)
        .pipe(minifyHTML({
            empty:true,
            quotes:true,
            cdata:true,
            conditionals:true
        }))
        .pipe(browserSync.stream())
        .pipe(gulp.dest(routes.files.html))
        .pipe(notify({
            title: 'HTML minified succesfully!',
            message: 'templates task completed.'
        }));<% }%>
});

// SCSS

gulp.task('styles', function() {<% if (cssPrepro == 'less') { %>
    return gulp.src(routes.styles.less)
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "Error: Compiling LESS.",
                message:"<%%= error.message %>"
            })
        }))
        .pipe(sourcemaps.init())
            .pipe(less({}))
            .pipe(autoprefixer('last 3 versions'))
            .pipe(minifyCss())
        .pipe(sourcemaps.write())
        .pipe(cssimport({}))
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
        .pipe(sourcemaps.init())
            .pipe(sass({
                outputStyle: 'compressed'
            }))
            .pipe(autoprefixer('last 3 versions'))
        .pipe(sourcemaps.write())
        .pipe(cssimport({}))
        .pipe(rename('style.css'))
        .pipe(gulp.dest(routes.styles.css))
        .pipe(browserSync.stream())
        .pipe(notify({
            title: 'SCSS Compiled and Minified succesfully!',
            message: 'scss task completed.'
        }));<% } %>
});

/* Scripts (js) ES6 => ES5, minify and concat into a single file.*/

gulp.task('scripts', function() {
    return gulp.src(routes.scripts.js)
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "Error: Babel and Concat failed.",
                message:"<%%= error.message %>"
            })
        }))
        .pipe(sourcemaps.init())
            .pipe(concat('script.js'))<% if (useBabel == true) { %>
            .pipe(babel())<% } %>
            .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(routes.scripts.jsmin))
        .pipe(browserSync.stream())
        .pipe(notify({
            title: 'JavaScript Minified and Concatenated!',
            message: 'your js files has been minified and concatenated.'
        }));
});
<% if (useJSLint == true) { %>
/* Lint, lint the JavaScript files */

gulp.task('lint', function() {<% if (jsLinter == 'jshint') { %>
	return gulp.src(routes.scripts.js)
		.pipe(jshint({
			lookup: true,
			linter: 'jshint',
		}))
		.pipe(jshint.reporter('default')); <% } if (jsLinter == 'jscs') { %>
	return gulp.src(routes.scripts.js)
		.pipe(jscs())
		.pipe(jscs.reporter());<% } %>
});
<% } %>
/* Image compressing task */

gulp.task('images', function() {
    gulp.src(routes.files.images)
        .pipe(imagemin())
        .pipe(gulp.dest(routes.files.imgmin));
});

/* Deploy, deploy dist/ files to an ftp server */

gulp.task('ftp', function() {
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
            message: 'Your deploy has been done!.'
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
            message: 'beautify task completed.'
        }));
});

/* Serving (browserSync) and watching for changes in files */

gulp.task('serve', function() {
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

/* Optimize your project */

gulp.task('uncss', function() {
    return gulp.src(routes.files.cssFiles)
        .pipe(uncss({
            html:[routes.files.htmlFiles],
            ignore:['*:*']
        }))
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "Error: UnCSS failed.",
                message:"<%%= error.message %>"
            })
        }))
        .pipe(minifyCss())
        .pipe(gulp.dest(routes.styles.css))
        .pipe(notify({
            title: 'Project Optimized!',
            message: 'UnCSS completed!'
        }));
});

/* Extract CSS critical-path */

gulp.task('critical', function () {
    return gulp.src(routes.files.htmlFiles)
        .pipe(critical({
            base: baseDirs.dist,
            inline: true,
            html: routes.files.htmlFiles,
            css: routes.files.styleCss,
            ignore: ['@font-face',/url\(/],
            width: 1300,
            height: 900
        }))
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "Error: Critical failed.",
                message:"<%%= error.message %>"
            })
        }))
        .pipe(gulp.dest(baseDirs.dist))
        .pipe(notify({
            title: 'Critical Path completed!',
            message: 'css critical path done!'
        }));
});

gulp.task('dev', ['templates', 'styles', 'scripts', <% if (jsLinter=='jscs'){ %>'lint',<%}%> 'images', 'serve']);

gulp.task('build', ['templates', 'styles', 'scripts', 'images']);

gulp.task('optimize', ['uncss', 'critical', 'images']);

gulp.task('deploy', ['optimize', 'ftp']);

gulp.task('default', function() {
    gulp.start('dev');
});

