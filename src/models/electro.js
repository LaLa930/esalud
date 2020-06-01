const mongoose = require('mongoose');
const { Schema } = mongoose;

const SensorSchema = new Schema ({

    name: {type: String, default: "electro"},
    electro: {type: [Number], required: true},
    date: {type: Date, default: Date.now},    
    user: {type:String}
});

module.exports = mongoose.model('electro', SensorSchema);
