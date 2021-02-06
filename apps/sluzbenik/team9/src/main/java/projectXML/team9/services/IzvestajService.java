package projectXML.team9.services;

import static java.time.temporal.TemporalAdjusters.firstDayOfYear;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.StringWriter;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Set;
import java.util.UUID;

import javax.xml.bind.Marshaller;
import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeConstants;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import projectXML.team9.dto.SearchDTO;
import projectXML.team9.models.izvestaj.Izvestaj;
import projectXML.team9.models.izvestaj.Izvestaj.DatumPodnosenja;
import projectXML.team9.models.izvestaj.Izvestaj.Kreator;
import projectXML.team9.models.izvestaj.Izvestaj.PodaciOZahtevima;
import projectXML.team9.models.korisnik.Korisnik;
import projectXML.team9.repositories.IzvestajRepository;
import projectXML.team9.util.Fuseki;
import projectXML.team9.util.GenerateHTMLAndPDF;
import projectXML.team9.util.MarshallerFactory;
import projectXML.team9.util.MetadataExtractor;

@Service
public class IzvestajService {

	private static String schemaPath = "src/main/resources/static/schemas/sema_izvestaj.xsd";
	private static String contextPath = "projectXML.team9.models.izvestaj";
	
	@Autowired
	public IzvestajRepository izvestajRepository;
	@Autowired
	private MetadataExtractor metadataExtractor;
	@Autowired
	private MarshallerFactory marshallerFactory;
	@Autowired
	private Fuseki fusekiWriter;
	@Autowired
	private GenerateHTMLAndPDF generateHTMLAndPDF;
	@Autowired
	private projectXML.team9.util.SearchOperations searchOperations;
	
	public Izvestaj create() throws Exception {
		Korisnik current = (Korisnik) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Izvestaj izvestaj = new Izvestaj();
        String id = UUID.randomUUID().toString();
        izvestaj.setId("http://localhost:4200/izvestaji/" + id);
        izvestaj.setVocab();
        izvestaj.setAbout(izvestaj.getId());
        
        Kreator k = new Kreator();
        k.setProperty();
        k.setValue(current.getEmail());
        k.setContent(current.getEmail());
        izvestaj.setKreator(k);
        
        DatumPodnosenja dp = new DatumPodnosenja();
        dp.setDatatype();
        dp.setProperty();
        GregorianCalendar c = new GregorianCalendar();
        c.setTime(new Date());
        XMLGregorianCalendar currDate = null;
		try {
			currDate = DatatypeFactory.newInstance().newXMLGregorianCalendar(c);
			currDate.setTimezone(DatatypeConstants.FIELD_UNDEFINED);
		} catch (DatatypeConfigurationException e) {
			e.printStackTrace();
		}
        dp.setValue(currDate);
        izvestaj.setDatumPodnosenja(dp);
        
        LocalDate now = LocalDate.now(); 
        LocalDate firstDay = now.with(firstDayOfYear());
        
        PodaciOZahtevima pz = new PodaciOZahtevima();
        pz.setBrojOdbijenihZahteva(fusekiWriter.getNumberOfOdbijeniZahtevi(firstDay + "T00:00:00"));
        System.out.println("OVDEEEEEEEEE");
        pz.setBrojUsvojenihZahteva(fusekiWriter.getNumberOfUsvojeniZahtevi(firstDay + "T00:00:00"));
        pz.setBrojZahtevaNaKojeNijeOdgovoreno(fusekiWriter.getNumberOfNeodgovoreniZahtevi(firstDay + "T00:00:00"));
        izvestaj.setPodaciOZahtevima(pz);
        return izvestaj;
	}
	
	public Izvestaj getIzvestaj(String id) throws Exception {
		Izvestaj izvestaj = izvestajRepository.getById(id);
		return izvestaj;
	}

	public String getXSLTIzvestaj(String id) throws Exception {
		String url = generateHTMLAndPDF.generateHTMLIzvestaj(id);
		File file = new File(url);
		FileInputStream fileInputStream = new FileInputStream(file);
		return IOUtils.toString(fileInputStream, "UTF-8");
	}

	public String generatePDFIzvestaj(String id) throws Exception {
		return generateHTMLAndPDF.generatePDFIzvestaj(id);
	}

	public String generateHTMLIzvestaj(String id) throws Exception {
		return generateHTMLAndPDF.generateHTMLIzvestaj(id);
	}

	public void save(Izvestaj izvestaj) throws Exception {
		izvestajRepository.save(izvestaj, izvestaj.getId().split("/")[4]);
        Marshaller marshaller = marshallerFactory.createMarshaller(contextPath, schemaPath);
		StringWriter sw = new StringWriter();
		marshaller.marshal(izvestaj, sw);
		String xmlString = sw.toString();
		metadataExtractor.extractMetadata(xmlString);
		fusekiWriter.saveRDF("/izvestaji");
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
}
