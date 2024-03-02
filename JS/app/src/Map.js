import React, { Component } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ATMIcon from './pics/ATM_mark.png';
import { voronoi } from 'd3-voronoi';

class Map extends Component {
    
    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
        this.map = null; 
        this.voronoiLayer = null;
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
    
        if (atmData && Array.isArray(atmData)) {
            const customIcon = L.icon({
                iconUrl: ATMIcon, // Set the URL of the imported image
                iconSize: [38, 38], // Set the size of the icon
                iconAnchor: [19, 38], // Set the anchor point of the icon
            });
    
            atmData.forEach(atm => {
                const { coords, accessibility, id } = atm;
                const { Latitude, Longitude } = coords;
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

            // Generate and add Voronoi diagram
            this.generateVoronoi();
        }
    }

    generateVoronoi() {
        const { atmData } = this.props;
        const points = atmData.map(atm => {
            const { coords } = atm;
            const { Latitude, Longitude } = coords;
            return [Longitude, Latitude]; // Swap Longitude and Latitude for d3-voronoi
        });

        const voronoiGenerator = voronoi().extent([[-1000, -1000], [this.map.getSize().x, this.map.getSize().y]]);
        const voronoiPolygons = voronoiGenerator(points).polygons();

        if (this.voronoiLayer) {
            this.voronoiLayer.remove();
        }

        this.voronoiLayer = L.layerGroup();

        voronoiPolygons.forEach(polygon => {
            const latlngs = polygon.map(point => [point[1], point[0]]); // Swap back to [Latitude, Longitude]
            L.polygon(latlngs, { color: 'blue' }).addTo(this.voronoiLayer);
        });

        this.voronoiLayer.addTo(this.map);
    }
    
    render() {
        return <div ref={this.mapRef} style={{ width: '100%', height: '100%' }} />;
    }
}

export default Map;
