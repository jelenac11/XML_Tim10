package projectXML.team9.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Configuration
public class PropertiesConfiguration {

	private ExistDBConfiguration existDBConfiguration;

	private FusekiConfiguration fusekiConfiguration;

	private AWSConfiguration awsConfiguration;

	@Autowired
	public PropertiesConfiguration(ExistDBConfiguration existDBConfiguration, FusekiConfiguration fusekiConfiguration,
			AWSConfiguration awsConfiguration) {
		this.existDBConfiguration = existDBConfiguration;
		this.fusekiConfiguration = fusekiConfiguration;
		this.awsConfiguration = awsConfiguration;
	}
}
