package projectXML.team9.services;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.StringWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Set;
import java.util.UUID;

import javax.xml.bind.Marshaller;
import javax.xml.datatype.DatatypeFactory;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import projectXML.team9.dto.SearchDTO;
import projectXML.team9.models.zahtev.ZahtevGradjana;
import projectXML.team9.repositories.ZahtevRepository;
import projectXML.team9.util.Fuseki;
import projectXML.team9.util.GenerateHTMLAndPDF;
import projectXML.team9.util.MarshallerFactory;
import projectXML.team9.util.MetadataExtractor;
import projectXML.team9.util.PreProcessDataForEmail;
import projectXML.team9.util.SearchOperations;

@Service
public class ZahtevService {

	private static String schemaPath = "src/main/resources/static/schemas/sema_zahtev.xsd";

	private static String contextPath = "projectXML.team9.models.zahtev";

	@Autowired
	private MetadataExtractor metadataExtractor;

	@Autowired
	private MarshallerFactory marshallerFactory;

	@Autowired
	private Fuseki fusekiWriter;

	@Autowired
	private ZahtevRepository zahtevRepository;

	@Autowired
	private GenerateHTMLAndPDF generateHTMLAndPDF;

	@Autowired
	private PreProcessDataForEmail preProcessDataForEmail;

	@Autowired
	private SearchOperations searchOperations;

	public ZahtevGradjana getZahtev(String id) throws Exception {
		ZahtevGradjana zahtev = zahtevRepository.getById(id);
		return zahtev;
	}

	public String getXSLTZahtev(String id) throws Exception {
		String url = generateHTMLAndPDF.generateHTMLZahtev(id);
		File file = new File(url);
		FileInputStream fileInputStream = new FileInputStream(file);
		return IOUtils.toString(fileInputStream, "UTF-8");
	}

	public ZahtevGradjana create(ZahtevGradjana zahtevGradjana, String email) throws Exception {
		String id = UUID.randomUUID().toString();
		zahtevGradjana.setId(id);
		zahtevGradjana.setVocab();
		zahtevGradjana.setAbout(id);
		zahtevGradjana.getInformacijeVezaneZaZahtev().getMesto().setProperty();
		zahtevGradjana.getInformacijeVezaneZaZahtev().getMesto().setDatatype("xs:string");
		zahtevGradjana.getInformacijeVezaneZaZahtev().getDatum().setDatatype("xs:dateTime");
		zahtevGradjana.getInformacijeVezaneZaZahtev().getDatum().setValue(DatatypeFactory.newInstance().newXMLGregorianCalendar(new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss").format(new Date())));
		zahtevGradjana.getInformacijeVezaneZaZahtev().getDatum().setProperty();
		zahtevGradjana.getOrgan().setProperty();
		zahtevGradjana.getOrgan().setContent(zahtevGradjana.getOrgan().getNaziv());
		zahtevGradjana.getTrazilac().setProperty();
		zahtevGradjana.getTrazilac().setContent(email);
		zahtevRepository.save(zahtevGradjana, id);
		Marshaller marshaller = marshallerFactory.createMarshaller(contextPath, schemaPath);
		StringWriter sw = new StringWriter();
		marshaller.marshal(zahtevGradjana, sw);
		String xmlString = sw.toString();
		metadataExtractor.extractMetadata(xmlString);
		fusekiWriter.saveRDF("/zahtevi");
		return zahtevGradjana;
	}

	public String generatePDFZahtev(String id) throws Exception {
		return generateHTMLAndPDF.generatePDFZahtev(id);
	}

	public String generateHTMLZahtev(String id) throws Exception {
		return generateHTMLAndPDF.generateHTMLZahtev(id);
	}

	public ArrayList<String> getZahtevi(String email) {
		return fusekiWriter.readAllZahteviIdByEmail("/zahtevi", email);
	}

	public ArrayList<String> getUnansweredZahtevi() {
		return fusekiWriter.readAllUnansweredZahteviId("/zahtevi");
	}

	public void declineZahtev(String zahtevId) throws Exception {
		fusekiWriter.updateZahtevWithStatus(false, zahtevId);
		ZahtevGradjana zahtevGradjana = getZahtev(zahtevId.split("/")[4]);
		preProcessDataForEmail.sendMailWhenZahtevIsDenied(zahtevGradjana.getTrazilac().getContent());
	}

	public void acceptZahtev(String zahtevId) {
		fusekiWriter.updateZahtevWithStatus(true, zahtevId);

	}

	public String getDocumentMetaDataByIdAsJSON(String zahtevId) throws FileNotFoundException {
		return fusekiWriter.getZahtevMetaDataByIdAsJSON(zahtevId);
	}

	public String getDocumentMetaDataByIdAsXML(String zahtevId) throws FileNotFoundException {
		return fusekiWriter.getZahtevMetaDataByIdAsXML(zahtevId);
	}

	public ArrayList<String> readAllRejectedZahteviIdByCitizenEmail(String email) {
		return fusekiWriter.readAllRejectedZahteviIdByCitizenEmail(email);
	}
	
	public ArrayList<String> readAllZahteviForZalbaCutanje(String email) {
		Date now = new Date();
		Calendar c = Calendar.getInstance();
        c.setTime(now);
        c.add(Calendar.MINUTE, -10);
        Date minusDeset = c.getTime();
		
		DateFormat datumFormat = new SimpleDateFormat("yyyy-MM-dd");
		DateFormat vremeFormat = new SimpleDateFormat("HH:mm:ss");
        String strDate = datumFormat.format(minusDeset) + "T" + vremeFormat.format(minusDeset);
		return fusekiWriter.readAllZahteviForZalbaCutanje(strDate, email);
	}
	

	public Set<String> search(SearchDTO searchDTO) throws Exception {
		String[] metadata = searchDTO.getMetadata().split("and");
		String[] keyWordsAndPhrase = searchDTO.getKeyWord().split("and");

		ArrayList<String> searchResult = new ArrayList<String>();
		searchResult.addAll(searchPhraseAndKeyWords(keyWordsAndPhrase));
		searchResult.addAll(searchOperations.searchMetadata(metadata, searchDTO.getOperator(), "zahtevi"));

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
			ids.addAll(zahtevRepository.search(word.toLowerCase()));
		}

		return searchOperations.andOperator(keyWordsAndPhrase.length, ids);
	}

	public ArrayList<String> getAllZahtevi() {
		return fusekiWriter.readAllDocuments("/zahtevi");
	}
}
