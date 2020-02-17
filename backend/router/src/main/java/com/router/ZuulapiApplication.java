package com.router;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.core.io.ClassPathResource;

import java.net.MalformedURLException;

@SpringBootApplication
@EnableDiscoveryClient
@EnableEurekaClient
public class ZuulapiApplication {
    public static void main(String[] args) throws MalformedURLException {
        Object[] sources = {ZuulapiApplication.class, new ClassPathResource("groovy/ExampleSurgicalDebugFilterBean.groovy")};
        SpringApplication.run(sources, args);
    }
}