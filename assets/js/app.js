/**
 * app
 *
 * Main app file for CrowsNest.
 *
 * @author RWOverdijk
 * @license MIT
 * @uses ./index
 * @uses ./common/providers/SailsProvider
 *
 * @todo figure out how to compile views in templateCache with grunt.
 */
angular.module('crowsNest', [
  'ui.router',
  'cn.index',
  'common.providers'
//  'ngRoute',
//  'ngResource',
//  'ui.bootstrap'
]);