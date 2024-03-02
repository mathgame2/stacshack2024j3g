package org.j3g.random.deserializers;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import org.j3g.random.data_objects.GeographicCoordinates;

import java.io.IOException;
import java.util.List;

public class GeographicCoordinatesArrayDeserializer extends StdDeserializer<GeographicCoordinates[]> {

    public GeographicCoordinatesArrayDeserializer() {
        this(null);
    }

    protected GeographicCoordinatesArrayDeserializer(Class<?> vc) {
        super(vc);
    }

    @Override
    public GeographicCoordinates[] deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JacksonException {
        JsonNode node = jsonParser.getCodec().readTree(jsonParser);
        int totalResults = node.get("meta").get("TotalResults").asInt();
        List<JsonNode> coords_json = node.get("data").findValues("GeographicCoordinates");

        GeographicCoordinates[] coords = new GeographicCoordinates[totalResults];

        for (int i = 0; i < totalResults; i++) {

            double lat = coords_json.get(i).get("Latitude").asDouble();
            double lon = coords_json.get(i).get("Longitude").asDouble();
            coords[i] = new GeographicCoordinates(lat, lon);

        }


        return coords;
    }
}
