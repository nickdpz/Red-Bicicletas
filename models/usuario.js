const mongoose = require('mongoose');
const Reserva = require('./reserva');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombre: String,
});

usuarioSchema.methods.reservar = function (biciId, desde, hasta, cb) {
    const reserva = new Reserva({ usuario: this._id, bicicleta: biciId, desde: desde, hasta: hasta });
    reserva.save(cb);
}

usuarioSchema.methods.reserva = function (userId) {
    return new Promise(async (resolve, reject) => {
        const reservas = await Reserva.find({});
        resolve(reservas);
        // Reserva.find({})
        //     .populate('bicicleta')
        //     .populate('usuario')
        //     .exec((err, reservas) => {
        //         resolve(reservas);
        //     })
        //     .catch((e)=>{
        //         reject(e)
        //     })
    })
}

module.exports = mongoose.model('Usuario', usuarioSchema);