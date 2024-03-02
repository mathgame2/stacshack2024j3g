import React, { Component } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ATMIcon from './pics/ATM_mark.png';
import { voronoi } from 'd3-voronoi';
import styles from './styles/Map.module.css';
class Map extends Component {
    
    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
        this.map = null; 
        this.voronoiLayer = null;
        this.state = {
            voronoiVisible: true
        };
    }

    componentDidMount() {
        if (!this.map) { 
            this.map = L.map(this.mapRef.current).setView([51.505, -0.09], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.map);

            this.addAtmMarkers();
            this.generateVoronoi();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.atmData !== this.props.atmData || prevState.voronoiVisible !== this.state.voronoiVisible) {
            this.addAtmMarkers();
            if (this.state.voronoiVisible) {
                this.generateVoronoi();
            } else {
                this.removeVoronoi();
            }
        }
    }

    addAtmMarkers() {
        const { atmData } = this.props;
    
        if (this.markersLayer) {
            this.markersLayer.clearLayers();
        } else {
            this.markersLayer = L.layerGroup().addTo(this.map);
        }
    
        if (atmData && Array.isArray(atmData)) {
            const customIcon = L.icon({
                iconUrl: ATMIcon,
                iconSize: [38, 38],
                iconAnchor: [19, 38],
            });
    
            atmData.forEach(atm => {
                const { coords, accessibility, services, allday, id  } = atm;
                const { Latitude, Longitude } = coords;
                if (Latitude && Longitude) {
                    const popupContent = `
                        <b>ID:</b> ${id}<br>
                        <b>Accessibility:</b> ${accessibility.join(', ')}<br>
                        <b>Services:</b> ${services.join(', ')}<br>
                        <b>24H:</b> ${allday ? 'Yes' : 'No'}
                    `;
                    const marker = L.marker([Latitude, Longitude], { icon: customIcon });
                    marker.bindPopup(popupContent);
                    this.markersLayer.addLayer(marker);
                }
            });
        }
    }
    

    generateVoronoi() {
        const { atmData } = this.props;
        let points = [];

        if (atmData && atmData.length > 0) {
            points = atmData.map(atm => {
                const { coords } = atm;
                const { Latitude, Longitude } = coords;
                return [Longitude, Latitude];
            });
        }


        const voronoiGenerator = voronoi().extent([[-1000, -1000], [this.map.getSize().x, this.map.getSize().y]]);
        const voronoiPolygons = voronoiGenerator(points).polygons();

        if (this.voronoiLayer) {
            this.voronoiLayer.remove();
        }

        this.voronoiLayer = L.layerGroup();

        voronoiPolygons.forEach(polygon => {
            const latlngs = polygon.map(point => [point[1], point[0]]);
            L.polygon(latlngs, { color: 'blue' }).addTo(this.voronoiLayer);
        });

        this.voronoiLayer.addTo(this.map);
    }

    removeVoronoi() {
        if (this.voronoiLayer) {
            this.voronoiLayer.remove();
            this.voronoiLayer = null;
        }
    }

    toggleVoronoiVisibility = () => {
        this.setState(prevState => ({
            voronoiVisible: !prevState.voronoiVisible
        }));
    };

    render() {
        const buttonClass = `nes-btn ${styles.atmButton}`;
        return (
            <div ref={this.mapRef} className={styles.mapBox}>
                <button className={buttonClass} onClick={this.toggleVoronoiVisibility}>
                    {this.state.voronoiVisible ? 'Hide ATM Voronoi' : 'Show ATM Voronoi'}
                </button>
                
            </div>
        );
    }
    
}

export default Map;
