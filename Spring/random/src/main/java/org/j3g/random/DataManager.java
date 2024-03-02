package org.j3g.random;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.j3g.random.data_objects.ATM;
import org.j3g.random.data_objects.Branch;
import org.j3g.random.data_objects.GeographicCoordinates;
import org.j3g.random.deserializers.ATMArrayDeserializer;
import org.j3g.random.deserializers.GeographicCoordinatesArrayDeserializer;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

public class DataManager {

    GeographicCoordinates[] read_geocoords() throws IOException {
        File file = new File(getClass().getResource("/data/atms.json").getFile());
        String data = Files.readString(file.toPath());

        ObjectMapper mapper = new ObjectMapper();
        SimpleModule module = new SimpleModule();
        module.addDeserializer(GeographicCoordinates[].class, new GeographicCoordinatesArrayDeserializer());
        mapper.registerModule(module);

        GeographicCoordinates[] readValue = mapper.readValue(data, GeographicCoordinates[].class);
        return readValue;
    }

    ATM[] read_atms() throws IOException {
        File file = new File(getClass().getResource("/data/atms.json").getFile());
        String data = Files.readString(file.toPath());

        ObjectMapper mapper = new ObjectMapper();
        SimpleModule module = new SimpleModule();
        module.addDeserializer(ATM[].class, new ATMArrayDeserializer());
        mapper.registerModule(module);

        ATM[] readValue = mapper.readValue(data, ATM[].class);
        return readValue;
    }

    Branch read_branches() throws IOException {
        File file = new File(getClass().getResource("/data/atms.json").getFile());
        String data = Files.readString(file.toPath());

        return null;
    }
}
