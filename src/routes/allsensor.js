// solo urls de mi servidor para el usuario manejando sus datos

const express = require('express');
const router = express.Router();
const Sensor = require('../models/Sensor');
const {isAuthenticated} = require ('../helpers/auth'); // para ver si esta autenticado o no

// inicio de sesion con todos los sensores en el formato All sensor

router.get('/sensores/Allsensor', isAuthenticated , (req,res)=>{
  res.render('sensores/Allsensor')
});


module.exports = router;