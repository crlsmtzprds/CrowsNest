/**
 * - PATCH
 * - GET
 * - PUT
 * - POST
 * - DELETE
 * - request
 * - emit
 * - on
 * - connect
 *
 * @todo Create default singleton, allow named connections (multiple servers)
 * @todo Implementation
 */
;
(function SetupSailsSocketProvider() {

  'use strict';

  function SailsSocketProvider() {

    var config = {};

    this.setUrl = function(url) {
      config.url = url;
    };

    this.setDebug = function(debug) {
      config.debug = !!debug;
    };

    // expose to provider
    this.$get = function($rootScope, $timeout) {
      var socket, wrappedSocket;

      socket = io.connect(config.url || null);

      function asyncAngularify(callback) {
        return function() {
          var args = arguments;
          $timeout(function() {
            callback.apply(socket, args);
          }, 0);
        };
      }

      function addListener(eventName, callback) {
        socket.on(eventName, asyncAngularify(callback));
      }

      wrappedSocket = {
        on: addListener,
        addListener: addListener,

        emit: function(eventName, data, callback) {
          if (callback) {
            socket.emit(eventName, data, asyncAngularify(callback));
          } else {
            socket.emit(eventName, data);
          }
        },

        request: function(url, data, cb, method) {

          // Remove trailing slashes and spaces
          url = url.replace(/^(.+)\/*\s*$/, '$1');
          method = method || 'get';


          if (typeof url !== 'string') {
            throw 'Invalid or missing URL!';
          }

          // Allow data arg to be optional
          if (typeof data === 'function') {
            cb = data;
            data = {};
          }

          // Build to request
          var json = io.JSON.stringify({
            url: url,
            data: data
          });


          // Send the message over the socket
          wrappedSocket.emit(method, json, function afterEmitted(result) {

            var parsedResult = result;

            if (result && typeof result === 'string') {
              try {
                parsedResult = io.JSON.parse(result);
              } catch (e) {
                throw "Server response could not be parsed!\n" + result;
              }
            }

            // TODO: Handle errors more effectively
            if (parsedResult === 404) throw new Error("404: Not found");
            if (parsedResult === 403) throw new Error("403: Forbidden");
            if (parsedResult === 500) throw new Error("500: Server error");

            cb && cb(parsedResult);

          });
        },

        get: function(url, data, cb) {
          return this.request(url, data, cb, 'get');
        },

        post: function(url, data, cb) {
          return this.request(url, data, cb, 'post');
        },

        put: function(url, data, cb) {
          return this.request(url, data, cb, 'put');
        },

        delete: function(url, data, cb) {
          return this.request(url, data, cb, 'delete');
        },

        removeListener: function() {
          var args = arguments;

          return socket.removeListener.apply(socket, args);
        }
      };

      if (config.debug) {
        wrappedSocket.get('/firehose', function(datas) {
          console.log(datas);

          wrappedSocket.on('firehose', function(datad) {
            console.log(datad);
          });
        });
      }

      return wrappedSocket;
    };
  }

  var module = angular.module('core.providers');

  module.provider('$sailsSocket', SailsSocketProvider);
})();
