
const express = require('express');
const router = express.Router();
const Sensor = require('../models/spo2');
const {isAuthenticated} = require ('../helpers/auth'); // para ver si esta autenticado o no


router.get('/sensores/spoo', isAuthenticated , (req,res)=>{
  res.redirect('/spoo');
});


router.get('/spoo', isAuthenticated , async (req,res) => {

    const item = await Sensor.find().lean()
    res.render('sensores/spoo', {item})

});

module.exports = router;



