
var mqtt     = require('mqtt');
var moment   = require('moment');
var config   = require('./config/config_mqtt');
var mqttUri  = 'mqtt://' + config.mqtt.hostname + ':' + config.mqtt.port;
var client   = mqtt.connect(mqttUri);


require ('dotenv').config(); //Archivo .env donde se configura twillio
const accountSid = process.env.ACCOUNT_SID;  //Conexion twilio
const authToken = process.env.AUTH_TOKEN;
const alerta = require ('twilio')(accountSid, authToken); //Cliente

//Conexión
client.on('connect', function () {
    client.subscribe(config.mqtt.namespace);
});

//Database y modelos de sensores
require ('./database');
const pressureSensor = require('./models/pressure');
const spo2Sensor = require('./models/spo2');
const airflowSensor = require('./models/airflow');
const electroSensor = require('./models/electro');

client.on('message', function (topic, message) {
    const utcNow = moment.utc().toDate();
    topic = topic.split("/")[1]
    console.log(topic);
    message = JSON.parse(message.toString());
    console.log(message);

    var newSensor;
    var isUnknown = false;
    switch (topic) {
        case "pressure":
            newSensor = new pressureSensor({pulse: message.pulse, systolic: message.systolic, diastolic: message.diastolic, user: message.user_id, date: utcNow});

            if(newSensor.pulse >100 || newSensor.pulse<60){
                alerta.messages.create({
                to: process.env.MY_PHONE_NUMBER,  
                body:' Esto es un mensaje enviado desde la plataforma eSalud: Su pulso es de: '+newSensor.pulse+'ppm y se encuentra fuera de los parametros saludables: 60 - 100ppm'
                })
                .then(message => console.log(message.sid));
            }

            if(newSensor.systolic <100 || newSensor.systolic >140){
                alerta.messages.create({
                to: process.env.MY_PHONE_NUMBER,  
                from: '+12058578988', 
                body:' Esto es un mensaje enviado desde la plataforma eSalud: Su presión sistólica es de: '+newSensor.pulse+'mmhg y se encuentra fuera de los parametros saludables: 100 - 140mmhg'
                })
                .then(message => console.log(message.sid));
            }

            if(newSensor.diastolic <60 || newSensor.diastolic >90){
                alerta.messages.create({
                to: process.env.MY_PHONE_NUMBER,  // A quien, en este caso seria al usuario que esta con la sesión iniciada
                from: '+12058578988', // Número de twilio
                body:' Esto es un mensaje enviado desde la plataforma eSalud: Su presión diastólica es de: '+newSensor.pulse+'mmhg y se encuentra fuera de los parametros saludables: 60 - 90mmhg'
                })
                .then(message => console.log(message.sid));
            }

            break;

        case "spo2":
            newSensor = new spo2Sensor({pulse: message.pulse, spo2: message.spo2, user: message.user_id, date: utcNow});

            if(newSensor.pulse >100 || newSensor.pulse<60){
                alerta.messages.create({
                to: process.env.MY_PHONE_NUMBER,  //destinatario
                from: '+12058578988', //número de twilio
                body:' Esto es un mensaje enviado desde la plataforma eSalud: Su pulso es de: '+newSensor.pulse+'ppm y se encuentra fuera de los parametros saludables: 60 - 100ppm'
                })
                .then(message => console.log(message.sid));
            }


            if(newSensor.spo2 <100){
                alerta.messages.create({
                to: process.env.MY_PHONE_NUMBER,  //destinatario
                from: '+12058578988', //número de twilio
                body:' Esto es un mensaje enviado desde la plataforma eSalud: Su nivel de saturación de oxígeno es de: '+newSensor.spo2+'% y se encuentra fuera de los parametros saludables 95 - 99%'
                })
                .then(message => console.log(message.sid));
            }
                
            break;

        case "airflow":
            newSensor = new airflowSensor({airflow: message.airflow, user: message.user_id, date: utcNow});
            break;
            
        case "electro":
                newSensor = new electroSensor({electro: message.electro, user: message.user_id, date: utcNow});
                break;
        default:
            isUnknown = true;
            console.log("Sensor desconocido!");
    }
    if (!isUnknown)
        newSensor.save();


});



