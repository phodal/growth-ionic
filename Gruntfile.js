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
        uploadConcurrency: 5, // 5 simultaneous uploads
        downloadConcurrency: 5 // 5 simultaneous downloads
      },
      production: {
        options: {
          bucket: 'www.growth.ren',
          params: {
            CacheControl: 'max-age=604800'
          }
        },
        files: [
          {expand: true, cwd: 'www/css/', src: ['**'], dest: 'css/', action: 'upload'},
          {expand: true, cwd: 'www/img/', src: ['**'], dest: 'img/', action: 'upload'},
          {expand: true, cwd: 'www/js/', src: ['**'], dest: 'js/', action: 'upload'},
          {expand: true, cwd: 'www/lib/', src: ['**'], dest: 'lib/', action: 'upload'},
          {expand: true, cwd: 'www/assets/', src: ['**'], dest: 'assets/', action: 'upload'},
          {expand: true, cwd: 'www/review/', src: ['**'], dest: 'review/', action: 'upload'},
          {expand: true, cwd: 'www/templates/', src: ['**'], dest: 'templates/', action: 'upload'},
          {expand: true, cwd: 'platforms/android/build/outputs/apk', src: ['android-armv7-debug.apk'], dest: './', action: 'upload'},
          {expand: true, cwd: 'www/article/', src: ['**'], dest: 'article/', action: 'upload', params: {ContentType: 'text/plain'}},
          {
            expand: true,
            cwd: './www/',
            src: ['index.html'],
            dest: './',
            action: 'upload',
            params: {CacheControl: 'max-age=30', ContentType: 'text/html'}
          }
          // CacheControl only applied to the assets folder
          // LICENCE inside that folder will have ContentType equal to 'text/plain'
        ]
      },
      clean_production: {
        options: {
          bucket: 'www.growth.ren',
          debug: true // Doesn't actually delete but shows log
        },
        files: [
          {dest: 'css/', src: ['**'],  action: 'delete'},
          {dest: 'img/', src: ['**'],  action: 'delete'},
          {dest: 'js/', src: ['**'],  action: 'delete'},
          {dest: 'lib/', src: ['**'],  action: 'delete'},
          {dest: 'templates/', src: ['**'],  action: 'delete'},
          {dest: 'article/', src: ['**'],  action: 'delete'},
          {dest: './', src: ['index.html'], action: 'delete'}
          //{dest: 'assets/', exclude: "**/*.tgz", action: 'delete'}, // will not delete the tgz
          //{dest: 'assets/large/', exclude: "**/*copy*", flipExclude: true, action: 'delete'}, // will delete everything that has copy in the name
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-aws-s3');
  grunt.registerTask('deploy', ['aws_s3:clean_production', 'aws_s3:production']);

};
