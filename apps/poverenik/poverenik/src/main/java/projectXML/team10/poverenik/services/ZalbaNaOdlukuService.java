package projectXML.team10.poverenik.services;

import java.io.File;
import java.io.FileInputStream;
import java.io.StringWriter;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.UUID;

import javax.xml.bind.Marshaller;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import projectXML.team10.poverenik.models.korisnik.Korisnik;
import projectXML.team10.poverenik.models.zalbaNaOdluku.ZalbaNaOdluku;
import projectXML.team10.poverenik.repositories.ZalbaNaOdlukuRepository;
import projectXML.team10.poverenik.util.FusekiWriter;
import projectXML.team10.poverenik.util.GenerateHTMLAndPDF;
import projectXML.team10.poverenik.util.MarshallerFactory;
import projectXML.team10.poverenik.util.MetadataExtractor;

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
	
	public ZalbaNaOdluku getZalba(String id) throws Exception {
		ZalbaNaOdluku zalba = zalbaNaOdlukuRepository.getById(id);
		return zalba;
	}

	public ZalbaNaOdluku create(ZalbaNaOdluku zalba) throws Exception {
		Korisnik current = (Korisnik) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String id = UUID.randomUUID().toString();
		zalba.setId(id);
		zalba.setBrojZalbe(id.split("-")[4] + "-" + new Date().toInstant().atZone(ZoneId.systemDefault()).getMonthValue() + "/2020");
		zalbaNaOdlukuRepository.save(zalba);
		zalba.setAbout("http://localhost:4200/zalbe-na-odluku/" + id);
		zalba.getPodaciOResenju().getNazivOrgana().setDatatype("xs:string");
		zalba.getPodaciOResenju().getNazivOrgana().setProperty("pred:organ_koji_je_doneo_odluku");
		zalba.getPodaciOZalbi().getPodnosilacZalbe().setProperty("pred:podnosilac_zalbe");
		zalba.getPodaciOZalbi().getPodnosilacZalbe().setContent(current.getEmail());
		zalba.getPodaciOZalbi().getDatumPodnosenja().setDatatype("xs:date");
		zalba.getPodaciOZalbi().getDatumPodnosenja().setProperty("pred:datum_podnosenja");
		zalba.getPodaciOZalbi().getMesto().setProperty("pred:mesto_podnosenja");
		zalba.getPodaciOZalbi().getMesto().setDatatype("xs:string");
		zalba.setVocab("http://www.projekat.org/predicate");
		Marshaller marshaller = marshallerFactory.createMarshaller(contextPath, schemaPath);
		StringWriter sw = new StringWriter();
		marshaller.marshal(zalba, sw);
		String xmlString = sw.toString();
		metadataExtractor.extractMetadata(xmlString);
		FusekiWriter.saveRDF("/zalbe-na-odluku");
		return zalba;
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
		return fusekiWriter.readAllZalbeNaOdluku("/zalbe-na-odluku");
	}
	
}
