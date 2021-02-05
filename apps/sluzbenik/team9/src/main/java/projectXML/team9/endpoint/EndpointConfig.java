package projectXML.team9.endpoint;

import javax.xml.ws.Endpoint;

import org.apache.cxf.Bus;
import org.apache.cxf.jaxws.EndpointImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import projectXML.team9.soap.ports.defined.ZahteviPortImpl;

@Configuration
public class EndpointConfig {

	@Autowired
	private Bus bus;
	
	@Autowired
	private ZahteviPortImpl zahteviPortImpl;
	
	@Bean
	public Endpoint ZahtevEndpoint() {
		EndpointImpl endpoint = new EndpointImpl(bus, zahteviPortImpl);
		endpoint.publish("/zahtevi");
		return endpoint;
	}
	
}
