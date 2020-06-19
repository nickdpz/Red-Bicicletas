const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../../models/usuario");

module.exports = {
    authenticate: (req, res, next) => {
        const { email, password } = req.body;
        Usuario.findOne({ email })
            .then((userInfo) => {
                if (userInfo === null) { return res.status(401).json({ status: "error", message: "Usuario inválido", data: null }); }

                if (userInfo !== null && bcrypt.compareSync(password, userInfo.password)) {

                    const token = jwt.sign({ id: userInfo._id }, req.app.get("secretKey"), { expiresIn: "7d" });

                    res.status(200).json({
                        message: "Usuario encontrado",
                        data: { usuario: userInfo, token: token },
                    });

                } else {

                    res.status(401).json({
                        status: "error",
                        message: "Usuario o password inválido",
                        data: null,
                    });

                }
            }).catch((err) => {
                next(err);
            })
    },

    forgotPassword: (req, res, next) => {
        const { email } = req.body;

        Usuario.findOne({ email }, function (err, userInfo) {
            if (!userInfo)
                return res.status(401).json({ message: "No existe el usuario", data: null });

            userInfo.resetPassword(function (err) {
                if (err) return next(err);

                res.status(200).json({
                    message: `Se envió un mensaje a ${email} para reestablecer la contraseña`,
                    data: null,
                });

            });
        });
    },
};