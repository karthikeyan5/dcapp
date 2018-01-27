module.exports = function(req, res, next) {
    if (req.isAuthenticated()) {
         return next();
     }
     else{
        //  return res.redirect('/login');
        return res.status(401).send('Unauthorized User');
     }
 };