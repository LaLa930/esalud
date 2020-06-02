// Creo mi modelo de datos de sensor
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Parámetros
const SensorSchema = new Schema ({

    name: {type: String, default: "spo2"},
    pulse: {type: Number, required: true},
    spo2: {type: Number, required: true},
    date: {type: Date, default: Date.now},    
    user: {type:String}
});

module.exports = mongoose.model('spo2', SensorSchema);
