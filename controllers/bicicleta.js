let Bicicleta = require('../models/bicicleta.js');

exports.bicicleta_list =  (req, res)=>{
    res.render('bicicletas/index', { bicis: Bicicleta.allBicis });

}

exports.bicicleta_create_get =   (req, res) => {
    res.render('bicicletas/create');
}

exports.bicicleta_create_post =   (req, res)=> {
    let bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo)
    bici.ubicacion = [req.body.lat, req.body.lng];
    Bicicleta.add(bici);

    res.redirect('/bicicletas');
}

exports.bicicleta_show_get =   (req, res)=> {
    let bici = Bicicleta.findById(req.params.id)
    res.render('bicicletas/show', { bici:bici });
}

exports.bicicleta_update_get =   (req, res)=> {
    let bici = Bicicleta.findById(req.params.id)
    res.render('bicicletas/update', { bici:bici });
}

exports.bicicleta_update_post =   (req, res) => {
    let bici = Bicicleta.findById(req.params.id)
    bici.id = req.body.id;
    bici.color = req.body.color;
    bici.modelo = req.body.modelo;
    bici.ubicacion = [req.body.lat, req.body.lng];

    res.redirect('/bicicletas');
}

exports.bicicleta_delete_post =   (req, res) => {
    Bicicleta.removeById(req.body.id);

    res.redirect('/bicicletas');
}