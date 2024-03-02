package org.j3g.random.serializers;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import org.j3g.random.data_objects.GeographicCoordinates;

import java.io.IOException;

public class GeographicCoordinatesSerializer extends StdSerializer<GeographicCoordinates> {
    public GeographicCoordinatesSerializer(){
        this(null);
    }
    protected GeographicCoordinatesSerializer(Class<GeographicCoordinates> t) {
        super(t);
    }

    @Override
    public void serialize(GeographicCoordinates geographicCoordinates, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeObjectField("Longitude", geographicCoordinates.getLongitude());
        jsonGenerator.writeObjectField("Latitude", geographicCoordinates.getLatitude());
        jsonGenerator.writeEndObject();
    }
}
