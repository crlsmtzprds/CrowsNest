/**
 * ModelProvider
 *
 * @author RWOverdijk
 * @license MIT
 *
 * @uses ./module
 * @uses ./SailsSocketProvider
 *
 * Has abstract methods for find, findAll etc.
 */
;
(function prepareSailsModelProvider() {

  'use strict';

  function SailsModelProvider() {

    var entities = {}
      , listeners = {};

    this.$get = ['$q', '$sailsSocket', '$rootScope', function($q, $sailsSocket, $rootScope) {

      // Classes

      /**
       * Base entity function.
       *
       * @param {{}} options
       * @constructor
       */
      function Entity(options, data) {
        var k;

        this._options = options;

        for (k in data) {
          this[k] = data[k];
        }
      }

      /**
       * The methods for Entity.
       */
      Entity.prototype = {

        save: function() {
          var deferred = $q.defer()
            , raw = createRawObject(this);

          $sailsSocket.put(this._options.path + '/' + this[this._options.primaryKey], raw, function(response) {
            deferred.resolve(response);
          });

          return deferred.promise;
        },
        delete: function() {

        }
      };

      /**
       * Model function.
       *
       * @param {{}} options
       * @constructor
       */
      function Model(options) {
        this.options = options;
      }

      /**
       * The methods for Model.
       */
      Model.prototype = {
        /**
         * Find an entity.
         *
         * @param {Number} id
         * @returns {Deferred}
         * @todo add cache
         */
        find: function(id) {
          var deferred = $q.defer()
            , path = this.options.path
            , parameters = {};

          if (id) {
            if (typeof id === 'object') {
              parameters = id;
            } else {
              path += '/' + parseInt(id);
            }
          }

          $sailsSocket.get(path, parameters, function(data) {

            var registeredEntity = registerEntity(this.options, data);

            // Figure out WTF to do with this. We can be resolving single, and multiple entities.
            deferred.resolve(registeredEntity);
          }.bind(this));

          return deferred.promise;
        },

        create: function() {},
        findOne: function() {},
        findAll: function() {}
      };

      // Methods

      function createRawObject(entity) {
        var properties = Object.getOwnPropertyNames(entity)
          , raw = {};

        properties.forEach(function(property) {
          if (property[0] === '_') {
            return;
          }

          raw[property] = entity[property];
        });

        return raw;
      }

      function subscribe(name) {
        if (listeners[name]) {
          return;
        }

        $sailsSocket.on(name, function(updateData) {

          if (updateData.verb === 'updated') {
            $rootScope.$apply(function() {

              for (var k in updateData.data) {
                entities[name][updateData.id][k] = updateData.data[k];
              }
            });
          }
        });

        listeners[name] = true;
      }

      function registerEntity(options, data) {

        if (Array.isArray(data)) {
          var registeredEntities = [];

          data.forEach(function(record) {
            registeredEntities.push(registerEntity(options, record));
          });

          return registeredEntities;
        }

        if (!entities[options.name]) {
          entities[options.name] = {};
        }

        var entity = new Entity(options, data);

        entities[options.name][data.id] = entity;

        if (options.autoPubSub) {
          subscribe(options.name);
        }

        return entity;
      }

      /**
       * Return a "factory" for Model
       */
      return function(options) {
        return new Model(options);
      }
    }];
  }

  var module = angular.module('core.providers');

  module.provider('$sailsModel', SailsModelProvider);

})();
