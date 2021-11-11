package lecarden.email.config;

import lecarden.email.entity.EmailInformation;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.JsonDeserializer;

import java.util.HashMap;
import java.util.Map;

@EnableKafka
@Configuration
public class KafkaConsumerConfig {
    private EnvironmentService environmentService;

    public KafkaConsumerConfig(EnvironmentService environmentService) {
        this.environmentService = environmentService;
    }

    @Bean
    public ConsumerFactory<String, EmailInformation> consumerFactory() {
        Map<String, Object> props = new HashMap<>();
        props.put(
                ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,
                environmentService.getKafkaAddress());
        props.put(
                ConsumerConfig.GROUP_ID_CONFIG,
                environmentService.getKafkaGroupId());

        JsonDeserializer<EmailInformation> jsonDeserializer = new JsonDeserializer<>(EmailInformation.class);
        jsonDeserializer.setRemoveTypeHeaders(false);
        jsonDeserializer.addTrustedPackages("*");
        jsonDeserializer.setUseTypeMapperForKey(true);
        return new DefaultKafkaConsumerFactory<>(props, new StringDeserializer(), jsonDeserializer);
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, EmailInformation>
    kafkaListenerContainerFactory() {

        ConcurrentKafkaListenerContainerFactory<String, EmailInformation> factory =
                new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory());
        return factory;
    }
}
