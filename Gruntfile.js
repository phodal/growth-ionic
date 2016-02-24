module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    aws: grunt.file.readJSON('aws-credentials.json'),

    aws_s3: {
      options: {
        accessKeyId: '<%= aws.AWSAccessKeyId %>', // Use the variables
        secretAccessKey: '<%= aws.AWSSecretKey %>', // You can also use env variables
        region: 'ap-southeast-2',
        uploadConcurrency: 5,
        downloadConcurrency: 5
      },
      production: {
        options: {
          bucket: 'www.growth.ren',
          params: {
            CacheControl: 'max-age=604800'
          }
        },
        files: [
          {expand: true, cwd: 'www/assets/', src: ['**'], dest: 'assets/', action: 'upload'},
          {expand: true, cwd: 'www/css/', src: ['**'], dest: 'css/', action: 'upload'},
          {expand: true, cwd: 'www/img/', src: ['**'], dest: 'img/', action: 'upload'},
          {expand: true, cwd: 'www/js/', src: ['**'], dest: 'js/', action: 'upload'},
          {expand: true, cwd: 'www/lib/', src: ['**'], dest: 'lib/', action: 'upload'},
          {expand: true, cwd: 'www/templates/', src: ['**'], dest: 'templates/', action: 'upload'},
          {expand: true, cwd: 'www/', src: ['manifest.json'], dest: './', action: 'upload'},
          {
            expand: true,
            cwd: './www/',
            src: ['index.html'],
            dest: './',
            action: 'upload',
            params: {CacheControl: 'max-age=30', ContentType: 'text/html'}
          }
        ]
      },
      deploy_apk: {
        options: {
          bucket: 'www.growth.ren',
          params: {
            CacheControl: 'max-age=604800'
          }
        },
        files: [
          {expand: true, cwd: 'www/', src: ['manifest.json'], dest: './', action: 'upload'},
          {
            expand: true,
            cwd: 'www/',
            src: ['version.json'],
            dest: './',
            action: 'upload',
            params: {CacheControl: 'max-age=300'}
          },
          {expand: true, cwd: 'platforms/android/build/outputs/apk', src: ['growth.apk'], dest: './', action: 'upload'}
        ]
      },
      clean_production: {
        options: {
          bucket: 'www.growth.ren',
          debug: true // Doesn't actually delete but shows log
        },
        files: [
          {dest: 'assets/', src: ['**'],  action: 'delete'},
          {dest: 'css/', src: ['**'],  action: 'delete'},
          {dest: 'img/', src: ['**'],  action: 'delete'},
          {dest: 'js/', src: ['**'],  action: 'delete'},
          {dest: 'lib/', src: ['**'],  action: 'delete'},
          {dest: 'templates/', src: ['**'],  action: 'delete'},
          {dest: './', src: ['index.html', 'growth.apk', 'version.json'], action: 'delete'}
        ]
      }
    }
  });

  //GRUNT TASK TO BUILD A JSON MANIFEST FILE FOR HOT CODE UPDATES
  grunt.registerMultiTask('jsonmanifest', 'Generate JSON Manifest for Hot Updates', function () {
    var options = this.options({loadall:true, root: "./", files: {}, load: []});
    var done = this.async();

    var path = require('path');

    this.files.forEach(function (file) {
      var files;

      //manifest format
      var json = {
        "files": options.files,
        "load": options.load,
        "root": options.root
      };

      //clear load array if loading all found assets
      if(options.loadall) {
        json.load = [];
      }

      // check to see if src has been set
      if (typeof file.src === "undefined") {
        grunt.fatal('Need to specify which files to include in the json manifest.', 2);
      }

      // if a basePath is set, expand using the original file pattern
      if (options.basePath) {
        files = grunt.file.expand({cwd: options.basePath}, file.orig.src);
      } else {
        files = file.src;
      }

      // Exclude files
      if (options.exclude) {
        files = files.filter(function (item) {
          return options.exclude.indexOf(item) === -1;
        });
      }

      // Set default destination file
      if (!file.dest) {
        file.dest = ['manifest.json'];
      }

      // add files
      if (files) {
        files.forEach(function (item) {

          var isDir = grunt.file.isDir(path.join(options.basePath, item));

          if (!isDir)
          {
            var hasher = require('crypto').createHash('sha256');
            var filename = encodeURI(item);
            var key = filename.split("-").slice(1).join('-');
            json.files[key] = {};
            json.files[key]['filename'] = filename;
            json.files[key]['version'] = hasher.update(grunt.file.read(path.join(options.basePath, item))).digest("hex");

            if(options.loadall)
            {
              json.load.push(filename);
            }
          }
        });
      }
      //write out the JSON to the manifest files
      file.dest.forEach(function(f) {
        grunt.file.write(f, JSON.stringify(json, null, 2));
      });

      done();
    });
  });

  grunt.loadNpmTasks('grunt-aws-s3');
  grunt.registerTask('release', ['aws_s3:clean_production', 'aws_s3:production', 'aws_s3:deploy_apk']);
  grunt.registerTask('update', ['aws_s3:clean_production', 'aws_s3:production']);
};
