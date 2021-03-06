const express = require("express");
const router = express.Router();
const usuariosController = require("../../controllers/api/usuarioControllerAPI");

router.get("/", usuariosController.usuarios_list);
router.post("/create", usuariosController.usuarios_create);
router.post("/reservar", usuariosController.usuario_reservar);
router.get("/reserva", usuariosController.usuario_reserva);

module.exports = router;