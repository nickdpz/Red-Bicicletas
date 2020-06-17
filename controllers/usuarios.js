const Usuario = require("../models/usuario");

module.exports = {
    list: (req, res, next) => {
        Usuario.find({})
            .then((usuarios) => {
                res.render("usuarios/index", { usuarios });
            })
    },

    update_get: (req, res, next) => {
        Usuario.findById(req.params.id)
            .then((usuario) => {
                res.render("usuarios/update", { errors: {}, usuario });
            });
    },

    update: (req, res, next) => {
        const { nombre, email } = req.body;
        const update_values = { nombre };
        Usuario.findByIdAndUpdate(req.params.id, update_values)
            .then((usuario) => {
                res.redirect("/usuarios");
            })
            .catch((err) => {
                res.render("usuarios/update", {
                    errors: err.errors,
                    usuario: new Usuario({ nombre, email })
                })
            })
    },

    create_get: (req, res, next) => {
        res.render("usuarios/create", { errors: {}, usuario: new Usuario() });
    },

    create: (req, res, next) => {
        if (req.body.password !== req.body.confirm_password) {
            res.render("usuarios/create", {
                errors: { confirm_password: { message: "No coincide con el password ingresado" } },
                usuario: new Usuario({ nombre, email }),
            });
            return;
        }
        Usuario.create({ nombre: req.body.nombre, email: req.body.email, password: req.body.password })
            .then((usuario) => {
                usuario.enviar_email_bienvenida();
                res.redirect("/usuarios");
            })
            .catch((err) => {
                console.log("[Error]"+err);
                res.render("usuarios/create", { errors: err.errors });
            })
    },
    delete: (req, res, next) => {
        Usuario.findByIdAndDelete(req.body.id)
            .then(() => {
                res.redirect("/usuarios");
            })
            .catch((err) => {
                next(err);
            })
    },
};