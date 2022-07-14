const esAdminRole = (req, res, next) => {
	if (!req.usuario) {
		return res.status(500).json("no se puede realizar esta accion son su rol");
	}
	const { rol, nombre } = req.usuario;

	if (rol !== "ADMIN_ROLE") {
		return res.status(401).json({
			msg: `el usuario ${nombre}, no tiene los permisos para esta accion`,
		});
	} else {
		next();
	}
};

const tieneRole = (...roles) => {
	return (req, res, next) => {
		//console.log(roles, req.usuario.rol);
		if (!req.usuario) {
			return res
				.status(500)
				.json("Se quiere verificar el role sin validar el token primero");
		}
		if (!roles.includes(req.usuario.rol)) {
			return res
				.status(401)
				.json({ msg: `Se requiere uno de stos roles ${roles}` });
		} else {
			next();
		}
	};
};

module.exports = {
	esAdminRole,
	tieneRole,
};
