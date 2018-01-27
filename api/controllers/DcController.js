/**
 * DcController
 *
 * @description :: Server-side logic for managing dcs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


var dateFormat = require('dateformat');
var Promise = require('bluebird');
var request = require('request');
request = request.defaults({ jar: true })
var userQueryAsync = {};
sails.on('lifted', function () {
    userQueryAsync = Promise.promisify(Dc.query);   // Your post-lift startup code here
});

module.exports = {


    getbrand: function (req, res) {
        Dc.query('SELECT info FROM dbinfo where infoid = 1;', function (err, results) {
            if (err) return res.serverError(err);
            return res.ok(results);
        });
    },
    test: function (req, res) {
        // console.log(req.param(0),req.param(1),req.param(2))

        return res.ok("alive and kicking at: " + Date());


    }


};

