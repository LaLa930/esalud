const express = require('express');
const router = express.Router();
const Sensor = require('../models/pressure');
const {isAuthenticated} = require ('../helpers/auth'); // para ver si esta autenticado o no

// para etrar a la vista de tension
router.get('/sensores/sistolica', isAuthenticated , (req,res)=>{
  res.redirect('/sistolica');
});


router.get('/sistolica', isAuthenticated , async (req,res) => {

    const item = await Sensor.find().lean()
    res.render('sensores/sistolica', {item})

});

module.exports = router;