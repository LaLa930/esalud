
const express = require('express');
const router = express.Router();
const Sensor = require('../models/spo2');
const {isAuthenticated} = require ('../helpers/auth'); // Para ver si esta autenticado o no

router.get('/sensores/spoT', isAuthenticated , (req,res)=>{
  res.redirect('/spoT');
});


router.get('/spoT', isAuthenticated , async (req,res) => {

    const item = await Sensor.find().lean()
    res.render('sensores/spoT', {item})

});

module.exports = router;
