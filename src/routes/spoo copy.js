
const express = require('express');
const router = express.Router();
const Sensor = require('../models/Sensor');
const {isAuthenticated} = require ('../helpers/auth'); // Autentificacion

// Direccionar vista spo2
router.get('/sensores/spoo', isAuthenticated , (req,res)=>{
  res.redirect('/spoo');
});

router.get('/spoo', isAuthenticated , async (req,res) => {
  await Sensor.find({name:'pulsO'}) 
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
      res.render('sensores/spoo', {sensores: context.sensores})
    })

});

module.exports = router;