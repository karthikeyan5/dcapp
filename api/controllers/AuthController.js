/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');
var url = require('url');

module.exports = {

    _config: {
        actions: false,
        shortcuts: false,
        rest: false
    },

    login: function(req, res) {

        passport.authenticate('local', function(err, employee, info) {
            if ((err) || (!employee)) {
                return res.send({
                    message: info.message,
                    user: employee
                });
            }
            req.logIn(employee, function(err) {
                if (err) res.send(err);
                // return res.send({
                //     message: info.message,
                //     user: user
                // });

                let referer = url.parse(req.header('Referer'),true)
                let redirect_uri = referer.query.redirect_to?referer.query.redirect_to:'/';
                return res.redirect(redirect_uri);
            });

        })(req, res);
    },

    logout: function(req, res) {
        req.logout();
        res.redirect('/login');
    }
};

