const Usuario = require('../../models/usuario');


exports.usuarios_list = (req, res) => {
    Usuario.find({}, (err, usuarios) => {
        res.status(200).json({
            usuarios: usuarios
        });
    });
}

exports.usuarios_create = (req, res) => {

    const usuario = new Usuario({ nombre: req.body.nombre, email: req.body.email, password: req.body.password });
    usuario.save((err) => {
        res.status(200).json(usuario);
    });
}

exports.usuarios_reserva = async()=>{
    const reserva = await Usuario.reserva(req.params.id);
    res.status(200).send(reserva);
}

exports.usuario_reservar = async(req, res) => {
    const user = await Usuario.findById(req.body.id)
    console.log(user);
    user.reservar(req.body.bici_id, req.body.desde, req.body.hasta, (err) => {
        res.status(200).send({message:"ok"});
    });
}