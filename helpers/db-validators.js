const Categoria = require("../models/categoria");
const producto = require("../models/producto");
const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRolValido = async (rol = "") => {
	const roleValidator = await Role.findOne({ rol });
	if (!roleValidator) {
		throw new Error(`el rol ${rol}, no se encuentra en la base de datos`);
	}
};

const validarCorreo = async (correo = "") => {
	const existeEmail = await Usuario.findOne({ correo });
	if (existeEmail) {
		throw new Error(`el correo ingresado ya existe`);
	}
};

const existeUsuarioPorId = async (id) => {
	const usuarioId = await Usuario.findById(id);
	if (!usuarioId) {
		throw new Error("El id ingresado no se encuentra registrado");
	}
};

const validarId = async (id) => {
	const categoriaID = await Categoria.findById(id);
	if (!categoriaID) {
		throw new Error(`el id : ${id}, no existe`);
	}
};

const existeProductoPorId = async (id) => {
	const productoId = await producto.findById(id);
	if (!productoId) {
		throw new Error(`El id ${id}, no se encuentra registrado`);
	}
};

module.exports = {
	esRolValido,
	validarCorreo,
	existeUsuarioPorId,
	validarId,
	existeProductoPorId,
};
