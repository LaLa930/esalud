
//FALTA CONFIGURAR EL ID DE USUARIO A LA HORA DE CREAR EL newSensor  DE FORMA QUE CADA UNO TENGA SUS PROPIOS DATOS

var mqtt     = require('mqtt');
var moment   = require('moment');
var config   = require('./config/config_mqtt');
var mqttUri  = 'mqtt://' + config.mqtt.hostname + ':' + config.mqtt.port;
var client   = mqtt.connect(mqttUri);


require ('dotenv').config(); // Archivo .env donde se configura twillio
const accountSid = process.env.ACCOUNT_SID;  // Conexion twilio
const authToken = process.env.AUTH_TOKEN;
const alerta = require ('twilio')(accountSid, authToken); // Cliente

//conexion
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
            break;

        case "spo2":
            newSensor = new spo2Sensor({pulse: message.pulse, spo2: message.spo2, user: message.user_id, date: utcNow});

            if(newSensor.pulse >100 || newSensor.pulse<60){
                alerta.messages.create({
                to: process.env.MY_PHONE_NUMBER,  // A quien, en este caso seria al usuario que esta con la sesión iniciada
                from: '+12058578988', // Número de twilio
                body:' Esto es un mensaje enviado desde la plataforma eSalud: Su pulso es de: '+newSensor.pulse+'ppm y se encuentra fuera de los parametros saludables 60-100ppm'
                })
                .then(message => console.log(message.sid));
            }


            if(newSensor.spo2 <95){
                alerta.messages.create({
                to: process.env.MY_PHONE_NUMBER,  // A quien, en este caso seria al usuario que esta con la sesión iniciada
                from: '+12058578988', // Número de twilio
                body:' Esto es un mensaje enviado desde la plataforma eSalud: Su nivel de saturación de oxígeno es de: '+newSensor.spo2+'% y se encuentra fuera de los parametros saludables 95-99%'
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


//    if(topic == "oxigeno" && message<=95){
//        Alerta.messages.create({
//            to: process.env.MY_PHONE_NUMBER,  // A quien, en este caso seria al usuario que esta con la sesión iniciada
//            from: '+12058578988', // Número de twilio
//            body:' Esto es un mensaje enviado desde la plataforma eSalud: Su porcentaje de oxígeno en sangre es del 95% o inferior, esto puede suponer problemas de hipoxemia.'
//        })
//            .then(message => console.log(message.sid));
//    }
//
//    if(topic == "oxigenoPulso" && message<60){
//        Alerta.messages.create({
//            to: process.env.MY_PHONE_NUMBER,  // A quien, en este caso seria al usuario que esta con la sesión iniciada
//            from: '+12058578988', // Número de twilio
//            body:' Esto es un mensaje enviado desde la plataforma eSalud: Su pulso se encuentra por debajo de lo normal, esto puede suponer problemas cardiovasculares como bradicárdia.'
//        })
//            .then(message => console.log(message.sid));
//    }
//
//    if(topic == "oxigenoPulso" && message>100){
//        Alerta.messages.create({
//            to: process.env.MY_PHONE_NUMBER,  // A quien, en este caso seria al usuario que esta con la sesión iniciada
//            from: '+12058578988', // Número de twilio
//            body:' Esto es un mensaje enviado desde la plataforma eSalud: Su pulso se encuentra por encima de lo normal, esto puede suponer problemas cardiovasculares como taquicárdia.'
//        })
//            .then(message => console.log(message.sid));
//    }
//
//
////ALARMA TENSION
//    if(topic == "tension" && message<60){
//        Alerta.messages.create({
//            to: process.env.MY_PHONE_NUMBER,  // A quien, en este caso seria al usuario que esta con la sesión iniciada
//            from: '+12058578988', // Número de twilio
//            body:' Esto es un mensaje enviado desde la plataforma eSalud: Su pulso se encuentra por debajo de lo normal, esto puede suponer problemas cardiovasculares como bradicárdia.'
//        })
//            .then(message => console.log(message.sid));
//    }
//
//    if(topic == "tension" && message>100){
//        Alerta.messages.create({
//            to: process.env.MY_PHONE_NUMBER,  // A quien, en este caso seria al usuario que esta con la sesión iniciada
//            from: '+12058578988', // Número de twilio
//            body:' Esto es un mensaje enviado desde la plataforma eSalud: Su pulso se encuentra por encima de lo normal, esto puede suponer problemas cardiovasculares como taquicárdia.'
//        })
//            .then(message => console.log(message.sid));
//    }
//
//    if(topic == "sistolica" && message>120){
//        Alerta.messages.create({
//            to: process.env.MY_PHONE_NUMBER,  // A quien, en este caso seria al usuario que esta con la sesión iniciada
//            from: '+12058578988', // Número de twilio
//            body:' Esto es un mensaje enviado desde la plataforma eSalud: Su presión arterial esta por encima de lo recomendado, esto puede suponer problemas cardiovasculares, como hipertensión.'
//        })
//            .then(message => console.log(message.sid));
//    }
//
//    if(topic == "diastolica" && message>80){
//        Alerta.messages.create({
//            to: process.env.MY_PHONE_NUMBER,  // A quien, en este caso seria al usuario que esta con la sesión iniciada
//            from: '+12058578988', // Número de twilio
//            body:' Esto es un mensaje enviado desde la plataforma eSalud: Su presión arterial esta por encima de lo recomendado, esto puede suponer problemas cardiovasculares, como hipertensión.'
//        })
//            .then(message => console.log(message.sid));
//    }
//
////ALARMA ELECTROCARDIOGRAMA
//    if(topic == "electro" && message>3.5){
//        Alerta.messages.create({
//            to: process.env.MY_PHONE_NUMBER,  // A quien, en este caso seria al usuario que esta con la sesión iniciada
//            from: '+12058578988', // Número de twilio
//            body:' Esto es un mensaje enviado desde la plataforma eSalud: Su electrocardiograma ha registrado un valor de voltaje que esta por encima de lo recomendado, esto puede suponer problemas del corazón.'
//        })
//            .then(message => console.log(message.sid));
//    }


});



