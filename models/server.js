require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("../routes/user.routes");
const dbConnection = require("../database/config");

class Server {
	constructor() {
		this.app = express();

		this.port = process.env.PORT;
		//definicion de rutas
		this.usuariosPath = "/api/usuarios";
		//Conectar a Base de Datos
		this.conectarDB();
		//middlewares
		this.middlewares();
		//rutas de la aplicacion
		this.routes();
	}
	async conectarDB() {
		await dbConnection();
	}

	middlewares() {
		//CORS
		this.app.use(cors());
		//Lectura y parseo del body
		this.app.use(express.json());
		//Directorio publico
		this.app.use(express.static("public"));
	}

	routes() {
		this.app.use(this.usuariosPath, userRoutes);
	}
	listen() {
		this.app.listen(this.port, () => {
			console.log(`Aplicacion escuchando en el puerto ${this.port}`);
		});
	}
}

module.exports = Server;
