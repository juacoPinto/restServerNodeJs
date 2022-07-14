const { Router } = require("express");
const { buscar } = require("../controllers/buscar.contoller");

const router = Router();

router.get("/:coleccion/:termino", buscar);

module.exports = router;
