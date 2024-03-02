import React, { Component } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

class Map extends Component {
    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
        this.map = null; // Initialize map reference
    }

    componentDidMount() {
        if (!this.map) { // Check if map is not already initialized
            // Create a map instance
            this.map = L.map(this.mapRef.current).setView([51.505, -0.09], 13);

            // Add a tile layer (you can use any tile provider)
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.map);
        }
    }

    render() {
        return <div ref={this.mapRef} style={{ width: '100%', height: '400px' }} />;
    }
}

export default Map;
