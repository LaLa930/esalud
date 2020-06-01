// solo urls de mi servidor para el usuario manejando sus datos

const express = require('express');
const router = express.Router();
const Sensor = require('../models/airflow');
const {isAuthenticated} = require ('../helpers/auth'); // para ver si esta autenticado o no


router.get('/sensores/airflow', isAuthenticated , (req,res)=>{
  res.redirect('/airflow');
});


router.get('/airflow', isAuthenticated , async (req,res) => {
  const item = await Sensor.find().lean();
  res.render('sensores/airflow', {item});

});


module.exports = router;