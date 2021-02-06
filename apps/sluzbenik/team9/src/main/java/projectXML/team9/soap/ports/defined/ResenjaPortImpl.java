package projectXML.team9.soap.ports.defined;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import projectXML.team9.services.ResenjeService;

@javax.jws.WebService(
        serviceName = "ResenjaService",
        portName = "ResenjePort",
        targetNamespace = "http://www.projekat.org/ws/resenja",
       // wsdlLocation = "classpath:wsdl/Resenje.wsdl",
        endpointInterface = "projectXML.team9.soap.ports.defined.ResenjaPort")
@Service
public class ResenjaPortImpl implements ResenjaPort {

	@Autowired
	ResenjeService resenjeService;
	
	@Override
	public void storeOdlukaPoverioca(String resenje) {
		try {
			resenjeService.create(resenje);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
