const Usuario = require("../models/usuario");
const Categoria = require("../models/categoria");
const Producto = require("../models/producto");
const categoria = require("../models/categoria");
const { ObjectId } = require("mongoose").Types;
const coleccionesPermitidas = ["usuarios", "categoria", "productos", "roles"];

const buscarUsuarios = async (termino = "", res) => {
	//primero busqueda por id
	const esMongoId = ObjectId.isValid(termino); //Regresa un Boolean, recibiendo elid en el params de termino
	if (esMongoId) {
		const usuario = await Usuario.findById(termino);
		return res.json({
			resultados: usuario ? [usuario] : [],
		});
	}
	//luego busqueda por nombre
	const regex = RegExp(termino, "i");
	const usuario = await Usuario.find({
		$or: [{ nombre: regex }, { correo: regex }],
		$and: [{ estado: true }],
	});

	res.json({
		resultados: usuario,
	});
};

const buscarCategorias = async (termino = "", res) => {
	const esMongoId = ObjectId.isValid(termino);
	if (esMongoId) {
		const categoria = await Categoria.findById(termino);
		return res.json({
			resultados: categoria ? [categoria] : [],
		});
	}
	const regex = RegExp(termino, "i");
	const categoria = await Categoria.find({
		$or: [{ nombre: regex }],
		$and: [{ estado: true }],
	});
	res.json({
		resultados: categoria,
	});
};

const buscarProducto = async (termino = "", res) => {
	//primero por id
	const esMongoId = ObjectId.isValid(termino);
	if (esMongoId) {
		const producto = await Producto.findById(termino);
		return res.json({
			resultados: producto ? [producto] : [],
		});
	}
	//despues por nombre
	const regex = RegExp(termino, "i");
	const producto = await Producto.find({
		$or: [{ nombre: regex }],
		$and: [{ estado: true }],
	});
	res.json({
		resultados: producto,
	});
};

const buscar = (req, res) => {
	const { coleccion, termino } = req.params;
	if (!coleccionesPermitidas.includes(coleccion)) {
		return res.status(400).json({
			msg: `las colecciones permitidas son : ${coleccionesPermitidas}`,
		});
	}
	switch (coleccion) {
		case "usuarios":
			buscarUsuarios(termino, res);
			break;
		case "categoria":
			buscarCategorias(termino, res);
			break;
		case "productos":
			buscarProducto(termino, res);
			break;

		default:
			res.status(500).json({ mensaje: "se me olvido hacer esta busqueda" });
	}
};

module.exports = {
	buscar,
};
