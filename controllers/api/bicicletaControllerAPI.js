const Bicicleta = require('../../models/bicicleta');

exports.bicicleta_list =  (req, res) =>{
    Bicicleta.find({},  (err, bicicletas)=> {
        res.status(200).json(bicicletas);
    });
}

exports.bicicleta_create =  (req, res) =>{
    let bici = new Bicicleta({ code: req.body.code, color: req.body.color, modelo: req.body.modelo });
    bici.ubicacion = [req.body.lat, req.body.lng];
    Bicicleta.add(bici)
        .then((newBike)=>{
            res.status(201).json(newBike);
        })
        .catch(()=>{
            res.status(400).json(e);
        })
}

exports.bicicleta_update =  (req, res) =>{
    let aBici = { code: req.body.code, color: req.body.color, modelo: req.body.modelo, ubicacion: [req.body.lat, req.body.lng] };
    Bicicleta.updateBici(aBici)
        .then((updateBici) => {
            res.status(200).json({
                bicicleta: updateBici
            })
        }).catch(e=>{
            res.status(401).json({
                error: e
            })
        })
}

exports.bicicleta_delete =  (req, res) =>{
    Bicicleta.removeByCode(req.body.code, (err, raw) => {

        res.status(204).send();

    });

}