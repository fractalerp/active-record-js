"use strict";
const merge = require("webpack-merge");
const webpackBackendConfig = require("./webpack.config");


// BackendEnd

const webpackBackendConfigTest = merge.merge(webpackBackendConfig, {
    devtool: false,
    mode: "development",
    optimization: {
        minimize: true
    },
});

const webpackBackendConfigDevelopment= merge.merge(webpackBackendConfig, {
    devtool: false,
    mode: "development",
    optimization: {
        minimize: true
    },
});

const webpackBackendConfigRelease = merge.merge(webpackBackendConfig, {
    devtool: false,
    mode: "production",
    optimization: {
        minimize: true
    }
});

module.exports = function(grunt) {
    const pkg = grunt.file.readJSON("package.json");
    grunt.initConfig({

        watch: {
            updateSourceFiles: {
                files: ["./**/*", ".env"],
                tasks: ["webpack:development"],
                options: {
                    debounceDelay: 250,
                    livereload: 35734,
                    livereloadOnError: false,
                    spawn: false
                }
            }
        },

        webpack: {
            development: webpackBackendConfigDevelopment,
            release: webpackBackendConfigRelease,
            test: webpackBackendConfigTest
        },

        clean: {
            build: [
                "./dist/**/*",
                "./dist/testresults/**/*"
            ]
        },

        checkDependencies: {
            this: {}
        }
    });

    grunt.loadNpmTasks("grunt-check-dependencies");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-file-append");
    grunt.loadNpmTasks("grunt-webpack");

    grunt.registerTask("default", ["clean build", "watch"]);
    grunt.registerTask(
        "clean build",
        "Compiles all the assets and copies the files to the dist directory.",
        ["checkDependencies", "clean:build", "webpack:development"]
    );
    grunt.registerTask(
        "release",
        "Compiles all the assets and copies the files to the dist directory. Minified without source mapping",
        ["checkDependencies", "clean:build", "webpack:release"]
    );
    grunt.registerTask(
        "test",
        "Compiles all the assets and copies the files to the dist directory. Minified without source mapping",
        ["checkDependencies", "clean:build", "webpack:test"]
    );
    grunt.registerTask(
        "development",
        "Compiles all the assets and copies the files to the dist directory. Minified without source mapping",
        ["checkDependencies", "clean:build", "webpack:development"]
    );

    grunt.registerTask(
        "sandbox",
        "Compiles all the assets and copies the files to the dist directory. Minified without source mapping",
        ["checkDependencies", "clean:build", "webpack:sandbox"]
    );

    grunt.registerTask(
        "staging",
        "Compiles all the assets and copies the files to the dist directory. Minified without source mapping",
        ["checkDependencies", "clean:build", "webpack:staging"]
    );

    grunt.registerTask("build", ["clean build"]);
};
