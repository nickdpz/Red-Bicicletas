let Bicicleta = class {
    constructor(id, color, modelo, ubicacion) {
        this.id = id;
        this.color = color;
        this.modelo = modelo;
        this.ubicacion = ubicacion;
    }
    toString() {
        return `id: ${this.id} | color: ${this.color}`
    }
    remove() {

    }
}
Bicicleta.allBicis = [];

Bicicleta.add = (aBici) => {
    Bicicleta.allBicis.push(aBici);
}

Bicicleta.findById = (aBiciId) => {
    let aBici = Bicicleta.allBicis.find(x => x.id == aBiciId);
    if(aBici){
        return aBici;
    }else{
        throw new Error("No se encontro")
    }
}
Bicicleta.removeById = (aBiciId) => {
    let aBici = Bicicleta.allBicis.find(x => x.id === aBiciId);
    Bicicleta.allBicis.splice(aBici, 1);
}

module.exports = Bicicleta;