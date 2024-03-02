package org.j3g.random;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.j3g.random.data_objects.ATM;
import org.j3g.random.data_objects.GeographicCoordinates;
import org.j3g.random.deserializers.ATMArrayDeserializer;
import org.j3g.random.deserializers.GeographicCoordinatesArrayDeserializer;
import org.j3g.random.serializers.GeographicCoordinatesSerializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

@Configuration
public class CustomJacksonConfig {
    @Bean
    public ObjectMapper jsonObjectMapper() {

        SimpleModule module = new SimpleModule()
                .addSerializer(GeographicCoordinates.class, new GeographicCoordinatesSerializer())
                .addDeserializer(ATM[].class, new ATMArrayDeserializer())
                .addDeserializer(GeographicCoordinates[].class, new GeographicCoordinatesArrayDeserializer());

        return Jackson2ObjectMapperBuilder.json()
                .modules(module)
                .build();
    }


}
