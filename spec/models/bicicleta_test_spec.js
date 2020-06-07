const Bicicleta = require('../../models/bicicleta');

beforeEach(() => { Bicicleta.allBicis = []; });

describe('Bicicleta.allBicis', () => {
    it("Comienza vacío", () => {
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});

describe('Bicicleta.add', () => {
    it("Agregamos una", () => {
        expect(Bicicleta.allBicis.length).toBe(0);

        let a = new Bicicleta(1, 'rojo', 'urbana', [6.1846099, -75.5991287]);
        Bicicleta.add(a);

        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(a);
    });
});

describe('Bicicleta.findById', () => {
    it("Buscar una bicicleta con ID", () => {
        expect(Bicicleta.allBicis.length).toBe(0);

        let aBici = new Bicicleta(1, 'rojizo', 'urbana', [6.1846099, -75.5991287]);
        let aBici2 = new Bicicleta(2, 'rojizo', 'montaña', [6.1846078, -75.5991287]);
        Bicicleta.add(aBici);
        Bicicleta.add(aBici2);

        let targetBici = Bicicleta.findById(1);
        expect(targetBici.id).toBe(1);
        expect(targetBici.color).toBe(aBici.color);
        expect(targetBici.modelo).toBe(aBici.modelo);

    });
});

describe('Bicicleta.removeById', () => {
    it("Eliminar una bicicleta con su ID", () => {
        expect(Bicicleta.allBicis.length).toBe(0);

        let aBici = new Bicicleta(1, 'rojizo', 'urbana', [6.1846099, -75.5991287]);
        let aBici2 = new Bicicleta(2, 'gris', 'BMX', [6.1846078, -75.5991287]);
        let aBici3 = new Bicicleta(3, 'rojizo', 'montaña', [6.1846078, -75.5991287]);
        Bicicleta.add(aBici);
        Bicicleta.add(aBici2);
        Bicicleta.add(aBici3);

        Bicicleta.removeById(aBici3.id)

        expect(Bicicleta.allBicis.length).toBe(2);
    });
});