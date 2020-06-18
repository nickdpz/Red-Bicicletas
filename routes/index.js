const express = require('express');
const router = express.Router();
const passport = require('passport');
const Usuario = require('../models/usuario');
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Red de bicicletas' });
});

router.get('/login', (req, res) => {
  res.render('session/login');
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, usuario, info) => {
    if (err) {
      return next(err);
    }
    if (!usuario) return res.render('session/login', { info });
    req.logIn(usuario, function (err) {
      if (err) {
        return next(err)
      };
      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get("/forgotPassword", (req, res) => {
  res.render("session/forgotPassword");
});


router.post("/forgotPassword", (req, res, next) => {
  const { email } = req.body;
  Usuario.findOne({ email })
    .then((usuario) => {
      if (!usuario)
        return res.render("session/forgotPassword", {
          info: { message: "Ese correo no está registrado" },
        });
      usuario.resetPassword((err) => {
        if (err) return next(err);
        console.log("session/forgotPasswordMessage");
      });
      res.render("session/forgotPasswordMessage");
    })
})


router.get("/resetPassword/:token", (req, res, next) => {
  const { token } = req.params;
  Token.findOne({ token })
    .then((token) => {
      if (!token)
        return res
          .status(400)
          .send({ type: "not-verified", msg: "Token inválido." });
      Usuario.findById(token._userId)
        .then((usuario) => {
          if (!usuario)
            return res
              .status(400)
              .send({ type: "not-verified", msg: "Token inválido." });
          res.render("session/resetPassword", { errors: {}, usuario });
        });
    });
});

router.post("/resetPassword", (req, res) => {
  const { email, password, confirm_password } = req.body;
  if (password !== confirm_password) {
    res.render("session/resetPassword", {
      errors: { confirm_password: "No coincide la contraseña" },
      usuario: new Usuario({ email }),
    });
    return;
  }
  Usuario.findOne({ email })
    .then((usuario) => {
      usuario.password = password;
      usuario.save()
        .then(() => {
          res.redirect("/login");
        })
    })
    .catch((err) => {
      res.render("session/resetPassword", {
        errors: err.errors,
        usuario: new Usuario({ email }),
      });
    })
});


module.exports = router;
