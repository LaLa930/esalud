// aqui se hace la comprobacion de que el usuario que intenta iniciar sesion si existe y por tanto puede acceder
const passport = require ('passport');
const localStrategy = require('passport-local');
const User = require('../models/user');

passport.use(new localStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    const user = await User.findOne({email: email}); // comrpuebo si tengo el email en BD
    if(!user){
        return done(null, false, {message: 'Usuario no encontrado'}); // si no lo tengo doy un mensaje y acabo el proceso
                //[error] [usuario] [mensaje]
    }else{
        const match = await user.matchPassword(password); // compruebo si tengo la contraseña en BD
        if(match){
            return done (null,user);
        }else{
            return done(null, false, {message:'La contraseña no es correcta'});
        }
    }
//comprobar en BD
}));

// almacenar la sesion del usuario para enseñar sus cosas
passport.serializeUser((user,done) => {
    done(null,user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id,(err,user) =>{
    done(err,user);
    });
});