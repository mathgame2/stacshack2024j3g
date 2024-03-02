import React, { Component } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ATMIcon from './pics/ATM_mark.png';

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

            this.addAtmMarkers();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.atmData !== this.props.atmData) {
            this.addAtmMarkers();
        }
    }

    addAtmMarkers() {
        const { atmData } = this.props;
        console.log('ATM Data:', atmData);
    
        if (atmData && Array.isArray(atmData)) {
            const customIcon = L.icon({
                iconUrl: ATMIcon, // Set the URL of the imported image
                iconSize: [38, 38], // Set the size of the icon
                iconAnchor: [19, 38], // Set the anchor point of the icon
            });
    
            atmData.forEach(atm => {
                const { coords, accessibility, id } = atm;
                const { Latitude, Longitude } = coords;
    
                // console.log('Adding marker at:', Latitude, Longitude);
    
                if (Latitude && Longitude) {
                    // Create a popup with additional information
                    const popupContent = `
                        <b>ID:</b> ${id}<br>
                        <b>Accessibility:</b> ${accessibility.join(', ')}
                    `;
                    
                    // Create marker with popup
                    const marker = L.marker([Latitude, Longitude], { icon: customIcon }).addTo(this.map);
                    marker.bindPopup(popupContent); // Bind popup to marker
                }
            });
        }
    }
    
    

    render() {
        return <div ref={this.mapRef} style={{ width: '100%', height: '100%' }} />;
    }
}

export default Map;
