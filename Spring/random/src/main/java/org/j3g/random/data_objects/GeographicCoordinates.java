package org.j3g.random.data_objects;

import com.fasterxml.jackson.annotation.JsonProperty;

public class GeographicCoordinates {
    @JsonProperty
    double Latitude;
    @JsonProperty
    double Longitude;

    public GeographicCoordinates() {
    }

    public GeographicCoordinates(double latitude, double longitude) {
        this.Latitude = latitude;
        this.Longitude = longitude;
    }

    public double getLatitude() {
        return Latitude;
    }

    public void setLatitude(double latitude) {
        this.Latitude = latitude;
    }

    public double getLongitude() {
        return Longitude;
    }

    public void setLongitude(double longitude) {
        this.Longitude = longitude;
    }

    @Override
    public String toString() {
        return "GeographicCoordinates{" +
                "Latitude=" + Latitude +
                ", Longitude=" + Longitude +
                '}';
    }
}
