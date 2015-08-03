/*global require, console*/
var gulp = require("gulp"),
    webserver = require("gulp-webserver"),
    jsHint = require("gulp-jshint"),
    jsLint = require("gulp-jslint"),
    gjsLint = require("gulp-gjslint"),
    jsmin = require("gulp-jsmin"),
    uglify = require("gulp-uglify"),
    minifyHTML = require("gulp-minify-html"),
    concat = require("gulp-concat"),
    deleteLines = require("gulp-delete-lines"),
    rename = require("gulp-rename");

// Servidor web de desarrollo
gulp.task("dev-server", function () {
    "use strict";

    gulp.src("./app")
        .pipe(webserver({
            open: true,
            livereload: true
        }));
});

// Servidor web de producción
gulp.task("prod-server", function () {
    "use strict";

    gulp.src("./dist")
        .pipe(webserver({
            open: true,
            livereload: true
        }));
});

// Servidor web para probar versión de Apache Cordova
gulp.task("cordova-server", function () {
    "use strict";

    gulp.src("./www")
        .pipe(webserver({
            open: true,
            livereload: true
        }));
});

// Busca errores de JavaScript de acuerdo con JsLint
gulp.task("jsLint", function () {
    "use strict";

    return gulp.src(["./app/js/**/*.js"])
        .pipe(jsLint())
        .on("error", function (error) {
            console.error(String(error));
        });
});

// Busca errores de JavaScript de acuerdo con JsHint
gulp.task("jsHint", function () {
    "use strict";

    return gulp.src(["./app/js/**/*.js"])
        .pipe(jsHint(".jshintrc"))
        .pipe(jsHint.reporter("default"));
});

// Busca errores de JavaScript de acuerdo con Google JsLinter
gulp.task("jsGoogleLint", function () {
    "use strict";

    return gulp.src(["./app/js/**/*.js"])
        .pipe(gjsLint())
        .pipe(gjsLint.reporter("console"), {
            fail: true
        });
});

// Comprime nuestro código con la herramienta JsMin
gulp.task("compressJsMin", function () {
    "use strict";

    gulp.src(["./app/js/mainController.js", "./app/js/controller/*.js"])
        .pipe(jsmin())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("dist/js/"));

    gulp.src("./app/js/service/*.js")
        .pipe(jsmin())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("dist/js/"));
});

// Comprime nuestro código con la herramienta Uglify
gulp.task("compressUglify", function () {
    "use strict";

    gulp.src(["./app/js/mainController.js", "./app/js/controller/*.js"])
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("dist/js/"));

    gulp.src("./app/js/service/*.js")
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("dist/js/"));
});

// Comprime nuestro código con la herramientas JsMin y Uglify
gulp.task("superCompress", function () {
    "use strict";

    gulp.src(["./app/js/mainController.js", "./app/js/controller/*.js"])
        .pipe(jsmin())
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("dist/js/"));

    gulp.src("./app/js/service/*.js")
        .pipe(jsmin())
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("dist/js/"));
});

// Comprime el código HTML con la herramienta minify HTML
gulp.task("compressHTML", function () {
    "use strict";

    gulp.src("./app/index.html")
        .pipe(minifyHTML())
        .pipe(gulp.dest("dist/"));
});

// Genera una versión de producción en dist/
gulp.task("publish", function () {
    "use strict";

    // Copiado de librerías
    gulp.src("./app/lib/**/*")
        .pipe(gulp.dest("./dist/lib/"));

    // Minimizado y fusión de archivos JavaScript
    gulp.src(["./app/js/mainController.js", "./app/js/**/*.js"])
        .pipe(concat("main.min.js"))
        .pipe(jsmin())
        .pipe(uglify())
        .pipe(rename("main.min.js"))
        .pipe(gulp.dest("dist/js/"));

    // Minimizado y procesado de las plantillas HTML
    gulp.src("./app/view/**/*.html")
        .pipe(minifyHTML())
        .pipe(gulp.dest("dist/view/"));

    // Minimizado y procesado de archivo index.html
    gulp.src("./app/index.html")
        .pipe(deleteLines({
            "filters": ["<!-- BEGIN PROD FILES"]
        }))
        .pipe(deleteLines({
            "filters": ["END PROD FILES -->"]
        }))
        .pipe(deleteLines({
            "filters": [new RegExp(".*DEVFILE.*")]
        }))
        .pipe(minifyHTML())
        .pipe(gulp.dest("dist/"));
});

// Copia el contenido de app/ en www/ para probar la aplicación con Apache Cordova
gulp.task("cordovaDev", function () {
    "use strict";

    gulp.src("./app/**/*")
        .pipe(gulp.dest("./www/"));

    gulp.src("./app/res/**/*")
        .pipe(gulp.dest("./www/res/"));
});

// Añade las partes adicionales necesarias para la aplicación de Apache Cordova
gulp.task("cordovaDist", function () {
    "use strict";

    gulp.src("./dist/**/*")
        .pipe(gulp.dest("./www/"));

    gulp.src("./app/res/**/*")
        .pipe(gulp.dest("./www/res/"));
});

// Genera una versión de producción de la aplicación verificando el código antes
gulp.task("compile", ["jsHint", "publish"]);

// Genera una versión de producción para distribuir la aplicación con Apache Cordova
gulp.task("compileCordova", ["compile", "cordovaDist"]);

gulp.task("default", ["dev-server"]);
