package com.quickbidd;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class QuickBiddBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuickBiddBackendApplication.class, args);
	}
	
	

}
