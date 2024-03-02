package org.j3g.random.data_objects;

import org.yaml.snakeyaml.events.Event;

import java.util.List;

public class ATM {

    GeographicCoordinates coords;
    List<String> accessibility;
    String ID;

    public GeographicCoordinates getCoords() {
        return coords;
    }

    public void setCoords(GeographicCoordinates coords) {
        this.coords = coords;
    }

    public List<String> getAccessibility() {
        return accessibility;
    }

    public void setAccessibility(List<String> accessibility) {
        this.accessibility = accessibility;
    }

    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    public ATM(GeographicCoordinates coords, List<String> accessibility, String ID) {
        this.coords = coords;
        this.accessibility = accessibility;
        this.ID = ID;
    }
}
