const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const generarJWT = require("../helpers/generar-jwt");

const login = async (req, res) => {
	const { correo, password } = req.body;

	try {
		//Verificar si el email existe
		const usuario = await Usuario.findOne({ correo });
		if (!usuario) {
			return res.status(400).json("El correo no se encuentra registrado");
		}
		//Si el usuario esta activo
		if (usuario.estado === false) {
			return res.status(400).json("el usuario no se encuentra activo");
		}
		//Verificar la contraseña
		const validPassword = bcryptjs.compareSync(password, usuario.password);
		if (!validPassword) {
			return res.status(400).json("La contrsaeña no es valida");
		}
		//Generar el JWT
		const token = await generarJWT(usuario.id);

		res.status(200).json({ usuario, token });
	} catch (error) {
		res.status(500).json(error);
	}
};
module.exports = {
	login,
};
