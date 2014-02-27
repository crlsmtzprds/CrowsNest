/**
 * Name model.
 *
 * This model is used to fetch names, belonging to lastNames.
 *
 * $sails.model('name').find(); and $sails.models.name.find();
 *
 *
 * Store model schema in schema var, and extend for "find" etc functionality.
 * Returned models after find, should be wrapped in object for save, delete etc methods.
 * @uses ./module
 */
;
(function setupNameModel() {

  // The module
  var module = angular.module('core.models');

  /**
   * Register the name model.
   *
   * @param $sailsProvider
   * @constructor
   */
  function registerNameModel($sailsProvider) {
    $sailsProvider.registerModel('name', {

      /**
       * OPTIONAL: Will default to the name provided as the first arg of registerModel.
       *
       * Path will in this case be "/name".
       */
      path: '/name',

      /**
       * OPTIONAL: Will default to "id".
       *
       * Use this if you felt the urge to change the primary key.
       */
      primaryKey: 'id',

      /**
       * OPTIONAL: Will default to null.
       *
       * Use this if you're going to be loading associations.
       * This is needed for pubsub and method calls (to auto-update associations as well).
       *
       * Syntax:
       * - oneToOne:
       *    { ownPropertyName: 'modelName' }
       *      or
       *    { ownPropertyName: { model: 'modelName' } } (so same as sails)
       *
       * - oneToMany (Many side) | Same as oneToOne:
       *    { ownPropertyName: 'modelName' }
       *      or
       *    { ownPropertyName: { model: 'modelName' } } (so same as sails)
       *
       * - oneToMany (One side) | The same as for your sails model.
       *    { ownPropertyName: { collection: 'modelName', via: 'reversedBy' } }
       *
       * - manyToMany | The same as for your sails model
       *    { ownPropertyName: { collection: 'modelName', via: 'reversedBy', dominant: true|false } }
       */
      associations: {
        lastName: 'lastName'
      },

      /**
       * OPTIONAL: Defaults to false.
       *
       * This allows you to turn on, or off autoPubSub for this model.
       */
      autoPubSub: true
    });
  }

  module.config(['$sailsProvider', registerNameModel]);
})();
