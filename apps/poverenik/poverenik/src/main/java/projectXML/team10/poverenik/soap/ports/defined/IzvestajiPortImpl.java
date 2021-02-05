package projectXML.team10.poverenik.soap.ports.defined;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import projectXML.team10.poverenik.models.izvestaj.Izvestaj;
import projectXML.team10.poverenik.models.izvestaj.TIzvestaj;
import projectXML.team10.poverenik.services.IzvestajService;


@javax.jws.WebService(
        serviceName = "IzvestajiService",
        portName = "IzvestajPort",
        targetNamespace = "http://www.projekat.org/ws/izvestaji",
       // wsdlLocation = "classpath:wsdl/Izvestaj.wsdl",
        endpointInterface = "projectXML.team10.poverenik.soap.ports.defined.IzvestajiPort")
@Service
public class IzvestajiPortImpl implements IzvestajiPort {

	@Autowired
	private IzvestajService izvestajService;
	
	@Override
	public TIzvestaj storeIzvestaj(TIzvestaj izvestaj) {
		try {
			return izvestajService.create(new Izvestaj(izvestaj));
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}

