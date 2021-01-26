package projectXML.team9.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "aws")
public class AWSConfiguration {

	private String accessKey;
	private String secretKey;
	private String from;
}
