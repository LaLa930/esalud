// solo urls de mi servidor para el usuario manejando sus datos

const express = require('express');
const router = express.Router();
const Sensor = require('../models/Sensor');
const {isAuthenticated} = require ('../helpers/auth'); // para ver si esta autenticado o no


router.get('/sensores/airflow', isAuthenticated , (req,res)=>{
  res.redirect('/airflow');
});


router.get('/airflow', isAuthenticated , async (req,res) => {
  await Sensor.find({name:'flujo' }) 
    .then(sensors => {   
      const context = {
        sensores: sensors.map(sensor => {
          return {
            name: sensor.name,
            valor: sensor.valor,
            date: sensor.date
          }
        })
      }
      res.render('sensores/airflow', {sensores: context.sensores})
    })



});


module.exports = router;