// iran las urls en donde autentica con los login y sing up 
const express = require('express');
const router = express.Router();

// llamo a user.js donde tengo creado su esquema de BD
const User = require('../models/user');

// para el inicio de sesion
const passport = require('passport');

//resitro y autenticacion
router.get('/users/singin', (req,res) => {
    res.render('users/singin');
});

// para el inicio ed sesion con passport
router.post('/users/singin', passport.authenticate('local', {
    successRedirect: '/sensores/Allsensor', // si esta todo bien lo envio a als notas de sensores
    failureRedirect: '/users/singin',
    failureFlash: false // no funciona ahora, no sale el mensaje por alguna razon, estaba a true 
})); // el metodo local que hemos elegido 


router.get('/users/singup', (req,res) => {
    res.render('users/singup');
});

// ruta para recibir los datos del registro
router.post('/users/singup', async (req, res)=>{
 const {name, email,number, password, confirm_password} = req.body;
 const errors= []; // este errors es el que esta definido en errors.hbs con la etiqueta de errors
 console.log(req.body)

 if(name.length <= 0){
    errors.push({text: 'Rellene el nombre'});
 }
 if(email.length <= 0){
    errors.push({text: 'Rellene el email'});
 }

 if(number.length !=11){
    errors.push({text: 'Rellene el número de teléfono incluyendo su prefijo'});
 }

 if(password.length <= 0){
    errors.push({text: 'Rellene la contraseña'})
}
if(confirm_password.length <= 0){
    errors.push({text: 'Confirme la contraseña'})
}
 if(password!=confirm_password){
     errors.push({text: 'Las contraseñas no coinciden'});
 }

if(errors.length>0){
    res.render('users/singup', {errors, name, email, number, password, confirm_password});
}else{
    // para que no haya email repetido
    const emailUser = await User.findOne({email:email});
    if(emailUser){
        req.flash('error', 'El email ya esta en uso'); // otro error que esta definido dentro de errors.hbs
        res.redirect('/users/singup');
    }
    // cuando compruebo que todo va bien lo me creo un usuario en BD
    const newUser = new User({name, email,number, password});
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    req.flash('success_msg', 'Exito al registrarse');
    res.redirect('/users/singin');
}

});

//para el logut
router.get('/users/logout', (req,res) => {

    req.logOut();
    res.redirect('/users/singin');

});

module.exports = router;