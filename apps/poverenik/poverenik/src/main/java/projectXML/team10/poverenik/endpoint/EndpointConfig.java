package projectXML.team10.poverenik.endpoint;

import javax.xml.ws.Endpoint;

import org.apache.cxf.Bus;
import org.apache.cxf.jaxws.EndpointImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import projectXML.team10.poverenik.soap.ports.defined.IzvestajiPortImpl;

@Configuration
public class EndpointConfig {
	
	@Autowired
	private Bus bus;
	
	@Autowired
	private IzvestajiPortImpl izvestajiPortImpl;
	
	@Bean
	public Endpoint IzvestajEndpoint() {
		EndpointImpl endpoint = new EndpointImpl(bus, izvestajiPortImpl);
		endpoint.publish("/izvestaji");
		return endpoint;
	}

}
