package projectXML.team10.poverenik.services;


import java.io.File;
import java.io.FileInputStream;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;

import projectXML.team10.poverenik.repositories.ResenjeRepository;
import projectXML.team10.poverenik.util.DOMParser;
import projectXML.team10.poverenik.util.GenerateHTMLAndPDF;

@Service
public class ResenjeService {

	@Autowired
	private GenerateHTMLAndPDF generateHTMLAndPDF;

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

	public String generatePDFResenje(String id) throws Exception {
		return generateHTMLAndPDF.generatePDFResenje(id);
	}

	public String generateHTMLResenje(String id) throws Exception {
		return generateHTMLAndPDF.generateHTMLResenje(id);
	}
	
	public String getXSLTResenje(String id) throws Exception {
		String url = generateHTMLAndPDF.generateHTMLResenje(id);
		File file = new File(url);
		FileInputStream fileInputStream = new FileInputStream(file);
		return IOUtils.toString(fileInputStream, "UTF-8");
	}

}
