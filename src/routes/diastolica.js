
const express = require('express');
const router = express.Router();
const Sensor = require('../models/pressure');
const {isAuthenticated} = require ('../helpers/auth'); //Para ver si esta autenticado o no


router.get('/sensores/diastolica', isAuthenticated , (req,res)=>{
  res.redirect('/diastolica');
});


router.get('/diastolica', isAuthenticated , async (req,res) => {

    const item = await Sensor.find().lean()
    res.render('sensores/diastolica', {item})

});

module.exports = router;