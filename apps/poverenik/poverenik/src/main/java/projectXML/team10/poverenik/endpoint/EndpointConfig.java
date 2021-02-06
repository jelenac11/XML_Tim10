package projectXML.team10.poverenik.endpoint;

import javax.xml.ws.Endpoint;

import org.apache.cxf.Bus;
import org.apache.cxf.jaxws.EndpointImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import projectXML.team10.poverenik.soap.ports.defined.IzvestajiPortImpl;
import projectXML.team10.poverenik.soap.ports.defined.OdgovorNaZalbuPortImpl;
import projectXML.team10.poverenik.soap.ports.defined.ZalbePortImpl;

@Configuration
public class EndpointConfig {
	
	@Autowired
	private Bus bus;
	
	@Autowired
	private IzvestajiPortImpl izvestajiPortImpl;
	
	@Autowired
	private OdgovorNaZalbuPortImpl odgovorPortImpl;
	
	@Autowired
	private ZalbePortImpl zalbePortImpl;
	
	@Bean
	public Endpoint IzvestajEndpoint() {
		EndpointImpl endpoint = new EndpointImpl(bus, izvestajiPortImpl);
		endpoint.publish("/izvestaji");
		return endpoint;
	}
	
	@Bean
	public Endpoint OdgovorEndpoint() {
		EndpointImpl endpoint = new EndpointImpl(bus, odgovorPortImpl);
		endpoint.publish("/odgovori");
		return endpoint;
	}
	
	@Bean
	public Endpoint ZalbeEndpoint() {
		EndpointImpl endpoint = new EndpointImpl(bus, zalbePortImpl);
		endpoint.publish("/zalbe");
		return endpoint;
	}

}
