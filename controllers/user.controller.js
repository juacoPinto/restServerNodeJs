const usuariosGet = (req, res) => {
	const query = req.query;
	res.status(200).json(query);
};
const usuariosPut = (req, res) => {
	const id = req.params.id;
	res.status(200).json(`ruta del PUT - ademas el param id: ${id}`);
};
const usuariosPost = (req, res) => {
	const body = req.body;
	res.status(200).json(body);
};
const usuariosDelete = (req, res) => {
	res.status(200).json("ruta del DELETE");
};

module.exports = {
	usuariosGet,
	usuariosPut,
	usuariosPost,
	usuariosDelete,
};
