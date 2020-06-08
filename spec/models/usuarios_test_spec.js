const Bicicleta = require('../../models/bicicleta');
const Reserva = require('../../models/reserva');
const Usuario = require('../../models/usuario');
const server = require('../../bin/www');
const database = require('../../db');

describe('Testing Usuarios', () => {
    beforeEach(async (done) =>{
        await database();
        done();
    })

    afterEach(async (done)=> {
        try {
            await Reserva.deleteMany({})
            await Usuario.deleteMany({})
            await Bicicleta.deleteMany({})
            done()
        }
        catch (e) {
            console.log(err)
        }
    })

    describe('Usuario reserva una bicicleta', () => {
        it('Desde existir la reserva', (done) => {
            const usuario = new Usuario({ nombre: 'Nicolas' });
            usuario.save();
            const bicicleta = new Bicicleta({ code: 1, color: 'verde', modelo: 'BMX' });
            bicicleta.save();

            let hoy = new Date();
            let mañana = new Date();
            mañana.setDate(hoy.getDate() + 1);
            usuario.reservar(bicicleta.id, hoy, mañana, (err, reserva) => {
                Reserva.find({}).populate('bicicleta').populate('usuario').exec((err, reservas) => {
                    expect(reservas.length).toEqual(1);
                    expect(reservas[0].diasReserva()).toBe(2);
                    expect(reservas[0].bicicleta.code).toBe(1);
                    expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
                    done();
                })
            });
        });
    });
});
