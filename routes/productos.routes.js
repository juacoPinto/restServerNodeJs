const { check } = require("express-validator");
const { Router } = require("express");
const {
	productosGet,
	productosGetPorId,
	crearProducto,
	actualizarProducto,
	eliminarProducto,
} = require("../controllers/productos.controller");
const { validarJWT } = require("../middlewares/validar-jwt");
const validarCampos = require("../middlewares/validar-campos");
const {
	existeProductoPorId,
	validarId,
	esRolValido,
} = require("../helpers/db-validators");
const router = Router();

router.get("/", productosGet);
router.get(
	"/:id",
	[
		check("id", "id no valido").isMongoId(),
		check("id", "No esta registrado").custom(existeProductoPorId),
		validarJWT,
		validarCampos,
	],
	validarJWT,
	productosGetPorId
);
router.post(
	"/",
	[
		check("nombre", "el nombre es necesario").not().isEmpty(),
		check("categoria").custom(validarId),
		check("categoria", "no es un momngo  id").isMongoId(),
		validarJWT,
		validarCampos,
	],
	crearProducto
);
router.put(
	"/:id",
	[
		validarJWT,
		check("categoria", "no es un id de mongo").isMongoId(),
		check("id").custom(existeProductoPorId),
		validarCampos,
	],
	actualizarProducto
);
router.delete(
	"/:id",
	[
		validarJWT,
		esRolValido,
		check("id", "No es un id de mongo valido").isMongoId(),
		check("id").custom(existeProductoPorId),
		validarCampos,
	],
	eliminarProducto
);

module.exports = router;
