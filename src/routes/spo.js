
const express = require('express');
const router = express.Router();
const Sensor = require('../models/spo2');
const {isAuthenticated} = require ('../helpers/auth'); // Para ver si esta autenticado o no

// Para direccionar la vista
router.get('/sensores/spo', isAuthenticated , (req,res)=>{
  res.redirect('/spo');
});

// Para cargar el .hbs y enviar los datos que alli se usan en gráficas
router.get('/spo', isAuthenticated , async (req,res) => {

    const item = await Sensor.find().lean()
    res.render('sensores/spo', {item})

});

module.exports = router;
