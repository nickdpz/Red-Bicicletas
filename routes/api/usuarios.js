const express = require("express");
const router = express.Router();
const usuariosController = require("../../controllers/api/usuarioControllerAPI");

router.get("/", usuariosController.usuarios_list);
router.post("/create", usuariosController.usuarios_create);
router.post("/reservar", usuariosController.usuario_reservar);

module.exports = router;
