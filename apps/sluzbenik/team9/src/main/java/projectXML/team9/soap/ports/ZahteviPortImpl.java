package projectXML.team9.soap.ports;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.java.dev.jaxb.array.StringArray;
import projectXML.team9.dto.TXSLTDocumentDTO;
import projectXML.team9.services.ZahtevService;

@javax.jws.WebService(
        serviceName = "ZahteviService",
        portName = "ZahtevPort",
        targetNamespace = "http://www.projekat.org/ws/zahtevi",
       // wsdlLocation = "classpath:wsdl/Zahtev.wsdl",
        endpointInterface = "projectXML.team9.soap.ports.ZahteviPort")
@Service
public class ZahteviPortImpl implements ZahteviPort {

	@Autowired
	private ZahtevService zahtevService;
	
	@Override
	public StringArray getOdbijeniZahtevi(String email) {
		ArrayList<String> odbijeni = zahtevService.readAllRejectedZahteviIdByCitizenEmail(email);
		return new StringArray(odbijeni);
	}
	
	@Override
	public TXSLTDocumentDTO getZahtevById(String id) {
		try {
			String zahtevXSLT = zahtevService.getXSLTZahtev(id);
			TXSLTDocumentDTO document = new TXSLTDocumentDTO();
			document.setXslt(zahtevXSLT);
			return document;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

}
