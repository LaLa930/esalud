/**
 *
 * This NodeJS application listens to MQTT messages and records them to MongoDB
 *
 * @author  Dennis de Greef <github@link0.net>
 * @license MIT
 *
 */
var mqtt     = require('mqtt');
var config   = require('./config/config_mqtt');
var mqttUri  = 'mqtt://' + config.mqtt.hostname + ':' + config.mqtt.port;
var client   = mqtt.connect(mqttUri);

client.on('connect', function () {
    client.subscribe(config.mqtt.namespace);
});

require ('./database');
const Sensor = require('./models/Sensor');

client.on('message', function (topic, message) {
    topic = topic.split("/")[1]
    message = Number(message.toString()); // split de valor de 3 
    console.log("Nuevo mensaje de MQTT:")
    console.log(topic);
    console.log(message);

    const newSensor = new Sensor ({name: topic, valor: message});
    newSensor.user = "12345";
    newSensor.save();
});

// FALTA PONER UN ID DEL USUARIO PARA QUE CADA UNO TENGA SUS COSAS

// LA ALARMA TIENE QUE IR AHORA AQUI 