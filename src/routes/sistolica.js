
const express = require('express');
const router = express.Router();
const Sensor = require('../models/Sensor');
const {isAuthenticated} = require ('../helpers/auth'); // para ver si esta autenticado o no

// para etrar a la vista de sistolica
router.get('/sensores/sistolica', isAuthenticated , (req,res)=>{
  res.redirect('/sistolica');
});


router.get('/sistolica', isAuthenticated , async (req,res) => {
  await Sensor.find({name:'sistolica'}) // aqui puedo especificar si quiero que busque por ejemplo el nombre tension EL {user: req.user.id} ES PARA QUE CADA USER TENGA LO SUYO
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
      res.render('sensores/sistolica', {sensores: context.sensores})
    })

});
module.exports = router;