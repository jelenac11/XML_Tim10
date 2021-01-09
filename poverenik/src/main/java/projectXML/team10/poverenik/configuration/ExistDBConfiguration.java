package projectXML.team10.poverenik.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "conn")
public class ExistDBConfiguration {

	private String user;
	private String password;
	private String host;
	private String port;
	private String driver;
	private String uri;
}
