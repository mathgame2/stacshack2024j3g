import React, { Component } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

class Map extends Component {
    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
        this.map = null; 
    }

    componentDidMount() {
        if (!this.map) { 
            this.map = L.map(this.mapRef.current).setView([51.505, -0.09], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.map);
        }
    }

    render() {
        return <div ref={this.mapRef} style={{ width: '100%', height: '100%' }} />;
    }
}

export default Map;
