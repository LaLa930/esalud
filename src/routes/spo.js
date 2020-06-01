
const express = require('express');
const router = express.Router();
const Sensor = require('../models/spo2');
const {isAuthenticated} = require ('../helpers/auth'); // para ver si esta autenticado o no

// para etrar a la vista de tension
router.get('/sensores/spo', isAuthenticated , (req,res)=>{
  res.redirect('/spo');
});


router.get('/spo', isAuthenticated , async (req,res) => {

    const item = await Sensor.find().lean()
    res.render('sensores/spo', {item})

});

module.exports = router;
