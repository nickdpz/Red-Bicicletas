const mongoose = require('mongoose');
const Reserva = require('./reserva');
const crypto = require("crypto");
const Token = require("./token");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Schema = mongoose.Schema;


const usuarioSchema = new Schema({
    nombre: {
        type: String,
        trin: true,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        trin: true,
        required: [true, 'El email es obligatorio'],
        lowercase: true,
        validate: [validateEmail, 'Por favor ingresar un email válido'],
        match:  [/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verificado:{
        type: Boolean,
        default: false
    }
});

usuarioSchema.pre('save', (next)=>{
    if(this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next();
});

usuarioSchema.methods.validPassword = (password)=>{
    return bcrypt.compareSync(password,this.password);
}

usuarioSchema.methods.reservar = (biciId, desde, hasta, cb) =>{
    const reserva = new Reserva({ usuario: this._id, bicicleta: biciId, desde: desde, hasta: hasta });
    reserva.save(cb);
}

usuarioSchema.statics.reserva = (userId) =>{
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