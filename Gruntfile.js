var includeAll = require('sails/node_modules/include-all')
	, path = require('path');

module.exports = function(grunt) {



  configureGruntfile();

  /**
   * Load CommonJS submodules from the specified
   * relative path.
   *
   * @return {Object}
   */
  function loadTasks (relPath) {
    return includeAll({
      dirname: path.resolve(__dirname, relPath),
      filter: /(.+)\.js$/
    });
  }

  /**
   * Invokes the config function for the task config and register definitions.
   * Make sure to pass in grunt.
   *
   * @param  {Object} tasks [Grunt object that each task will need]
   */
  function invokeConfigFn (tasks) {
    for (var taskName in tasks) {
      if (tasks.hasOwnProperty(taskName)) {
        tasks[taskName](grunt);
      }
    }
  }

  /**
   * Configure the gruntfile.
   */
  function configureGruntfile () {
    var taskConfigurations = loadTasks('./grunt/config'),
        registerDefinitions = loadTasks('./grunt/register');

    invokeConfigFn(taskConfigurations);
    invokeConfigFn(registerDefinitions);
  }
};
