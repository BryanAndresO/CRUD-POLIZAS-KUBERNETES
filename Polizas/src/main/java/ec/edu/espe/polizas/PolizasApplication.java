package ec.edu.espe.polizas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class PolizasApplication {

    public static void main(String[] args) {
        SpringApplication.run(PolizasApplication.class, args);
    }

}
