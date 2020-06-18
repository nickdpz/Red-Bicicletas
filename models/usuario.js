const mongoose = require('mongoose');
const Reserva = require('./reserva');
const crypto = require("crypto");
const Token = require("./token");
const bcrypt = require('bcrypt');
const mailer = require('../mailer');
const saltRounds = 10;
const Schema = mongoose.Schema;

const validateEmail = function (email) {
    const re = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return re.test(email);
}

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'El email es obligatorio'],
        lowercase: true,
        validate: [validateEmail, 'Por favor ingresar un email válido'],
        match: [/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verificado: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next();
});

usuarioSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

usuarioSchema.methods.reservar = function (biciId, desde, hasta, cb) {
    const reserva = new Reserva({ usuario: this._id, bicicleta: biciId, desde: desde, hasta: hasta });
    reserva.save(cb);
}

usuarioSchema.statics.reserva = (userId) => {
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

usuarioSchema.methods.enviar_email_bienvenida = function (cb) {
    const token = new Token({
        _userId: this.id,
        token: crypto.randomBytes(16).toString("hex"),
    });
    const email_destination = this.email;
    token.save(function (err) {
        if (err) return console.log(err.message);

        const mailOptions = {
            from: "noreply@redbicicletas.com",
            to: email_destination,
            subject: "Verificación de cuenta",
            text: `Por favor, verifica tu cuenta haciendo clic en el siguiente link \n http://localhost:3000/token/confirmation/${token.token}`,
        };

        mailer.sendMail(mailOptions, function (err) {
            if (err) return console.log(err.message);
            console.log(`Correo de verificación enviado a: ${email_destination}`);
        });
    });
};
usuarioSchema.methods.resetPassword = function (cb) {
    const token = new Token({
        _userId: this.id,
        token: crypto.randomBytes(16).toString("hex"),
    });
    const email_destination = this.email;
    token.save(function (err) {
        if (err) return cb(err);

        const mailOptions = {
            from: "noreply@redbicicletas.com",
            to: email_destination,
            subject: "Reseteo de contraseña",
            text: `Para resetear su constraseña haz clic en el siguiente link \n
        http://localhost:3000/resetPassword/${token.token}`,
        };

        mailer.sendMail(mailOptions, function (err) {
            if (err) return cb(err);
            console.log(
                `Correo de reseteo de contraseña enviado a: ${email_destination}`
            );
        });
        cb(null);
    });
};

module.exports = mongoose.model('Usuario', usuarioSchema);