// solo urls de mi servidor para el usuario manejando sus datos

const express = require('express');
const router = express.Router();
const Sensor = require('../models/Sensor');
const {isAuthenticated} = require ('../helpers/auth'); // para ver si esta autenticado o no

// para etrar a la vista de tension
router.get('/sensores/tension', isAuthenticated , (req,res)=>{
  res.redirect('/tension');
});


router.get('/tension', isAuthenticated , async (req,res) => {
  await Sensor.find({name:'tension'}) // aqui puedo especificar si quiero que busque por ejemplo el nombre tension EL {user: req.user.id} ES PARA QUE CADA USER TENGA LO SUYO
    .then(sensors => {
      const context = {
        sensores: sensors.map(sensor => {
          return {
            name: sensor.name,
            valor: sensor.valor,
            date: sensor.date
          }
        })
      }
      res.render('sensores/tension', {sensores: context.sensores})
    })

});

module.exports = router;



// ANTIGUO DONDE SE CREABAN LOS SENSORES

//const Sensor = require ('../models/sensor');
 // para evitar que se vea la pagina de sensores si no estas logeado 

 //const {isAuthenticated} = require ('../helpers/auth')

// meto solo el isAthenticate,  en cada ruta que solo queira para quien este registrado
//router.get('/sensores/Allsensor', isAuthenticated, (req,res) => {
   // res.render('sensores/Allsensor.hbs');
//});

//router.get('/sensores/tension', isAuthenticated, (req, res) => {
  // res.render('sensores/tension.hbs')
//});


/// que me muestre el formulario

//router.get('/sensores/addsensor', (req, res) => {

//res.render('sensores/newsensor.hbs')

//});

// recibir datos
//router.post('/sensores/newsensor', async (req, res) => {

    // como tengo el titulo y el valor, puedo mostrar sus cosas co una variable

    //const {name, valor} = req.body;

    //

    //const errors = [];
    //if(!name){
        //errors.push({text: 'Mete un titulo'});
    //}

    //if(!valor){
       // errors.push({text: 'Da un valor'});
    //}

    //if(errors.length >0){
        //res.render('sensores/newsensor', {
            //errors,
            //name,
            //valor,
        //});

    //}else{

    // crear dato para guardar en bd

    //const newSensor = new Sensor ({name, valor});
    //await newSensor.save();
    //res.redirect('/sensores/tension');
//}

//});

//router.get('/sensores/tension', async (req, res) => {
  //const Tension =  await Sensor.find(); // si pongo name:tension me da todos esos datos
  //res.render('/sensores/tension', {Tension});
//});





// donde se este creado la informacion de los sensores, la gestion de que cada user vea lo suyo
// es esta: newSensor.user = req.user.id; de este modo usamos el id de passport para que solo nos de eso
// cuando quiero listar pongo en el get {user: req.user.id} minuto 3:16:20



