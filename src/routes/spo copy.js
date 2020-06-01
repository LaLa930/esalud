
const express = require('express');
const router = express.Router();
const Sensor = require('../models/Sensor');
const {isAuthenticated} = require ('../helpers/auth'); // Autentificacion

// Direccionar vista spo2
router.get('/sensores/spo', isAuthenticated , (req,res)=>{
  res.redirect('/spo');
});

router.get('/spo', isAuthenticated , async (req,res) => {
  await Sensor.find({name:'pulsOx'}) 
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
      res.render('sensores/spo', {sensores: context.sensores})
    })

});

module.exports = router;
