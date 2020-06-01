
//Conexion con mi BD

const mongoose = require('mongoose');
const uri = "mongodb+srv://Teresa:teresa123@cluster0-t8xrk.gcp.mongodb.net/test?retryWrites=true&w=majority";
var db;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
        .then(bd => console.log("Base de datos conectada"))
        .catch(err => console.error(err))
module.exports = mongoose;