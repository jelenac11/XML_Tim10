package projectXML.team10.poverenik.services;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.FileNotFoundException;
import java.io.StringWriter;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;

import javax.xml.bind.Marshaller;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.concurrent.ConcurrentTaskScheduler;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import projectXML.team10.poverenik.dto.SearchDTO;
import projectXML.team10.poverenik.models.korisnik.Korisnik;
import projectXML.team10.poverenik.models.zalbaNaOdluku.ZalbaNaOdluku;
import projectXML.team10.poverenik.repositories.ZalbaNaOdlukuRepository;
import projectXML.team10.poverenik.util.FusekiWriter;
import projectXML.team10.poverenik.util.GenerateHTMLAndPDF;
import projectXML.team10.poverenik.util.MarshallerFactory;
import projectXML.team10.poverenik.util.MetadataExtractor;
import projectXML.team10.poverenik.util.SearchOperations;

@Service
public class ZalbaNaOdlukuService {
	
	private static String schemaPath = "src/main/resources/static/schemas/zalba_na_odluku.xsd";
	private static String contextPath = "projectXML.team10.poverenik.models.zalbaNaOdluku";
	@Autowired
	private ZalbaNaOdlukuRepository zalbaNaOdlukuRepository;
	@Autowired
	private MetadataExtractor metadataExtractor;
	@Autowired
	private GenerateHTMLAndPDF generateHTMLAndPDF;
	@Autowired
	private FusekiWriter fusekiWriter;
	@Autowired
	private MarshallerFactory marshallerFactory;
	private TaskScheduler scheduler;
	@Autowired
	private SearchOperations searchOperations;
	
	public ZalbaNaOdluku getZalba(String id) throws Exception {
		ZalbaNaOdluku zalba = zalbaNaOdlukuRepository.getById(id);
		return zalba;
	}

	public ZalbaNaOdluku create(ZalbaNaOdluku zalba) throws Exception {
		Korisnik current = (Korisnik) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String id = UUID.randomUUID().toString();
		zalba.setId("http://localhost:4201/zalbe-na-odluku/" + id);
		zalba.setBrojZalbe(id.split("-")[4] + "-" + new Date().toInstant().atZone(ZoneId.systemDefault()).getMonthValue() + "/2020");
		zalba.setBrojZahteva("http://localhost:4200/zahtev/" + zalba.getBrojZahteva());
		zalba.setAbout("http://localhost:4201/zalbe-na-odluku/" + id);
		zalba.getPodaciOResenju().getNazivOrgana().setDatatype();
		zalba.getPodaciOResenju().getNazivOrgana().setProperty();
		zalba.getPodaciOZalbi().getPodnosilacZalbe().setProperty();
		zalba.getPodaciOZalbi().getPodnosilacZalbe().setContent(current.getEmail());
		zalba.getPodaciOZalbi().getDatumPodnosenja().setDatatype();
		zalba.getPodaciOZalbi().getDatumPodnosenja().setProperty();
		zalba.getPodaciOZalbi().getMesto().setProperty();
		zalba.getPodaciOZalbi().getMesto().setDatatype();
		zalba.setVocab();
		zalba.setProperty();
		zalba.setContent(zalba.getBrojZahteva());
		zalbaNaOdlukuRepository.save(zalba);
		Marshaller marshaller = marshallerFactory.createMarshaller(contextPath, schemaPath);
		StringWriter sw = new StringWriter();
		marshaller.marshal(zalba, sw);
		String xmlString = sw.toString();
		metadataExtractor.extractMetadata(xmlString);
		FusekiWriter.updateData(false, zalba.getId().split("/")[4],"/zalbe-na-odluku", "/zalbe-na-odluku", "odgovorena");
		FusekiWriter.updateData(false, zalba.getId().split("/")[4],"/zalbe-na-odluku", "/zalbe-na-odluku", "status");

		FusekiWriter.saveRDF("/zalbe-na-odluku");
		Runnable exampleRunnable = new Runnable(){
		    @Override
		    public void run() {
		    	try {
					FusekiWriter.updateData(true, zalba.getId(),"/zalbe-na-odluku", "/zalbe-na-odluku", "odgovorena");
					System.out.println("Uspeo");
		    	} catch (IOException e) {
					e.printStackTrace();
				}
		    }
		};
		executeTask(exampleRunnable);
		return zalba;
	}
	
	@Async
	public void executeTask(Runnable exampleRunnable) {
	    ScheduledExecutorService localExecutor = Executors.newSingleThreadScheduledExecutor();
	    scheduler = new ConcurrentTaskScheduler(localExecutor);
	    long millis = System.currentTimeMillis();
	    millis += 1000L * 60 * 10; //10 minuta
	    scheduler.schedule(exampleRunnable,
	            new Date(millis));
	}
	
	public String generatePDFZalbaNaOdluku(String id) throws Exception {
		return generateHTMLAndPDF.generatePDFZalbaNaOdluku(id);
	}

	public String generateHTMLZalbaNaOdluku(String id) throws Exception {
		return generateHTMLAndPDF.generateHTMLZalbaNaOdluku(id);
	}
	
	public String getXSLTZalba(String id) throws Exception {
		String url = generateHTMLAndPDF.generateHTMLZalbaNaOdluku(id);
		File file = new File(url);
		FileInputStream fileInputStream = new FileInputStream(file);
		return IOUtils.toString(fileInputStream, "UTF-8");
	}
	
	public ArrayList<String> getZalbeByCurrentUser(String email) {
		return fusekiWriter.readAllZalbeNaOdlukuIdByEmail("/zalbe-na-odluku", email);
	}
	
	public ArrayList<String> getAll() {
		return fusekiWriter.readAllDocuments("/zalbe-na-odluku");
	}

	public Collection<? extends String> getZalbeNotAnswered() throws Exception {
		ArrayList<String> items = new ArrayList<String>();
		for(String zalba : fusekiWriter.getZalbeNotAnswered("/zalbe-na-odluku")) {
			String id = zalba.split("/")[4];
			items.add(id+ "|" +zalbaNaOdlukuRepository.getById(id).getBrojZahteva());
		}
		return items;
	}

	public void odustaniOdZalbe(String zalbaId) throws IOException {
		FusekiWriter.updateData(true, zalbaId,"/zalbe-na-odluku", "/zalbe-na-odluku", "odgovorena");
		FusekiWriter.updateData(true, zalbaId,"/zalbe-na-odluku", "/zalbe-na-odluku", "status");
	}
	
	public void odbiZalbu(String zalbaId) throws IOException {
		
		FusekiWriter.updateData(false, zalbaId, "/zalbe-na-odluku", "/zalbe-na-odluku", "status");
		FusekiWriter.updateData(true, zalbaId, "/zalbe-na-odluku", "/zalbe-na-odluku", "odgovorena");
	}
	
	public String getDocumentMetaDataByIdAsJSON(String zalbaId) throws FileNotFoundException {
		return fusekiWriter.getZalbaNaOdlukuMetaDataByIdAsJSON(zalbaId);
	}

	public String getDocumentMetaDataByIdAsXML(String zalbaId) throws FileNotFoundException {
		return fusekiWriter.getZalbaNaOdlukuMetaDataByIdAsXML(zalbaId);
	}

	public String getDocumentMetaDataByIdAsRDF(String zahtevId) throws FileNotFoundException {
		return fusekiWriter.getDocumentMetaDataByIdAsRDF("zalbe-na-odluku", zahtevId, "zalbe-na-odluku");
	}

	public ArrayList<String> getAllowed() {
		return fusekiWriter.readAllAllowed("/zalbe-na-odluku");
	
	public Set<String> search(SearchDTO searchDTO) throws Exception {
		String[] metadata = searchDTO.getMetadata().split("and");
		String[] keyWordsAndPhrase = searchDTO.getKeyWord().split("and");

		ArrayList<String> searchResult = new ArrayList<String>();
		searchResult.addAll(searchPhraseAndKeyWords(keyWordsAndPhrase));
		searchResult.addAll(searchOperations.searchMetadata(metadata, searchDTO.getOperator(), "zalbe-na-odluku"));

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
			ids.addAll(zalbaNaOdlukuRepository.search(word.toLowerCase()));
		}

		return searchOperations.andOperator(keyWordsAndPhrase.length, ids);
	}
	
	public ArrayList<String> getAllZalbeNaOdluku() {
		return fusekiWriter.readAllDocuments("/zalbe-na-odluku");
	}
	
	public ArrayList<String> getDocumentIdThatIsReferencedByDocumentWithThisId(String id) {
		String subject = String.format("http://localhost:4201/zalbe-na-odluku/%s", id);
		String predicate = "http://www.projekat.org/predicate/zahtev_na_koji_se_odnosi_zalba";
		return fusekiWriter.getDocumentIdThatIsReferencedByDocumentWithThisId(subject, predicate, "/zalbe-na-odluku");
	}
}
