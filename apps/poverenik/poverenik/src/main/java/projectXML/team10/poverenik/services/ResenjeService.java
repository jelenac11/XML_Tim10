package projectXML.team10.poverenik.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;

import projectXML.team10.poverenik.repositories.ResenjeRepository;
import projectXML.team10.poverenik.util.DOMParser;

@Service
public class ResenjeService {

	@Autowired
	private ResenjeRepository resenjeRepository;
	
	public String getOdlukaPoverioca(String id) throws Exception {
		return resenjeRepository.getById(id);
	}

	public void create(String odluka) throws Exception {
		Document doc = DOMParser.parse(odluka);

//		String id = UUID.randomUUID().toString();
//		id = id.split("-")[4]  + "/2020" + "-" + new Date().toInstant().atZone(ZoneId.systemDefault()).getMonthValue();
//		doc.getDocumentElement().setAttribute("broj_rešenja", id);
		resenjeRepository.save(doc);
	}

}
