var mongoose = require("mongoose");
var Schema = mongoose.Schema

var usuario = new Schema ({
    nombre: String,
    apellido: String,
    correo: String,
    password: String
},
{
 versionKey: false
},
{
 timestamps: true
});
module.exports = mongoose.model("Usuarios", usuario);