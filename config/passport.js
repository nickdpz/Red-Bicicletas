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
            .catch((err) => {
                console.log(err);
                return done(err);
            })
    })
);


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await Usuario.findById(id);
    done(null, user);
});

module.exports = passport;