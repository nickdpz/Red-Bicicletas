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

usuarioSchema.statics.reserva = function (userId) {
    return new Promise(async (resolve, reject) => {
        Reserva.find({ usuario: userId })
            .populate('bicicleta')
            .populate('usuario')
            .exec((err, reservas) => {
                if (err) {
                    reject(e)
                }
                resolve(reservas);
            })
    })
}

module.exports = mongoose.model('Usuario', usuarioSchema);