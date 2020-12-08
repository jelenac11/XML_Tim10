package projectXML.team9.services;

import java.io.IOException;

import javax.xml.bind.JAXBException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.xml.sax.SAXException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import projectXML.team9.models.zalbaNaOdluku.ZalbaNaOdluku;
import projectXML.team9.repositories.ZalbaNaOdlukuRepository;

@Service
public class ZalbaNaOdlukuService {

	@Autowired
	private ZalbaNaOdlukuRepository zalbaNaOdlukuRepository;
	
	public String getDocument(String naziv) throws SAXException, JAXBException {
		ZalbaNaOdluku zalbaNaOdluku = zalbaNaOdlukuRepository.loadDocument(naziv);
		ObjectMapper Obj = new ObjectMapper();
		String jsonStr = "";
		try {
			jsonStr = Obj.writerWithDefaultPrettyPrinter().writeValueAsString(zalbaNaOdluku);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return jsonStr;
	}

	public void createZalbaNaOdluku(ZalbaNaOdluku zalba, String naziv) throws JAXBException, SAXException, IOException {
		zalbaNaOdlukuRepository.save(zalba, naziv);
	}

	public void changeDrugiPodaciZaKontaktZalioca(String naziv, String broj) throws JAXBException, SAXException, IOException {
		ZalbaNaOdluku zalba = zalbaNaOdlukuRepository.loadDocument(naziv);
		zalba.getZalilac().setDrugiPodaciZaKontakt(broj);
		zalbaNaOdlukuRepository.save(zalba, naziv + "Update");
	}

}
