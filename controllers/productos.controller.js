const Producto = require("../models/producto");
const Categoria = require("../models/categoria");

const productosGet = async (req, res) => {
	const { limite = 5, desde = 0 } = req.query;
	const queryEstadoProducto = { estado: true };

	const [total, productos] = await Promise.all([
		Producto.countDocuments(queryEstadoProducto),
		Producto.find(queryEstadoProducto)
			.populate("usuario", "nombre")
			.populate("categoria", "nombre")
			.skip(Number(desde))
			.limit(Number(limite)),
	]);
	res.status(200).json({ total, productos });
};

const productosGetPorId = async (id) => {
	try {
		const { id } = req.params;
		const producto = await Producto.findById(id);
		res.status(200).json(producto);
	} catch (error) {
		res.status(401).json("producto no encontrado");
	}
};

const crearProducto = async (req, res) => {
	const { estado, usuario, ...body } = req.body;
	const productoDB = await Producto.findOne({ nombre: body.nombre });
	if (productoDB) {
		res.status(400).json("Este producto ya esta registrado");
	}
	const data = {
		...body,
		nombre: body.nombre,
		usuario: req.usuario._id,
	};
	const producto = new Producto(data);

	await producto.save();

	res.status(200).json({ producto });
};

const actualizarProducto = async (req, res) => {
	const { id } = req.params;
	const { estado, usuario, ...data } = req.body;
	if (data.nombre) {
		data.nombre = data.nombre.toUppercase();
	}

	const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

	if (!producto) {
		return res.status(401).json("este producto no existe");
	} else {
		res.status(200).json(producto);
	}
};

const eliminarProducto = async (req, res) => {
	const { id } = req.params;
	const productoParaEliminar = await Producto.findByIdAndUpdate(id, {
		estado: false,
	});

	res.status(200).json(productoParaEliminar);
};

module.exports = {
	productosGet,
	productosGetPorId,
	crearProducto,
	actualizarProducto,
	eliminarProducto,
};
