require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("../routes/user.routes");

class Server {
	constructor() {
		this.app = express();

		this.port = process.env.PORT;
		//definicion de rutas
		this.usuariosPath = "/api/usuarios";
		//middlewares
		this.middlewares();
		//rutas de la aplicacion
		this.routes();
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
