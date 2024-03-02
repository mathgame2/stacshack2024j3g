package org.j3g.random;

import org.j3g.random.data_objects.GeographicCoordinates;

import java.util.ArrayList;
import java.util.List;

public class TriangleCalculator {

    public GeographicCoordinates[][] calculateEquilateralTriangles(GeographicCoordinates[] coords, double tolerance){
        List<GeographicCoordinates[]> triplets_list = new ArrayList<>();
        for (int i = 0; i < coords.length; i++) {
            for (int j = i + 1; j < coords.length; j++) {
                for (int k = 0; k < j + 1; k++) {
                    GeographicCoordinates point1 = coords[i];
                    GeographicCoordinates point2 = coords[j];
                    GeographicCoordinates point3 = coords[k];


                    Double[] vec1 = {point1.getLatitude() - point2.getLatitude(), (point1.getLongitude() - point2.getLongitude())};
                    Double[] vec2 = {point1.getLatitude() - point3.getLatitude(), (point1.getLongitude() - point3.getLongitude())};
                    Double[] vec3 = {point2.getLatitude() - point3.getLatitude(), (point2.getLongitude() - point3.getLongitude())};

                    double mag1 = calcMag(vec1);
                    double mag2 = calcMag(vec2);
                    double mag3 = calcMag(vec3);

                    if (checkCloseness(mag1, mag2, tolerance)&& checkCloseness(mag2, mag3, tolerance)&& checkCloseness(mag1, mag3, tolerance)){
                        triplets_list.add(new GeographicCoordinates[]{point1, point2, point3});
                    }
                }
            }
        }
        GeographicCoordinates[][] coordinates = new GeographicCoordinates[triplets_list.size()][3];
        for (int i = 0; i < triplets_list.size(); i++) {
            System.arraycopy(triplets_list.get(i), 0, coordinates[i], 0, 3);
        }
        return coordinates;
    }

    boolean checkCloseness(double mag1, double mag2, double tolerance){
        return (Math.abs(mag1 - mag2) < mag1 * tolerance);
    }

    double calcMag(Double[] vector){
        return Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2));
    }


}
