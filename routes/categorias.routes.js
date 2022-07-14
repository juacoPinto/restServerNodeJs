const { Router } = require("express");
const { check } = require("express-validator");
const {
	categoriasGet,
	getCategoriaPorId,
	crearCategoria,
	actualizarCategoria,
	borrarCategoria,
} = require("../controllers/categorias.controller");
const { validarId, esRolValido } = require("../helpers/db-validators");
const validarCampos = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();
//Obtener todas las categorias - Publico
router.get("/", categoriasGet);

//Obtener una categoria por id - Publico
router.get(
	"/:id",
	[check("id", "EL id no es valido").isMongoId(), validarCampos],
	check("id", "Probar con otro ID").custom(validarId),
	validarCampos,
	getCategoriaPorId
);

//Crear una nueva categoria - Privado - cualquier persona con un token valido
router.post(
	"/",
	[
		check("nombre", "el nombre es requerido").not().isEmpty(),
		validarJWT,
		validarCampos,
	],
	crearCategoria
);
//Actualizar un registro por un id - Privado - cualquiera con token valido
router.put(
	"/:id",
	[
		check("nombre", "el nombre es requerido").not().isEmpty(),
		check("id", "id no valido").custom(validarId),
		validarJWT,
		validarCampos,
	],
	actualizarCategoria
);
//Delete una categoria (cambiar el estado a false) - Privado - Solo Admin
router.delete(
	"/:id",
	[
		check("id", "id no es valido").custom(validarId),
		validarJWT,
		esRolValido,
		validarCampos,
	],
	borrarCategoria
);

module.exports = router;
