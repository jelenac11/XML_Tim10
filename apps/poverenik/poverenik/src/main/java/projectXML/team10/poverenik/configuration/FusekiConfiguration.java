package projectXML.team10.poverenik.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "conn.fuseki")
public class FusekiConfiguration {

	private String endpoint;
	private String dataset;
	private String query;
	private String update;
	private String data;
}
