const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth.contoller");
const { validarCorreo } = require("../helpers/db-validators");
const validarCampos = require("../middlewares/validar-campos");

const router = Router();

router.post(
	"/login",
	[
		check("correo", "El correo no es valido").isEmail(),
		check("password", "La contraseña es necesaria").isLength({ min: 6 }),
		validarCampos,
	],
	login
);

module.exports = router;
