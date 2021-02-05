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
		String id = UUID.randomUUID().toString().split("-")[4];
		elem.setAttribute("broj_rešenja", id);
		elem.setAttribute("about", "http://localhost:4200/resenja/" + id);
		String tip = elem.getAttribute("tip_rešenja");
		String idZalbe = elem.getAttribute("broj_žalbe");
		
		nodes = doc.getElementsByTagName("res:žalioc");
		elem = (Element) nodes.item(0);
		nodes = elem.getElementsByTagName("common:ime");
		elem = (Element) nodes.item(0);
		String ime = elem.getTextContent();
		
		nodes = doc.getElementsByTagName("res:žalioc");
		elem = (Element) nodes.item(0);
		nodes = elem.getElementsByTagName("common:prezime");
		elem = (Element) nodes.item(0);
		String prezime = elem.getTextContent();
		
		nodes = doc.getElementsByTagName("res:žalioc");
		elem = (Element) nodes.item(0);
		
		elem.setAttribute("property", "pred:podnosilac_zalbe");
		elem.setAttribute("content", ime + " " + prezime);
		
		nodes = doc.getElementsByTagName("res:naziv");
		elem = (Element) nodes.item(0);
		String naziv = elem.getTextContent();
		nodes = doc.getElementsByTagName("res:organ");
		elem = (Element) nodes.item(0);
		
		elem.setAttribute("property", "pred:organ_protiv_kojeg_je_zalba");
		elem.setAttribute("content", naziv);
		
		nodes = doc.getElementsByTagName("res:datum_žalbe");
		elem = (Element) nodes.item(0);
		
		elem.setAttribute("property", "pred:datum_zalbe");
		elem.setAttribute("datatype", "xs:date");
		
		nodes = doc.getElementsByTagName("res:datum_rešenja");
		elem = (Element) nodes.item(0);
		
		elem.setAttribute("property", "pred:datum_resenja");
		elem.setAttribute("datatype", "xs:date");
		
		nodes = doc.getElementsByTagName("res:poverenik");
		elem = (Element) nodes.item(0);
		nodes = elem.getElementsByTagName("common:ime");
		elem = (Element) nodes.item(0);
		ime = elem.getTextContent();
		
		nodes = doc.getElementsByTagName("res:poverenik");
		elem = (Element) nodes.item(0);
		nodes = elem.getElementsByTagName("common:prezime");
		elem = (Element) nodes.item(0);
		prezime = elem.getTextContent();
		
		nodes = doc.getElementsByTagName("res:poverenik");
		elem = (Element) nodes.item(0);
		
		elem.setAttribute("property", "pred:poverenik");
		elem.setAttribute("content", ime + " " + prezime);
		String type, db;
		if(tip.equals("žalba_ćutanja")) {
			type = "/zalbe-na-cutanje";
			db = "/zalbe-cutanje";
		}
		else {
			type = "/zalbe-na-odluku";
			db = "/zalbe-na-odluku";
		}
		FusekiWriter.updateZalbaWithStatus(true, idZalbe, type, db);
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
	
	public ArrayList<String> getAll(String poverenik) {
		return fusekiWriter.readAllResenja("/resenja", poverenik);
	}

	public ArrayList<String> getAll() {
		return fusekiWriter.readAllDocuments("/resenja");
	}

}
