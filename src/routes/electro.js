const express = require('express');
const moment = require('moment');
const router = express.Router();
const Sensor = require('../models/electro');
const {isAuthenticated} = require ('../helpers/auth'); // Para ver si esta autenticado o no

// Para entrar a la vista de electrocardiograma
router.get('/sensores/electro', isAuthenticated , (req,res)=>{
  res.redirect('/electro');
});


router.get('/electro', isAuthenticated , async (req,res) => {
    const packs = await Sensor.find().sort('date').lean();
    let points = [];

    for (let pack of packs) {
        // Descartamos los packs que traen solo 0, intentando acelerar un poco.
        if (pack.electro.reduce((a, b) => a + b, 0) != 0) {
            var d = moment(pack.date);
            // La frecuencia de muestreo de este sensor es 1 ms y tenemos 100 medidas.
            d.subtract(99, 'ms');
            for (let point of pack.electro) {
                points.push({date: moment(d), value: point});
                d.add(1, 'ms');
            }
        }
    }

    res.render('sensores/electro', {points});
});


module.exports = router;
