

const express = require('express');
const router = express.Router();
const Sensor = require('../models/Sensor');
const {isAuthenticated} = require ('../helpers/auth'); // para ver si esta autenticado o no

// para entrar a la vista de tension
router.get('/sensores/diastolica', isAuthenticated , (req,res)=>{
  res.redirect('/diastolica');
});


router.get('/diastolica', isAuthenticated , async (req,res) => {
  await Sensor.find({name:'diastolica'}) // aqui puedo especificar si quiero que busque por ejemplo el nombre tension EL {user: req.user.id} ES PARA QUE CADA USER TENGA LO SUYO
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
      res.render('sensores/diastolica', {sensores: context.sensores})
    })

});
module.exports = router;