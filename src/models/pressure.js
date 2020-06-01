const mongoose = require('mongoose');
const { Schema } = mongoose;

const SensorSchema = new Schema ({

    name: {type: String, default: "pressure"},
    pulse: {type: Number, required: true},
    systolic: {type: Number, required: true},
    diastolic: {type: Number, required: true},
    date: {type: Date, default: Date.now},    
    user: {type:String}
 
    
});

module.exports = mongoose.model('pressure', SensorSchema);
