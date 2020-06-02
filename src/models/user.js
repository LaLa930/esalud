
// me creo mi esquema de usuario que guardo en la bd

const moongose = require('mongoose')
const {Schema} = moongose;
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    name: {type: String, required:true},
    email:{type: String, required:true},
    password:{type: String, required:true},
    number:{type: Number, required:true},
    date:{type: Date, default: Date.now}
});

//cifrado de contraseña
UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password,salt);
    return hash;
};

//comparar el login de usuario con mi cifrazo de la BD
UserSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password, this.password);
};


module.exports = moongose.model('User',UserSchema);

