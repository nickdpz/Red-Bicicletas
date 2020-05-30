const mapId = 'map-template';

const mapURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

let freeBus = {
    type: "FeatureCollection",
    features: []
};

const iconC = L.icon({
    iconUrl: '/images/contenedor.svg',
    iconSize: [32, 32],
    iconAnchor: [0, 0]
});

class Maps {
    constructor(coords) {
        this.map = L.map(mapId).setView(coords, 18);
        L.tileLayer(mapURL, {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        this.markers = []
    }

    addLine() {
        L.geoJSON(freeBus, {
            style: lineStyle
        }).addTo(this.map);
    }

    setView(lat, lon, zoom) {
        this.map.setView([lat, lon], zoom);
    }

    addMarker(id, coords, message) {
        let marker = L.marker(coords, {
            icon: iconC
        })
        this.markers.push({
            id: id,
            marker: marker,
        })
        if (message) {
            marker.bindPopup(`<p>${message}</p>`).openPopup();
        }
        marker.addTo(this.map)
    }

    removeMarker(id) {
        let i = this.markers.map(function(arr) { return arr.id; }).indexOf(id);
        this.markers[i].marker.remove();
        this.markers.splice(i, 1); //delete marker to array
    }

}
window.onload = async() => {
const graph = new Maps([4.63136, -74.15437]);
graph.setView(4.63136, -74.15437, 14); // Centra el mapa con base en la zona
graph.addMarker("nico", [4.63136, -74.15437], "Venga va")
}
