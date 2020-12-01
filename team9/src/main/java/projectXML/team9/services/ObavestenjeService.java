package projectXML.team9.services;

import java.io.IOException;
import javax.xml.bind.JAXBException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.xml.sax.SAXException;
import projectXML.team9.models.obavestenje.Obavestenje;
import projectXML.team9.models.obavestenje.TPravnoLice;
import projectXML.team9.repositories.ObavestenjeRepository;

@Service
public class ObavestenjeService {

	@Autowired
	private ObavestenjeRepository obavestenjeRepository;
	
	public String getDocument(String naziv) throws SAXException, JAXBException {
		Obavestenje obavestenje = obavestenjeRepository.loadDocument(naziv);
		return obavestenje.toString();
	}

	public void postDocument(TPravnoLice pravnoLice) throws JAXBException, SAXException, IOException {
		Obavestenje obavestenje = obavestenjeRepository.loadDocument("obavestenje");
		obavestenje.getInformacijeOObavestenju().setOrgan(pravnoLice);
		obavestenjeRepository.save(obavestenje);
	}
}
