const express = require('express');
const router = express.Router();
const {isAuthenticated} = require ('../helpers/auth'); // Para ver si esta autenticado o no

// Inicio de sesion con todos los sensores en el formato All sensor

router.get('/sensores/Allsensor', isAuthenticated , (req,res)=>{
  res.render('sensores/Allsensor')
});


module.exports = router;