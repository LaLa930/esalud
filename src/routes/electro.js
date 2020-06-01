// solo urls de mi servidor para el usuario manejando sus datos

const express = require('express');
const router = express.Router();
const Sensor = require('../models/Sensor');
const {isAuthenticated} = require ('../helpers/auth'); // para ver si esta autenticado o no

// para entrar a la vista de electrocardiograma
router.get('/sensores/electro', isAuthenticated , (req,res)=>{
  res.redirect('/electro');
});


router.get('/electro', isAuthenticated , async (req,res) => {
  await Sensor.find({name:'corazon' }) // aqui puedo especificar si quiero que busque por ejemplo el nombre tension EL {user: req.user.id} ES PARA QUE CADA USER TENGA LO SUYO
    .then(sensors => {     // , user: req.user.id
      const context = {
        sensores: sensors.map(sensor => {
          return {
            name: sensor.name,
            valor: sensor.valor,
            date: sensor.date
          }
        })
      }
      res.render('sensores/electro', {sensores: context.sensores})
    })
});


module.exports = router;