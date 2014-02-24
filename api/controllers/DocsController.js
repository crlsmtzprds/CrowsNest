/**
 * DocsController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	index: function(req, res) {

    var routes = sails.router._slave.routes
      , docRoutes = {}
      , methods = ['post', 'get', 'put','delete']
      , method;

    for (method in routes) {

      if (methods.indexOf(method) < 1) {
        continue;
      }

      routes[method].forEach(function(route) {
        var docRoute;

        if (!docRoutes[route.path]) {
          docRoutes[route.path] = [];
        }

        docRoute = {
          path: route.path,
          method: route.method,
          callbacks: route.callbacks
        };

        if (route.keys.length) {
          docRoute.options = route.keys;
        }

        docRoutes[route.path].push(docRoute);
      });
    }

    res.json(docRoutes);

  }
};
