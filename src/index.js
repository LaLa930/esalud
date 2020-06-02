const express = require('express');
const path = require('path');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const Handlebars = require('handlebars');
const expressHandlebars = require ('express-handlebars');
const methodOoverride = require('method-override');
const session = require ('express-session'); //Sesiones de usuarios
const flash = require('connect-flash'); //Enviar mensajes al usuario
const passport = require('passport'); //Control de sesiones
var schedule = require ('node-schedule'); //Sincronizacion de funciones 
var helpers = require('handlebars-helpers')(); 


//Declaraciones
const app = express();
require ('./database');
require('./config/passport');
require ('./mqtt');


//Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views') );
app.engine('.hbs',expressHandlebars({ //Usar hbs
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname:'.hbs',
    }) );
app.set('view engine', 'hbs');

//Middlewares, 
app.use(express.urlencoded({extended:false})); //Leer email y contraseña de un usuario, el extended es para evitar fotos
app.use(methodOoverride('_method')); //Formularios con más funcionalidad
app.use(session({ //Autenticación
    secret: 'secreta',
    resave: true,
    saveUninitialized: true,
}));

app.use(passport.initialize()); //Control de sesiones
app.use(passport.session());

app.use(flash());

//Variables globales
app.use((req,res,next) => { //Mensajes flash
    
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

