/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/a': {
    view: 'homepage'
  },
  //    //'GET /api/:getmethod': {controller: "DcController", action:"all"},
  'GET /api/test': 'DcController.test',
  'GET /api/getdbinfo': 'DcController.getdbinfo',
  'GET /api/department': 'DcController.department',
  'GET /api/supplier': 'DcController.supplier',
  'GET /api/stateslist': 'DcController.stateslist',    
  'GET /api/statecities/:state': 'DcController.statecities',  
  'GET /api/cdc': 'DcController.cdc',
  'GET /api/item': 'DcController.item',
  'GET /api/pdc': 'DcController.pdc',
  'GET /api/colour': 'DcController.colour',
  'GET /api/lot': 'DcController.lot',
  'GET /api/dc': 'DcController.dc',

  'POST /api/supplier': 'DcController.savesupplier',
  'POST /api/cdc': 'DcController.savecdc',
  'POST /api/pdc': 'DcController.savepdc',
  'POST /api/dc': 'DcController.savedc',
  'POST /api/colour': 'DcController.savecolour',
  'POST /api/lot': 'DcController.savelot',


  'PUT /api/supplier/:id': 'DcController.updatesupplier',
  'PUT /api/cdc/:id': 'DcController.updatecdc',
  'PUT /api/pdc/:id': 'DcController.updatepdc',
  'PUT /api/dc/:id': 'DcController.updatedc',
  'PUT /api/colour/:id': 'DcController.updatecolour',
  'PUT /api/lot/:id': 'DcController.updatelot',





  //    'get /:uri1': 'DcController.bye',
  //    'get /:uri1/:uri2': 'DcController.bye',
  //    'get /:uri1/:uri2/:uri3': 'DcController.bye',
  //    'get /:uri1/:uri2/:uri3/:uri4': 'DcController.bye',

  //    'get /api/:uri1': 'DcController.bye',
  //    'get /api/:uri1/:uri2': 'DcController.bye',
  //    'get /api/:uri1/:uri2/:uri3': 'DcController.bye',
  //    'get /api/:uri1/:uri2/:uri3/:uri4': 'DcController.bye'


  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/
  'get /login': {
    view: 'login'
  },

  'post /login': 'AuthController.login',

  '/logout': 'AuthController.logout',

  'get /signup7790844832': {
    view: 'signup'
  },

};
