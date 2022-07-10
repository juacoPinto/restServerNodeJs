const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const usuariosGet = async (req, res) => {
	const { limite = 5, desde = 0 } = req.query;
	const queryEstadoUsuario = { estado: true };
	/* const usuarios = await Usuario.find(queryEstadoUsuario)
		.skip(Number(desde))
		.limit(Number(limite));

	const total = await Usuario.countDocuments(queryEstadoUsuario); */
	const [total, usuarios] = await Promise.all([
		Usuario.countDocuments(queryEstadoUsuario),
		Usuario.find(queryEstadoUsuario).skip(desde).limit(limite),
	]);

	res.status(200).json({ total, usuarios });
};
const usuariosPut = async (req, res) => {
	const { id } = req.params;
	const { password, google, ...resto } = req.body;
	//Validar contra base de datos
	if (password) {
		const salt = bcryptjs.genSaltSync();
		resto.password = bcryptjs.hashSync(password, salt);
	}
	const usuario = await Usuario.findByIdAndUpdate(id, resto);

	res.status(200).json(`ruta del PUT - ademas el param id: ${id}`);
};
const usuariosPost = async (req, res) => {
	const { nombre, correo, password, rol } = req.body;
	const usuario = new Usuario({ nombre, correo, password, rol });
	//Verificar si el correo existe,lo hice en los helpers, para ingresarlo a traves de un custom check en las rutas
	//Encriptar la contraseña
	const salt = bcryptjs.genSaltSync();
	usuario.password = bcryptjs.hashSync(password, salt);
	//Guardar en Base de Datos
	await usuario.save();
	res.status(200).json(usuario);
};
const usuariosDelete = async (req, res) => {
	const { id } = req.params;
	//Borrar fisicamente
	//const usuario = await Usuario.findByIdAndDelete(id);
	const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
	res.status(200).json(usuario);
};

module.exports = {
	usuariosGet,
	usuariosPut,
	usuariosPost,
	usuariosDelete,
};
