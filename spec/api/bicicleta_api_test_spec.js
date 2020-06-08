const Bicicleta = require('../../models/bicicleta');
const request = require('request');
const server = require('../../bin/www');
const database = require('../../db');
const baseURL = 'http://localhost:3000/';


describe('Bicicleta API', () => {
    beforeEach(async(done)=>{
        Bicicleta.allBicis = [];
        await database();
        done();
    });
    afterEach(async (done) => {
        try {
            await Bicicleta.deleteMany({})
            done()
        }
        catch (e) {
            console.log(err)
        }
    });

    describe('GET BICICLETAS /', () => {
        it('status 200', async (done) => {
            expect(Bicicleta.allBicis.length).toBe(0);  //Tiene que estar vacío el array

            let aBici = new Bicicleta({ code: 1, color: 'violeta', modelo: 'montaña', ubicacion: [-34.6112424, -58.5412424] });
            await Bicicleta.add(aBici);

            request.get(baseURL+'api/bicicletas', function (error, response, body) {
                expect(response.statusCode).toBe(200);
            });

            done();
        });
    });

    describe('POST BICICLETAS /create', () => {
        it('status 201', (done) => {
            var headers = { 'content-type': 'application/json'}

            var aBici = '{"code":10, "color":"violeta", "modelo":"urbana", "lat":-34.6112424, "lng":-58.5412424}';

            request.post({
                headers: headers,
                url: baseURL+'api/bicicletas/create',
                body: aBici
            }, function (error, response, body) {
                Bicicleta.findByCode(10, (err, bBici) => {
                    expect(response.statusCode).toBe(201);
                    expect(bBici.color).toBe('violeta');
                    done();
                });
            });
        });
    });

    describe('PATCH BICICLETAS /update', () => {
        it('status 200', async(done) => {
            expect(Bicicleta.allBicis.length).toBe(0);
            let aBici = new Bicicleta({ code: 10, color: 'violeta', modelo: 'montaña', ubicacion: [-34.6112424, -58.5412424] });
            await Bicicleta.add(aBici);
            const headers = { 'content-type': 'application/json'}
            aBici = '{"code":10, "color":"amarillo", "modelo":"urbana", "lat":-34.6112424, "lng":-58.5412424}';
            request.patch({
                headers: headers,
                url: baseURL + 'api/bicicletas/'+ 10 +'/update',
                body: aBici
            }, (error, response, body) => {
                Bicicleta.findByCode(10, (err, bBici) => {
                    expect(response.statusCode).toBe(200);
                    expect(bBici.color).toBe('amarillo');
                    done();
                });
            });
        });
    });


    describe('DELETE BICICLETAS /delete', () => {
        it('status 200', async (done) => {

            expect(Bicicleta.allBicis.length).toBe(0);  //Tiene que estar vacío el array

            //Se crea el registro a actualizar
            let aBici = new Bicicleta({ code: 10, color: 'violeta', modelo: 'montaña', ubicacion: [-34.6112424, -58.5412424] });
            await Bicicleta.add(aBici);

            const headers = { 'content-type': 'application/json', 'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlY2MxNzkzMTg4OTlkMjg4Y2Y1NDE2MiIsImlhdCI6MTU5MDQzMzg0NSwiZXhwIjoxNTkxMDM4NjQ1fQ.h0k5zffQuoA2eRE5x_iyHg6Tpd8URP5I8XFBiUZrWfU' }

            const code = '{"code":10}';

            request.delete({
                headers: headers,
                url: baseURL+'api/bicicletas/delete',
                body: code
            }, function (error, response, body) {
                expect(response.statusCode).toBe(204);
                done();
            });
        });
    });

});
