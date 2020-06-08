const database = require('../../db');
const Bicicleta = require('../../models/bicicleta');

describe('Testing Bicicletas', () =>{
    beforeEach(function (done) {
        Bicicleta.allBicis = [];
        database(done);
    });

    afterEach((done) =>{
        Bicicleta.deleteMany({},(err, success) =>{
            if (err) console.log(err);
            done();
        });
    });

    describe('Bicicleta.createInstance', () => {
        it('crea una instancia de Bicicleta', () => {
            var bici = Bicicleta.createInstance(1, "verde", "BMX", [6.1846099, -75.5991287]);

            expect(bici.code).toBe(1);
            expect(bici.color).toBe("verde");
            expect(bici.modelo).toBe("BMX");
            expect(bici.ubicacion[0]).toEqual(6.1846099);
            expect(bici.ubicacion[1]).toEqual(-75.5991287);
        })
    });

    describe('Bicicletas.allBicis', () => {
        it('Comienza vacía', (done) => {
            Bicicleta.find({}, function (err, bicis) {
                expect(bicis.length).toBe(0);
                done();
            })
        });
    });

    describe('Bicicletas.add', () => {
        it('Agrega una sola bibicleta', (done) => {
            var aBici = new Bicicleta({ code: 1, color: "verde", modelo: "Bmx" });
            Bicicleta.add(aBici, function (err, newBici) {
                if (err) console.log(err);
                Bicicleta.find({}, function (err, bicis) {
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].code).toBe(aBici.code)

                    done();
                });
            });
        });
    });

    describe('Bicicletas.findByCode', () => {
        it('Debe devolver la bici con code 1', (done) => {
            Bicicleta.find({}, (err, bicis) => {
                expect(bicis.length).toBe(0);

                var aBici = new Bicicleta({ code: 1, color: 'violeta', modelo: 'montaña' });
                Bicicleta.add(aBici, function (err, newBici) {
                    if (err) console.log(err);

                    var aBici2 = new Bicicleta({ code: 2, color: 'rojo', modelo: 'urbana' });
                    Bicicleta.add(aBici2, function (err, newBici) {
                        if (err) console.log(err);
                        Bicicleta.findByCode(1, function (errr, targetBici) {
                            expect(targetBici.code).toEqual(aBici.code);
                            expect(targetBici.color).toEqual(aBici.color);
                            expect(targetBici.modelo).toEqual(aBici.modelo);
                            done();
                        });
                    });
                });
            });
        });
    });

    describe('Bicicletas.removeByCode', () => {
        it('Debe eliminar la bici con code 1', (done) => {
            Bicicleta.find({}, (err, bicis) => {
                expect(bicis.length).toBe(0);

                var aBici = new Bicicleta({ code: 1, color: 'violeta', modelo: 'montaña' });
                Bicicleta.add(aBici, function (err, newBici) {
                    if (err) console.log(err);

                    var aBici2 = new Bicicleta({ code: 2, color: 'rojo', modelo: 'urbana' });
                    Bicicleta.add(aBici2, function (err, newBici) {
                        if (err) console.log(err);
                        Bicicleta.removeByCode(1, function (errr, targetBici) {
                            if (errr) console.log(errr);
                            Bicicleta.find({}, (error, bicis) => {
                                expect(bicis.length).toBe(1);
                                done();
                            });
                        });
                    });
                });
            });
        });
    });
});