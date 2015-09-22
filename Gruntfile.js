module.exports = function(grunt) {
    "use strict";

    var path = require('path');

    var EMPTY = "empty:";

    var matches = grunt.file.expand('./*.html');

    var version = grunt.file.readJSON('package.json').version;

	var requirejsOptions = {};
	if (matches.length > 0) {
		for (var x = 0; x < matches.length; x++) {
			var name = matches[x].match(/[\w-]{1,}/i);
			requirejsOptions['task' + x] = {
				"options": {
					"baseUrl": "./js/",
					"paths": {
                        'FFF' : EMPTY,
                        'zepto' : EMPTY,
                        'template' : EMPTY,
                        'fastclick' : EMPTY,
                        'eventEmitter' : EMPTY,
                        'attribute' : EMPTY,
                        'base' : EMPTY,
                        'language' : EMPTY,
                        'widget' : EMPTY
                    },
					"name": name.toString(),
					"out": "dist/"+version+"/js/"+name + ".min.js",
					"optimize": "uglify"
				}
			};
		}
	}

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-requirejs");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks('grunt-processhtml');

    grunt.registerTask(
        "default", ["clean",
            "copy:dist",
            "cssmin",
            "requirejs",
            "processhtml"
        ]
    );

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            version: "<%= pkg.version %>",
            banner: "// <%= pkg.name %> - <%= pkg.version %> @ <%= grunt.template.today('yyyy-mm-dd HH:MM:ss') %> \r\n"
        },
        clean: {
            dist: ["dist/<%= pkg.version %>"]
        },
        requirejs: requirejsOptions,
        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: "./img/",
                    src: "**",
                    dest: "./dist/<%= pkg.version %>/img"
                }, {
                    expand: true,
                    cwd: "./tpl/",
                    src: "**",
                    dest: "./dist/<%= pkg.version %>/tpl"
                }, {
                    expand: true,
                    cwd: "./sound/",
                    src: "**",
                    dest: "./dist/<%= pkg.version %>/sound"
                }, {
                    expand: true,
                    cwd: "./others/",
                    src: "**",
                    dest: "./dist/<%= pkg.version %>/others"
                }, {
                    expand: true,
                    cwd: "./",
                    src: "*.html",
                    dest: "./dist/<%= pkg.version %>/"
                }]
            }
        },
        uglify: {
            version: {
                files: {
                    "client/source/0.1.0/all.built.min.js": ["client/source/0.1.0/all.built.js"]
                }
            }
        },
        cssmin: {
            compress: {
                files: [{
                    expand: true,
                    cwd: './css/',
                    src: ['**/*.css', '!**/*.min.css'],
                    dest: './dist/<%= pkg.version %>/css/',
                    ext: '.min.css'
                }]

            }
        },
        processhtml: {
            pages: {
                files: [{
                    expand: true,
                    cwd: "./",
                    src: "*.html",
                    dest: "dist/<%= pkg.version %>/",
                    ext: '.html'
                }]
            }
        }
    });
};
