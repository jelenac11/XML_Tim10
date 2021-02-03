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
import projectXML.team10.poverenik.models.zalbaCutanje.ZalbaNaCutanje;
import projectXML.team10.poverenik.repositories.ZalbaCutanjeRepository;
import projectXML.team10.poverenik.util.FusekiWriter;
import projectXML.team10.poverenik.util.GenerateHTMLAndPDF;
import projectXML.team10.poverenik.util.MarshallerFactory;
import projectXML.team10.poverenik.util.MetadataExtractor;

@Service
public class ZalbaCutanjeService {

	private static String schemaPath = "src/main/resources/static/schemas/zalba_cutanja.xsd";
	private static String contextPath = "projectXML.team10.poverenik.models.zalbaCutanje";
	@Autowired
	private ZalbaCutanjeRepository zalbaCutanjeRepository;
	@Autowired
	private MetadataExtractor metadataExtractor;
	@Autowired
	private FusekiWriter fusekiWriter;
	@Autowired
	private GenerateHTMLAndPDF generateHTMLAndPDF;
	@Autowired
	private MarshallerFactory marshallerFactory;

	public ZalbaNaCutanje getZalba(String id) throws Exception {
		ZalbaNaCutanje zalba = zalbaCutanjeRepository.getById(id);
		return zalba;
	}

	public ZalbaNaCutanje create(ZalbaNaCutanje zalba) throws Exception {
		Korisnik current = (Korisnik) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String id = UUID.randomUUID().toString();
		zalba.setId(id);
		zalba.setBrojZalbe(id.split("-")[4] + "-" + new Date().toInstant().atZone(ZoneId.systemDefault()).getMonthValue() + "/2021");
		zalbaCutanjeRepository.save(zalba);
		zalba.getOrganProtivKojegJeZalba().setProperty("pred:organ_protiv_kojeg_je_zalba");
		zalba.getPodaciOZalbi().getPodnosilacZalbe().setProperty("pred:podnosilac_zalbe");
		zalba.getPodaciOZalbi().getDatumPodnosenja().setDatatype("xs:date");
		zalba.getPodaciOZalbi().getDatumPodnosenja().setProperty("pred:datum_podnosenja");
		zalba.getPodaciOZalbi().getMesto().setDatatype("xs:string");
		zalba.getPodaciOZalbi().getMesto().setProperty("pred:mesto_podnosenja");
		zalba.setVocab("http://www.projekat.org/predicate");
		zalba.setAbout("http://localhost:4200/zalbe-cutanje/" + id);
		zalba.getOrganProtivKojegJeZalba().setContent(zalba.getOrganProtivKojegJeZalba().getNaziv());
		zalba.getPodaciOZalbi().getPodnosilacZalbe().setContent(current.getEmail());
		Marshaller marshaller = marshallerFactory.createMarshaller(contextPath, schemaPath);
		StringWriter sw = new StringWriter();
		marshaller.marshal(zalba, sw);
		String xmlString = sw.toString();
		System.out.println(xmlString);
		metadataExtractor.extractMetadata(xmlString);
		FusekiWriter.updateZalbaWithStatus(false, zalba.getId(),"/zalbe-na-cutanje", "/zalbe-cutanje");
		FusekiWriter.saveRDF("/zalbe-na-cutanje");
		return zalba;
	}
	
	public String generatePDFZalbaCutanje(String id) throws Exception {
		return generateHTMLAndPDF.generatePDFZalbaCutanje(id);
	}

	public String generateHTMLZalbaCutanje(String id) throws Exception {
		return generateHTMLAndPDF.generateHTMLZalbaCutanje(id);
	}
	
	public String getXSLTZalba(String id) throws Exception {
		String url = generateHTMLAndPDF.generateHTMLZalbaCutanje(id);
		File file = new File(url);
		FileInputStream fileInputStream = new FileInputStream(file);
		return IOUtils.toString(fileInputStream, "UTF-8");
	}

	public ArrayList<String> getZalbeByCurrentUser(String email) {
		return fusekiWriter.readAllZalbeCutanjeIdByEmail("/zalbe-na-cutanje", email);
	}
	
	public ArrayList<String> getAll() {
		return fusekiWriter.readAllZalbeCutanje("/zalbe-na-cutanje");
	}

}
