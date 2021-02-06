package projectXML.team10.poverenik.services;


import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Set;
import java.util.UUID;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

import projectXML.team10.poverenik.dto.SearchDTO;
import projectXML.team10.poverenik.repositories.ResenjeRepository;
import projectXML.team10.poverenik.util.AmazonSESSample;
import projectXML.team10.poverenik.util.DOMParser;
import projectXML.team10.poverenik.util.FusekiWriter;
import projectXML.team10.poverenik.util.GenerateHTMLAndPDF;
import projectXML.team10.poverenik.util.SearchOperations;

@Service
public class ResenjeService {

	@Autowired
	private GenerateHTMLAndPDF generateHTMLAndPDF;

	@Autowired
	private ResenjeRepository resenjeRepository;
	
	@Autowired
	private FusekiWriter fusekiWriter;
	
	@Autowired
	private AmazonSESSample amazonSESSample;
	
	@Autowired
	private SearchOperations searchOperations;
	
	public String getOdlukaPoverioca(String id) throws Exception {
		return resenjeRepository.getById(id);
	}

	public String create(String odluka) throws Exception {
		Document doc = DOMParser.parse(odluka);
		NodeList nodes = doc.getElementsByTagName("res:odluka_poverioca");
		Element elem = (Element) nodes.item(0);
		String id = UUID.randomUUID().toString().split("-")[4];
		elem.setAttribute("broj_rešenja", id);
		elem.setAttribute("about", "http://localhost:4201/resenja/" + id);
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
		FusekiWriter.insertReference(id,db + "/" + idZalbe);
		String xml = resenjeRepository.save(doc);
		sendMail("milanm2998@gmail.com",id);
		return xml;
	}
	
	@Async
	public void sendMail(String recipient, String id) throws Exception {
		String htmlPath = generateHTMLAndPDF.generateHTMLResenje(id);
		String pdfPath = generateHTMLAndPDF.generatePDFResenje(id);

		amazonSESSample.sendMailWhenResolved(recipient, htmlPath, pdfPath);
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

	public String getDocumentMetaDataByIdAsJSON(String id) throws FileNotFoundException {
		return fusekiWriter.getResenjaMetaDataByIdAsJSON(id);
	}

	public String getDocumentMetaDataByIdAsXML(String id) throws FileNotFoundException {
		return fusekiWriter.getResenjaMetaDataByIdAsXML(id);
	}

	public String getDocumentMetaDataByIdAsRDF(String id) throws FileNotFoundException {
		return fusekiWriter.getResenjaMetaDataByIdAsRDF("resenja", id, "resenja");
	}

	public ArrayList<String> getDocumentIdThatIsReferencedByDocumentWithThisId(String id) {
		return fusekiWriter.getDocumentIdThatIsReferencedByDocumentWithThisId(id);
	}
	
	public Set<String> search(SearchDTO searchDTO) throws Exception {
		String[] metadata = searchDTO.getMetadata().split("and");
		String[] keyWordsAndPhrase = searchDTO.getKeyWord().split("and");

		ArrayList<String> searchResult = new ArrayList<String>();
		searchResult.addAll(searchPhraseAndKeyWords(keyWordsAndPhrase));
		searchResult.addAll(searchOperations.searchMetadata(metadata, searchDTO.getOperator(), "resenja"));

		if (metadata.length > 0 && !metadata[0].isEmpty() && keyWordsAndPhrase.length > 0
				&& !keyWordsAndPhrase[0].isEmpty()) {
			return searchOperations.andOperator(2, searchResult);
		} else {
			return searchOperations.andOperator(1, searchResult);
		}
	}
	
	private Set<String> searchPhraseAndKeyWords(String[] keyWordsAndPhrase) throws Exception {
		ArrayList<String> ids = new ArrayList<String>();
		for (String word : keyWordsAndPhrase) {
			if (word.isEmpty()) {
				continue;
			}
			word = word.trim();
			if (!word.startsWith("\"")) {
				word = "\"" + word;
			}
			if (!word.endsWith("\"")) {
				word = word + "\"";
			}
			ids.addAll(resenjeRepository.search(word.toLowerCase()));
		}

		return searchOperations.andOperator(keyWordsAndPhrase.length, ids);
	}
	
	public ArrayList<String> getAllResenja() {
		return fusekiWriter.readAllDocuments("/resenja");
	}
	
	public ArrayList<String> getDocumentIdThatHasReferenceOnOtherDocumentWithThisIdZalbaCutanje(String id) {
		String object = String
				.format("\"http://localhost:4201/zalbe-cutanje/%s\"^^<http://www.w3.org/2000/01/rdf-schema#Literal>", id);
		return fusekiWriter.getDocumentIdThatHasReferenceOnOtherDocumentWithThisId(object, "/resenja");
	}
	
	public ArrayList<String> getDocumentIdThatHasReferenceOnOtherDocumentWithThisIdZalbaCNaOdluku(String id) {
		String object = String
				.format("\"http://localhost:4201/zalbe-na-odluku/%s\"^^<http://www.w3.org/2000/01/rdf-schema#Literal>", id);
		return fusekiWriter.getDocumentIdThatHasReferenceOnOtherDocumentWithThisId(object, "/resenja");
	}

}
