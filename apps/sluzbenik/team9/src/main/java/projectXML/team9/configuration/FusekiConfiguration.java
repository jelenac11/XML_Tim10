package projectXML.team9.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "conn.fuseki")
public class FusekiConfiguration {

	public String endpoint;
	public String dataset;
	public String query;
	public String update;
	public String data;
}
