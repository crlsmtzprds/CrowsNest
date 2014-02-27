/**
 * SailsProvider
 *
 * @author RWOverdijk
 * @license MIT
 *
 * @uses ./module
 *
 * @todo https://gist.github.com/robwormald/9218949 (line 39) find an elegant solution using this resource.
 *  Perhaps make new model a provider. I'll need something for the socket stuff.
 *    Socket "thing" should be part of sails provider (has to stay simple)
 *
 * @todo add functionality for $resource, making pubsub as well as sockets optional.
 * @todo add Entity class that allows you to update, delete etc.
 * @todo build all request types
 * @todo Map request types to model functions.
 * @todo restructure code.
 * @todo Figure out if every model will have a copy of the methods etc.
 */
;
(function setupSailsProvider() {

  var modelConfigs = []
    , models = {};

  function SailsProvider() {

    /**
     * Normalize config.
     *
     * @param {string} name
     * @param {{}} config
     * @returns {{}}
     */
    function normalizeConfig(name, config) {
      return angular.extend({
        name: name,
        path: '/' + name.replace(/(^\/|\/$)/g, ''),
        primaryKey: 'id',
        autoPubSub: false,
        associations: null
      }, config || {});
    }

    /**
     * Register a model with the SailsProvider.
     *
     * @param {string} name
     * @param {{}} [config]
     * @returns {SailsProvider}
     */
    this.registerModel = function(name, config) {
      modelConfigs.push(normalizeConfig(name, config));

      return this;
    };

    /**
     * Exposed methods for provider.
     *
     * @type {Array}
     */
    this.$get = ['$rootScope', '$timeout', '$sailsModel', function($rootScope, $timeout, $sailsModel) {

      // Instantiate all models that have been configured up until now.
      modelConfigs.forEach(function(config) {
        models[config.name] = $sailsModel(config);
      });

      return {

        /**
         * Get a model.
         *
         * @param {string} name
         * @returns {{}}
         */
        model: function(name) {

          // In case the model doesn't exist it yet, create it.
          if (typeof models[name] !== 'object') {
            models[name] = $sailsModel(normalizeConfig(name));
          }

          return models[name];
        }
      };
    }];
  }

  var module = angular.module('core.providers');

  module.provider('$sails', SailsProvider);
})();
