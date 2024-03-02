package org.j3g.random;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Collections;

@SpringBootApplication
public class RandomApplication {

	public static void main(String[] args) {

		SpringApplication app = new SpringApplication(RandomApplication.class);
		app.setDefaultProperties(Collections.singletonMap("server.port", "24110"));
		app.run();

	}

}
