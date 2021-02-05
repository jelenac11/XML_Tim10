package projectXML.team10.poverenik.services;


import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.UUID;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

import projectXML.team10.poverenik.repositories.ResenjeRepository;
import projectXML.team10.poverenik.util.DOMParser;
import projectXML.team10.poverenik.util.FusekiWriter;
import projectXML.team10.poverenik.util.GenerateHTMLAndPDF;

@Service
public class ResenjeService {

	@Autowired
	private GenerateHTMLAndPDF generateHTMLAndPDF;

	@Autowired
	private ResenjeRepository resenjeRepository;
	
	@Autowired
	private FusekiWriter fusekiWriter;
	
	public String getOdlukaPoverioca(String id) throws Exception {
		return resenjeRepository.getById(id);
	}

	public String create(String odluka) throws Exception {
		Document doc = DOMParser.parse(odluka);
		NodeList nodes = doc.getElementsByTagName("res:odluka_poverioca");
		Element elem = (Element) nodes.item(0);
		String rng = UUID.randomUUID().toString();
		elem.setAttribute("broj_rešenja", rng.split("-")[4]);
//		id = id.split("-")[4]  + "/2020" + "-" + new Date().toInstant().atZone(ZoneId.systemDefault()).getMonthValue();
//		doc.getDocumentElement().setAttribute("broj_rešenja", id);
		return resenjeRepository.save(doc);
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
	
	public String generateHTML(String xml) throws Exception {
		String url = generateHTMLAndPDF.generateHTMLResenjeXML(xml);
		File file = new File(url);
		FileInputStream fileInputStream = new FileInputStream(file);
		return IOUtils.toString(fileInputStream, "UTF-8");
	}
	
	public ArrayList<String> getResenjaByCurrentUser(String email) {
		return fusekiWriter.readAllResenjaIdByEmail("/resenja", email);
	}
	
	public ArrayList<String> getAll() {
		return fusekiWriter.readAllDocuments("/resenja");
	}

}
