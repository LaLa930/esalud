const express = require('express');
const path = require('path');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const Handlebars = require('handlebars');
const expressHandlebars = require ('express-handlebars');
const methodOoverride = require('method-override');
const session = require ('express-session'); // sesiones de usuarios
const flash = require('connect-flash'); // para enviar mensajes al usuario
const passport = require('passport'); // para el control de sesiones
var schedule = require ('node-schedule'); // sincronizacion de funciones 
var helpers = require('handlebars-helpers')(); // acortar la fecha


//Declaraciones
const app = express();
require ('./database');
require('./config/passport');
require ('./mqtt');


//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views') );
app.engine('.hbs',expressHandlebars({ // en main dentro de defaultlayout va el css y el html, layouts dir es donde esta el html y el css, partials es el html reutilizable en las vistas, el extname es la extesion
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname:'.hbs',
    }) );
app.set('view engine', 'hbs');

//Middlewares, 
app.use(express.urlencoded({extended:false})); // para poder leer el email y contraseña de un usuario, el extended es para evitar fotos
app.use(methodOoverride('_method')); // formularios que metan otras cosas como put y delete
app.use(session({ // la autenticacion
    secret: 'secreta',
    resave: true,
    saveUninitialized: true,
}));

app.use(passport.initialize()); // para el control de sesiones
app.use(passport.session());

app.use(flash());

//Variable global
app.use((req,res,next) => { //mensajes flash al usuario
    
    res.locals.success_msg = req.flash('success_msg');
    res.locals.errors_msg = req.flash('errors_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null; //Control de las vistas para usuarios 

    next();
});

//Rutas
app.use(require('./routes/index'));
app.use(require('./routes/tension'));
app.use(require('./routes/sistolica'));
app.use(require('./routes/diastolica'));
app.use(require('./routes/spo'));
app.use(require('./routes/spoo'));
app.use(require('./routes/users'));
app.use(require('./routes/airflow'));
app.use(require('./routes/electro'));
app.use(require('./routes/allsensor'));

app.use(require('./routes/presionT'));
app.use(require('./routes/spoT'));

//Archivo estatico 
app.use(express.static(path.join(__dirname, 'public')));


//Inicio de servidor
app.listen(app.get('port'), () => {
    console.log('El servidor escucha en puerto', app.get('port'));
});

