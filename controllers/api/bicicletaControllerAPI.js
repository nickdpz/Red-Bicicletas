const Bicicleta = require('../../models/bicicleta');

exports.bicicleta_list = (req, res) => {
    res.status(200).json({
        bicicletas: Bicicleta.allBicis
    });

}

exports.bicicleta_create = (req, res) => {
    const bici = new Bicicleta(parseInt(req.body.id,10), req.body.color, req.body.modelo);
    bici.ubicacion = [parseFloat(req.body.lat), parseFloat(req.body.lng)];

    Bicicleta.add(bici);

    res.status(200).json({
        bicicleta: bici
    });
}

exports.bicicleta_delete = (req, res) => {
    Bicicleta.removeById(parseInt(req.body.id,10));
    res.status(204).send({
        message: "ok"
    });
}

exports.bicicleta_update = (req, res) => {
    let bici = Bicicleta.findById(parseInt(req.params.id,10))
    bici.color = req.body.color;
    bici.modelo = req.body.modelo;
    bici.ubicacion = [req.body.lat, req.body.lng];
    res.status(200).send({
        message: "ok"
    });
}