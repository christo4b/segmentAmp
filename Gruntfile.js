module.exports = function (grunt) {
  grunt.initConfig({
    standard: {
      options: {
        format: true
      },
      app: {
        src: ['{/,src/}*.js']
      }
    },
    watch: {
      scripts: {
        files: ['src/*.js', 'readable.js', 'test/*.js'],
        tasks: ['lint', 'test']
      }
    },
    mochaTest: {
      src: ['test/**/*.js']
    }
  })

  grunt.loadNpmTasks('grunt-standard')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-mocha-test')

  grunt.registerTask('test', 'mochaTest')
  grunt.registerTask('default', ['watch'])
  grunt.registerTask('lint', ['standard'])
}