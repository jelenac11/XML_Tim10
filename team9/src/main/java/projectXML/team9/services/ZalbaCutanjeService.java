package projectXML.team9.services;

import java.io.IOException;

import javax.xml.bind.JAXBException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.xml.sax.SAXException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import projectXML.team9.models.zalbaCutanje.TAdresa;
import projectXML.team9.models.zalbaCutanje.ZalbaNaCutanje;
import projectXML.team9.repositories.ZalbaCutanjeRepository;

@Service
public class ZalbaCutanjeService {

	@Autowired
	private ZalbaCutanjeRepository zalbaCutanjeRepository;
	
	public String getDocument(String naziv) throws SAXException, JAXBException {
		ZalbaNaCutanje zalbaCutanja = zalbaCutanjeRepository.loadDocument(naziv);
		ObjectMapper Obj = new ObjectMapper();
		String jsonStr = "";
		try {
			jsonStr = Obj.writerWithDefaultPrettyPrinter().writeValueAsString(zalbaCutanja);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return jsonStr;
	}

	public void createZalbaCutanje(ZalbaNaCutanje zalba, String imeDokumenta) throws JAXBException, SAXException, IOException {
		zalbaCutanjeRepository.save(zalba, imeDokumenta);
	}

	public void changeAddress(String naziv, TAdresa adresa) throws JAXBException, SAXException, IOException {
		ZalbaNaCutanje zalba = zalbaCutanjeRepository.loadDocument(naziv);
		zalba.setAdresaPoverenika(adresa);
		zalbaCutanjeRepository.save(zalba, naziv + "Update");
	}
	
}
