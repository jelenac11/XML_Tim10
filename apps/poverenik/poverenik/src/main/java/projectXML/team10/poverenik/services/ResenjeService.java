package projectXML.team10.poverenik.services;

import java.time.ZoneId;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.xmldb.api.modules.XMLResource;

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
		//System.out.println("\n***** ID ODLUKE" + id + "\n\n");
	}

}
