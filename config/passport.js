const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook-token");
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

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.URL+"/auth/google/callback"
        }, (accessToken, refreshToken, profile, cb) => {
            console.log(profile);
            Usuario.findOneOrCreateByGoogle(profile, (err, user) => {
                return cb(err, user);
            });
        }
    )
);

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET
}, (accessToken, refreshToken, profile, done) => {
    try {
        Usuario.findOneOrCreateByFacebook(profile, (err, user) => {
            if (err) console.log('err' + err);
            return done(err, user);
        });
    }
    catch (err2) {
        console.log(err2);
        return done(err2, null);
    }
}
));



passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await Usuario.findById(id);
    done(null, user);
});

module.exports = passport;