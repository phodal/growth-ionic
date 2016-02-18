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
          debug: true // Doesn't actually delete but shows log
        },
        files: [
          {expand: true, cwd: 'www/', src: ['manifest.json'], dest: './', action: 'upload'},
          {
            expand: true,
            cwd: 'www/',
            src: ['version.json'],
            dest: './',
            action: 'upload',
            params: {CacheControl: 'max-age=30'}
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

  grunt.loadNpmTasks('grunt-aws-s3');
  grunt.registerTask('release', ['aws_s3:clean_production', 'aws_s3:production', 'aws_s3:deploy_apk']);
  grunt.registerTask('update', ['aws_s3:clean_production', 'aws_s3:production']);
};
