
const helpers = {};

// comprobar si el usuario esta autenticado para ver que le muestro
helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error') // error que esta definido dentro de errors.hbs
    res.redirect ('/users/singin');
}

module.exports = helpers;
