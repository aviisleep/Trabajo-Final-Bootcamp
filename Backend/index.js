const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");


//Configuraciones
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//Mongoose
mongoose
  .connect(process.env.STRING_CONEXION)
  .then( (db) => {
    console.log("Conectado a la base de datos");
  })
  .catch( (err) => {
    console.log(err);
  });


//Modelos
const User = require ("./models/usuarios");

//Rutas

app.get("/usuarios", async (req,res) => {
  const u = await User.find();
  res.status(200).send(u);
});

//Register
app.post("/registro", async (req,res) => {
  const {nombre, apellido, correo, password} = req.body;
  const u = {
    nombre: nombre,
    apellido: apellido,
    correo: correo,
    password: password
  };
  const usuario = new User(u);
  await usuario.save();
  const token = jwt.sign({_id: usuario._id}, 'secretKey');
  res.status(200).json({token});
});

//Login
app.post("/login", async (req,res) => {
  const { correo, password } = req.body;
  const user = await User.findOne({correo});
  if(!user) return res.status(401).send("Este correo no existe");
  if(user.password !== password) return res.status(401).send("Contraseña incorrecta");

  const token = jwt.sign({_id: user._id}, 'secretKey');
  return res.status(200).json({token});
});

async function verifyToken(req, res, next) {
	try {
		if (!req.headers.authorization) {
			return res.status(401).send('Unauhtorized Request');
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).send('Unauhtorized Request');
		}

		const payload = await jwt.verify(token, 'secretKey');
		if (!payload) {
			return res.status(401).send('Unauhtorized Request');
		}
		req.userId = payload._id;
		next();
	} catch(e) {
		return res.status(401).send('Unauhtorized Request');
	}
}

//Listen
app.listen(3000,  () => {
  console.log("Servidor Iniciado");
});