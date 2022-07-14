const { Router } = require("express");
const { check } = require("express-validator");
const {
	usuariosGet,
	usuariosPut,
	usuariosPost,
	usuariosDelete,
} = require("../controllers/user.controller");
const {
	esRolValido,
	validarCorreo,
	existeUsuarioPorId,
} = require("../helpers/db-validators");
const validarCampos = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole, tieneRole } = require("../middlewares/validar-roles");

const router = Router();

router.get("/", usuariosGet);

router.put(
	"/:id",
	[
		check("id", "El id no es valido").isMongoId(),
		check("id").custom(existeUsuarioPorId),
		check("rol", "El rol es requerido").custom(esRolValido),
		validarCampos,
	],

	usuariosPut
);

router.post(
	"/",
	[
		//check("correo", "el correo no es valido").isEmail(),
		check("correo", "el correo no es valido").custom(validarCorreo).isEmail(),
		check("nombre", "El nombre es necesario").not().isEmpty(),
		check(
			"password",
			"Password es necesario y minimo de 6 caracteres"
		).isLength({ min: 6 }),
		//check("rol", "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
		check("rol", "El rol es requerido").custom(esRolValido),
		validarCampos,
	],
	usuariosPost
);

router.delete(
	"/:id",
	[
		validarJWT,
		//esAdminRole,
		tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
		check("id", "Id no registrado").isMongoId(),
		check("id").custom(existeUsuarioPorId),
		validarCampos,
	],
	usuariosDelete
);

module.exports = router;
