
const express = require('express');
const router = express.Router();
const Sensor = require('../models/spo2');
const {isAuthenticated} = require ('../helpers/auth'); // Para ver si esta autenticado o no

// Para direccionar la vista
router.get('/sensores/spoo', isAuthenticated , (req,res)=>{
  res.redirect('/spoo');
});

// Para cargar el .hbs y enviar los datos que alli se usan en gráficas
router.get('/spoo', isAuthenticated , async (req,res) => {

    const item = await Sensor.find().lean()
    res.render('sensores/spoo', {item})

});

module.exports = router;



