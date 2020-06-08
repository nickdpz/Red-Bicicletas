const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bicicletaSchema = new Schema({
    code: Number,
    color: String,
    modelo: String,
    ubicacion: {
        type: [Number], index: { type: '2dsphere', sparse: true }
    }
});


bicicletaSchema.methods.toString = function () {
    return 'code: ' + this.code + '| color: ' + this.color;
};

bicicletaSchema.statics.createInstance = function (code, color, modelo, ubicacion) {
    return new this({
        code: code,
        color: color,
        modelo: modelo,
        ubicacion: ubicacion
    });
};

bicicletaSchema.statics.allBicis = function (cb) {
    return this.find({}, cb);
};

bicicletaSchema.statics.add = function async(aBici, cb) {
    return new Promise(async (resolve, reject) => {
        try{
            const newBike = await this.create(aBici, cb);
            resolve(newBike);
        }catch(e){
            reject(e)
        }
    })
};

bicicletaSchema.statics.findByCode = function (aCode, cb) {
    return this.findOne({ code: aCode }, cb);
};

bicicletaSchema.statics.removeByCode = function (aCode, cb) {
    return this.deleteOne({ code: aCode }, cb);
};

bicicletaSchema.statics.updateBici = function async(aBici, cb) {
    return new Promise(async (resolve, reject) => {
        try {
            let updateBike = await this.findByCode(aBici.code);
            updateBike.color = aBici.color;
            updateBike.modelo = aBici.modelo;
            updateBike.ubicacion = aBici.ubicacion;
            updateBike = await this.updateOne(updateBike);
            resolve(updateBike);
            return true;
        } catch (e) {
            reject(e);
            return false;
        }
    })
};

module.exports = mongoose.model('Bicicleta', bicicletaSchema);
