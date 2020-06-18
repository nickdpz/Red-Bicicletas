const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../models/usuario');

passport.use(
    new LocalStrategy((email, password, done) => {
        Usuario.findOne({ email })
            .then((usuario) => {
                if (!usuario)
                    return done(null, false, { message: "El correo es incorrecto" });
                if (!usuario.validPassword(password))
                    return done(null, false, { message: "La contraseña es incorrecta" });
                return done(null, usuario);
            })
            .catch((e) => {
                return done(err);
            })
    })
);

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    Usuario.findById(id)
        .then((err, usuario) => {
            cb(usuario);
        })
        .catch((err) => {
            cb(err);
        })
});

module.exports = passport;