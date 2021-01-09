package projectXML.team10.poverenik.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Configuration
public class PropertiesConfiguration {

	private ExistDBConfiguration existDBConfiguration;
	
	@Autowired
	public PropertiesConfiguration(ExistDBConfiguration existDBConfiguration) {
		this.existDBConfiguration = existDBConfiguration;
	}
}
