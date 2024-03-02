import React, { Component } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ATMIcon from './pics/ATM_mark.png';
import { voronoi } from 'd3-voronoi';
import styles from './styles/Map.module.css';
import HiddenEffect from './HiddenEffect'; 
import atm_triangles from './data/atm_triangles.json';

class Map extends Component {
    
    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
        this.map = null; 
        this.voronoiLayer = null;
        this.state = {
            showAtmTriangles: false,
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
            this.addAtmTriangles();
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

        if (this.state.showAtmTriangles) {
            this.addAtmTriangles();
        } else {
            this.removeAtmTriangles();
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

    toggleAtmTriangles = (show) => {
        this.setState({ showAtmTriangles: show });
    }

    removeAtmTriangles = () => {
        if (this.trianglesLayer) {
            this.trianglesLayer.remove();
            this.trianglesLayer = null;
        }
    }

    addAtmTriangles() {
        const triangles = atm_triangles;  // Assuming atm_triangles is imported

        if (this.trianglesLayer) {
            this.trianglesLayer.clearLayers();
        } else {
            this.trianglesLayer = L.layerGroup().addTo(this.map);
        }

        triangles.forEach(triangle => {
            const latlngs = triangle.map(point => [point.Latitude, point.Longitude]);
            const polygon = L.polygon(latlngs, { 
                color: 'red', 
                fill: false  // Set fill to false
            });
            this.trianglesLayer.addLayer(polygon);
        });
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
        return (
            <div ref={this.mapRef} className={styles.mapBox}>
             <HiddenEffect onPasswordMatch={this.toggleAtmTriangles} />
                <button class='nes-btn' onClick={this.toggleVoronoiVisibility}>
                    {this.state.voronoiVisible ? 'Hide ATM Voronoi' : 'Show ATM Voronoi'}
                </button>
                
            </div>
        );
    }
    
}

export default Map;
