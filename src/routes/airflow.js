// solo urls de mi servidor para el usuario manejando sus datos

const express = require('express');
const moment = require('moment');
const router = express.Router();
const Sensor = require('../models/airflow');
const {isAuthenticated} = require ('../helpers/auth'); // para ver si esta autenticado o no


router.get('/sensores/airflow', isAuthenticated , (req,res)=>{
    res.redirect('/airflow');
});


router.get('/airflow', isAuthenticated , async (req,res) => {
    const packs = await Sensor.find().sort('date').lean();
    let points = [];

    for (let pack of packs) {
        // Descartamos los packs que traen solo 0, intentando acelerar un poco.
        if (pack.airflow.reduce((a, b) => a + b, 0) != 0) {
            var d = moment(pack.date);
            // La frecuencia de muestreo de este sensor son 100 ms y tenemos 100 medidas.
            d.subtract(9900, 'ms');
            for (let point of pack.airflow) {
                points.push({date: moment(d), value: point});
                d.add(100, 'ms');
            }
        }
    }

    res.render('sensores/airflow', {points});
});


module.exports = router;