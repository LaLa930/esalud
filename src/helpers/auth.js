
const helpers = {};
// Comprobar si el usuario esta autenticado para ver que le muestro
helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error') 
    res.redirect ('/users/singin');
}

module.exports = helpers;
