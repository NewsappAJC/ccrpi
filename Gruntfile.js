module.exports = function(grunt) {
  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    copy: {
      target: {
        files: [
          { expand: true, flatten: true, src: ["src/scripts/lib/*.js"], dest: "build/scripts/lib/" },
          { expand: true, flatten: true, src: ["src/images/*.png"], dest: "build/images/" }
        ]
      }
    },

    jshint: {
      files: [
        "Grintfile.js",
        "src/scripts/*.js"
      ],
      options: {
        browser: true,
        curly: true,
        eqeqeq: true,
        latedef: true,
        //quotmark: true,
        undef: true,
        unused: true,
        strict: true,
        trailing: true,
        smarttabs: true,
        indent: 2,
        globals: {
          JQuery: true,
          $: true
        }
      }
    },

    uglify: {
      options: {
        mangle: { except: ["d3", "_","$"] },
        compress: true,
        report: "gzip"
      },
      my_target: {
        files: {
          "build/scripts/app.js"   : ["src/scripts/app.js"]
        }
      }
    },

    htmlmin: {
      build: {
        options: {
          removeComments: true,
          collapsWhitespace: true,
          useShortDoctype: true
        },
        files: {
          "build/index.html"    : "src/index.html"
        }
      }
    },

    cssmin: {
      compress: {
        options: {
          report: "gzip"
        },
        files: {
          "build/style/app.css": ["src/style/app.css"]
        }
      }
    }
  });
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  grunt.loadNpmTasks("grunt-contrib-cssmin");

  grunt.registerTask("default", ["copy","uglify","htmlmin","cssmin"]);
};

