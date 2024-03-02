package org.j3g.random;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.xml.crypto.Data;
import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;

@SpringBootApplication
public class RandomApplication {

	public static void main(String[] args) throws IOException {

		SpringApplication app = new SpringApplication(RandomApplication.class);
		app.setDefaultProperties(Collections.singletonMap("server.port", "24110"));
		DataManager asdf = new DataManager();
		app.run();
		System.out.println(Arrays.deepToString(new TriangleCalculator().calculateEquilateralTriangles(asdf.read_geocoords_atm(), 0.01)));
	}

}
