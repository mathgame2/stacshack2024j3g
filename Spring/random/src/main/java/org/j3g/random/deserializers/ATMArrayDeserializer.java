package org.j3g.random.deserializers;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import org.j3g.random.data_objects.ATM;
import org.j3g.random.data_objects.GeographicCoordinates;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class ATMArrayDeserializer extends StdDeserializer<ATM[]> {
    public ATMArrayDeserializer() {
        this(null);
    }
    protected ATMArrayDeserializer(Class<?> vc) {
        super(vc);
    }

    @Override
    public ATM[] deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JacksonException {

        JsonNode node = jsonParser.getCodec().readTree(jsonParser);
        int totalResults = node.get("meta").get("TotalResults").asInt();
        List<ATM> atms = new ArrayList<ATM>();
        int counter = 0;

        ObjectMapper mapper = new ObjectMapper();
        JsonFactory factory = mapper.getFactory();

        JsonNode json_atms = node.get("data").findValue("ATM");
        json_atms.elements().forEachRemaining(x -> {
            String id_string = x.get("Identification").asText();
            List<String> access = new ArrayList<>();
            GeographicCoordinates coords;
            try {
                for (final JsonNode objNode : x.get("Accessibility")){
                    access.add(String.valueOf(objNode));
                }
                coords = mapper.readValue(x.findValue("GeographicCoordinates").toString(), GeographicCoordinates.class);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
            atms.add(new ATM(coords,access, id_string));
        });

        return atms.toArray(new ATM[totalResults]);
    }
}
