const Categoria = require("../models/categoria");
//Obtener todas las categorias - Publico - paginado - populate
const categoriasGet = async (req, res) => {
	const { limite = 2, desde = 0 } = req.query;
	const queryEstadoCategoria = { estado: true };

	const [total, categorias] = await Promise.all([
		Categoria.countDocuments(queryEstadoCategoria),
		Categoria.find(queryEstadoCategoria)
			.populate("usuario", "nombre")
			.skip(Number(desde))
			.limit(Number(limite)),
	]);

	res.status(200).json({ total, categorias });
};
//Obtener categoria - populate{}
const getCategoriaPorId = async (req, res) => {
	try {
		const { id } = req.params;
		const categoria = await Categoria.findById(id).populate(
			"usuario",
			"nombre"
		);
		res.status(200).json(categoria);
	} catch (error) {
		res.status(500).json("La categoria no existe");
	}
};

const crearCategoria = async (req, res) => {
	const { nombre } = req.body;
	const categoriaDB = await Categoria.findOne({ nombre });

	if (categoriaDB) {
		return res
			.status(400)
			.json({ mensaje: `la categoria ${categoriaDB.nombre},ya existe` });
	}
	//Generar la data a guardar
	const data = {
		nombre,
		usuario: req.usuario._id,
	};
	const categoria = new Categoria(data);
	//Guardar en DB
	await categoria.save();

	res.status(201).json(categoria);
};

//Actualizar, cambiando el nombre de la categoria por otro

const actualizarCategoria = async (req, res) => {
	try {
		const { id } = req.params;
		const { nombre } = req.body;
		const categoria = await Categoria.findByIdAndUpdate(id, {
			nombre: nombre,
		});
		res.status(200).json(categoria);
	} catch (error) {
		res.status(401).json("no se pudo actualizar");
	}
};

//Borrrar cambiando el estado a false

const borrarCategoria = async (req, res) => {
	try {
		const { id } = req.params;
		const categoria = await Categoria.findByIdAndUpdate(id, { estado: false });

		res.status(200).json(categoria);
	} catch (error) {
		res.status(500).json("no se pudo eliminar la categoria");
	}
};

module.exports = {
	categoriasGet,
	getCategoriaPorId,
	crearCategoria,
	actualizarCategoria,
	borrarCategoria,
};
