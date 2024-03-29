package org.j3g.random;

import org.j3g.random.data_objects.ATM;
import org.j3g.random.data_objects.GeographicCoordinates;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
public class API {

    /**
     *
     * @return String content of the atm data file
     */
    @CrossOrigin(origins = "http://localhost:22489")
    @GetMapping("api/get_atm_data")
    String getAtmData() throws IOException {
        File file = new File(getClass().getResource("/data/atms.json").getFile());
        return Files.readString(file.toPath());
    }

    @CrossOrigin(origins = "http://localhost:22489")
    @GetMapping("api/get_geo_coords_atm")
    GeographicCoordinates[] getGeoCoordsAtm() throws IOException {
        DataManager manager = new DataManager();
        return manager.read_geocoords_atm();
    }

    @CrossOrigin(origins = "http://localhost:22489")
    @GetMapping("api/get_atms")
    ATM[] getAtms() throws IOException {
        DataManager manager = new DataManager();
        return manager.read_atms();
    }
    /**
     *
     * @return String content of the branch data file
     */
    @CrossOrigin(origins = "http://localhost:22489")
    @GetMapping("api/get_branch_data")
    String getBranchData() throws IOException {
        File file = new File(getClass().getResource("/data/atms.json").getFile());
        return Files.readString(file.toPath());
    }

    @GetMapping("api/get_atm_triangles")
    GeographicCoordinates[][] getAtmTriangles() throws IOException {
        DataManager manager = new DataManager();
        return new TriangleCalculator().calculateEquilateralTriangles(manager.read_geocoords_atm(), 0.002);
    }

}
