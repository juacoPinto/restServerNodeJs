const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async (req, res, next) => {
	const token = req.header("x-token");
	if (!token) {
		return res.status(401).json("no hay token en la peticion");
	}

	try {
		const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
		//leer el usuario que corresponde al uid

		const usuario = await Usuario.findById(uid);
		//Verificar por si el usuario no existe
		if (!usuario) {
			return res.status(500).json("El usuario no se encontro");
		}
		//Verfificar el estado del usuario encontrado
		if (!usuario.estado) {
			return res
				.status(401)
				.json("Usuario sin los permisos para realizar esta accion");
		}
		req.usuario = usuario;
		next();
	} catch (error) {
		res.status(401).json("Token no valido");
	}
};

module.exports = {
	validarJWT,
};
