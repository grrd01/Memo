module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // terser scripts/app.js -o ../../2_Build/Memo/scripts/app.js -c -m --comments
        terser: {
            one: {
                options: {
                    compress: true,
                    mangle: true,
                    output: {
                        comments: 'some'
                    }
                },
                files: {
                    '../../2_Build/Memo/scripts/app.js': ['scripts/app.js']
                }
            },
            two: {
                options: {
                    compress: true,
                    mangle: true,
                    output: {
                        comments: 'some'
                    }
                },
                files: {
                    '../../2_Build/Memo/sw.js': ['sw.js']
                }
            }
        },
        svgmin: {
            options: {
                plugins: [
                    {removeUnknownsAndDefaults: false},
                    {removeViewBox: false}
                ]
            },
            dist: {
                files: [
                    {'../../2_Build/Memo/images/2player.svg': 'images/2player.svg'},
                    {'../../2_Build/Memo/images/4inarow.svg': 'images/4inarow.svg'},
                    {'../../2_Build/Memo/images/back.svg': 'images/back.svg'},
                    {'../../2_Build/Memo/images/cards.svg': 'images/cards.svg'},
                    {'../../2_Build/Memo/images/dice.svg': 'images/dice.svg'},
                    {'../../2_Build/Memo/images/info.svg': 'images/info.svg'},
                    {'../../2_Build/Memo/images/mail.svg': 'images/mail.svg'},
                    {'../../2_Build/Memo/images/next.svg': 'images/next.svg'},
                    {'../../2_Build/Memo/images/ok.svg': 'images/ok.svg'},
                    {'../../2_Build/Memo/images/photo.svg': 'images/photo.svg'},
                    {'../../2_Build/Memo/images/prev.svg': 'images/prev.svg'},
                    {'../../2_Build/Memo/images/puzzle.svg': 'images/puzzle.svg'},
                    {'../../2_Build/Memo/images/tictactoe.svg': 'images/tictactoe.svg'},
                    {'../../2_Build/Memo/images/x.svg': 'images/x.svg'}
                    ]
            }
        },
        image_resize: {
            resize: {
                options: {
                    width: 500,
                },
                src: 'images/animals/*.jpg',
                dest: '../../2_Build/Memo/images/animals/'
            }
        },
        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '../../2_Build/Memo/images'
                }]
            }
        },
        cssmin: {
            dist: {
                options: {
                    banner: "/*\n* grrd's Memo\n* Copyright (c) 2020 Gerard Tyedmers, grrd@gmx.net\n* Licensed under the MPL-2.0 License\n*/\n"
                },
                files: {
                    '../../2_Build/Memo/styles/app.css': ['styles/app.css']
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    src: 'index.html',
                    dest: '../../2_Build/Memo'
                }]
            }
        },
        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: /\<\!DOCTYPE html\>/g,
                            replacement: function () {
                                return "<!DOCTYPE html>\n<!-- \n* grrd's Memo \n* Copyright (c) 2020 Gerard Tyedmers, grrd@gmx.net \n* Licensed under the MPL-2.0 License\n-->\n";
                            }
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: ['../../2_Build/Memo/index.html'], dest: '../../2_Build/Memo/'}
                ]
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, flatten: true, src: ['manifest/*'], dest: '../../2_Build/Memo/manifest/'},
                    {expand: true, flatten: true, src: ['images/*.ico'], dest: '../../2_Build/Memo/images/'},
                    {expand: true, flatten: true, src: ['**.txt'], dest: '../../2_Build/Memo/'},
                    {expand: true, flatten: true, src: ['**.md'], dest: '../../2_Build/Memo/'}
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-terser');
    grunt.loadNpmTasks('grunt-image-resize');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', [
        'terser',
        'svgmin',
        'image_resize',
        // 'imagemin',
        'cssmin',
        'htmlmin',
        'replace',
        'copy'
    ]);
};
