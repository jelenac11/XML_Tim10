package projectXML.team10.poverenik.services;

import static java.time.temporal.TemporalAdjusters.firstDayOfYear;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.StringWriter;
import java.math.BigInteger;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Set;

import javax.xml.bind.Marshaller;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import projectXML.team10.poverenik.dto.SearchDTO;
import projectXML.team10.poverenik.models.izvestaj.Izvestaj;
import projectXML.team10.poverenik.models.izvestaj.Izvestaj.PodaciOZalbama;
import projectXML.team10.poverenik.models.izvestaj.TIzvestaj;
import projectXML.team10.poverenik.repositories.IzvestajRepository;
import projectXML.team10.poverenik.util.FusekiWriter;
import projectXML.team10.poverenik.util.GenerateHTMLAndPDF;
import projectXML.team10.poverenik.util.MarshallerFactory;
import projectXML.team10.poverenik.util.MetadataExtractor;
import projectXML.team10.poverenik.util.SearchOperations;

@Service
public class IzvestajService {

	private static String schemaPath = "src/main/resources/static/schemas/sema_izvestaj.xsd";
	private static String contextPath = "projectXML.team10.poverenik.models.izvestaj";
	@Autowired
	private IzvestajRepository izvestajRepository;
	@Autowired
	private ZalbaCutanjeService zalbaCutanjeService;
	@Autowired
	private MetadataExtractor metadataExtractor;
	@Autowired
	private FusekiWriter fusekiWriter;
	@Autowired
	private GenerateHTMLAndPDF generateHTMLAndPDF;
	@Autowired
	private MarshallerFactory marshallerFactory;
	@Autowired
	private SearchOperations searchOperations;

	public Izvestaj getIzvestaj(String id) throws Exception {
		Izvestaj izvestaj = izvestajRepository.getById(id);
		return izvestaj;
	}

	public TIzvestaj create(Izvestaj izvestaj) throws Exception {
		PodaciOZalbama pz = new PodaciOZalbama();
		System.out.println(izvestaj.getDatumPodnosenja().getValue());
		ArrayList<String> zalbeNaOdluku = fusekiWriter.readAllDocuments("zalbe-na-odluku");
		pz.setBrojZalbiNaOdluku(BigInteger.valueOf(zalbeNaOdluku.size()));
		
		LocalDate now = LocalDate.now(); 
        LocalDate firstDay = now.with(firstDayOfYear());
		
		pz.setZalbeNaCutanje(zalbaCutanjeService.getPodaciOZalbeCutanja(firstDay + ""));
		izvestaj.setPodaciOZalbama(pz);
		izvestaj.setId("http://localhost:4201/izvestaji/" + izvestaj.getId().split("/")[4]);
		izvestaj.setAbout("http://localhost:4201/izvestaji/" + izvestaj.getId().split("/")[4]);
		izvestajRepository.save(izvestaj);
		Marshaller marshaller = marshallerFactory.createMarshaller(contextPath, schemaPath);
		StringWriter sw = new StringWriter();
		marshaller.marshal(izvestaj, sw);
		String xmlString = sw.toString();
		metadataExtractor.extractMetadata(xmlString);
		FusekiWriter.saveRDF("/izvestaji");
		izvestaj.setId("http://localhost:4200/izvestaji/" + izvestaj.getId().split("/")[4]);
		izvestaj.setAbout("http://localhost:4200/izvestaji/" + izvestaj.getId().split("/")[4]);
		return new TIzvestaj(izvestaj);
	}
	
	public String generatePDFIzvestaj(String id) throws Exception {
		return generateHTMLAndPDF.generatePDFIzvestaj(id);
	}

	public String generateHTMLIzvestaj(String id) throws Exception {
		return generateHTMLAndPDF.generateHTMLIzvestaj(id);
	}
	
	public String getXSLTIzvestaj(String id) throws Exception {
		String url = generateHTMLAndPDF.generateHTMLIzvestaj(id);
		File file = new File(url);
		FileInputStream fileInputStream = new FileInputStream(file);
		return IOUtils.toString(fileInputStream, "UTF-8");
	}
	
	public ArrayList<String> getAll() {
		return fusekiWriter.readAllDocuments("/izvestaji");
	}

	public String getDocumentMetaDataByIdAsJSON(String izvestajId) throws FileNotFoundException {
		return fusekiWriter.getIzvestajMetaDataByIdAsJSON(izvestajId);
	}

	public String getDocumentMetaDataByIdAsXML(String izvestajId) throws FileNotFoundException {
		return fusekiWriter.getIzvestajMetaDataByIdAsXML(izvestajId);
	}

	public String getDocumentMetaDataByIdAsRDF(String izvestajId) throws FileNotFoundException {
		return fusekiWriter.getDocumentMetaDataByIdAsRDF("izvestaji", izvestajId, "izvestaji");
	}
	
	public Set<String> search(SearchDTO searchDTO) throws Exception {
		String[] metadata = searchDTO.getMetadata().split("and");
		String[] keyWordsAndPhrase = searchDTO.getKeyWord().split("and");

		ArrayList<String> searchResult = new ArrayList<String>();
		searchResult.addAll(searchPhraseAndKeyWords(keyWordsAndPhrase));
		searchResult.addAll(searchOperations.searchMetadata(metadata, searchDTO.getOperator(), "izvestaji"));

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
			ids.addAll(izvestajRepository.search(word.toLowerCase()));
		}

		return searchOperations.andOperator(keyWordsAndPhrase.length, ids);
	}
	
	public ArrayList<String> getAllIzvestaji() {
		return fusekiWriter.readAllDocuments("/izvestaji");
	}
}

