let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Red de bicicletas' });
});

router.get('/login', (req, res) => {
  res.render('session/login');
});

router.post('/login', (req, res, next) => {
  //passport
})

router.get('/logout', (req, res) => {

  res.redirect('/');
});

router.get('/forgotPassword', (req, res) => {


})

router.post('/forgotPassword', (req, res) => {

})

module.exports = router;
