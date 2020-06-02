const express = require('express');
const router = express.Router();
const Sensor = require('../models/pressure');
const {isAuthenticated} = require ('../helpers/auth'); // Para ver si esta autenticado o no

// Para etrar a la vista de tension
router.get('/sensores/presionT', isAuthenticated , (req,res)=>{
  res.redirect('/presionT');
});


router.get('/presionT', isAuthenticated , async (req,res) => {

    const item = await Sensor.find().lean()
    res.render('sensores/presionT', {item})

});

module.exports = router;




