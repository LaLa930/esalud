
var config = {};
config.debug = process.env.DEBUG || false;
config.mqtt  = {};
config.mqtt.namespace = process.env.MQTT_NAMESPACE || 'eSalud/+';
config.mqtt.hostname  = process.env.MQTT_HOSTNAME  || '152.67.65.124';
config.mqtt.port      = process.env.MQTT_PORT      || 1883;

module.exports = config;