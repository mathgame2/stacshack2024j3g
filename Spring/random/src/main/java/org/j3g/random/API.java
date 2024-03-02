package org.j3g.random;

import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@RestController
public class API {

    /**
     * 
     * @return String content of the atm data file
     */
    @GetMapping("api/get_atm_data")
    String getAtmData() throws IOException {
        File file = new File(getClass().getResource("/data/atms.json").getFile());
        return Files.readString(file.toPath());
    }

    /**
     *
     * @return String content of the branch data file
     */
    @GetMapping("api/get_branch_data")
    String getBranchData() throws IOException {
        File file = new File(getClass().getResource("/data/atms.json").getFile());
        return Files.readString(file.toPath());
    }



}
