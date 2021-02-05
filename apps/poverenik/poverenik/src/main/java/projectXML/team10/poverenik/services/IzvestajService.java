package projectXML.team10.poverenik.services;

import static java.time.temporal.TemporalAdjusters.firstDayOfYear;

import java.io.File;
import java.io.FileInputStream;
import java.io.StringWriter;
import java.math.BigInteger;
import java.time.LocalDate;
import java.util.ArrayList;

import javax.xml.bind.Marshaller;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import projectXML.team10.poverenik.models.izvestaj.Izvestaj;
import projectXML.team10.poverenik.models.izvestaj.Izvestaj.PodaciOZalbama;
import projectXML.team10.poverenik.models.izvestaj.TIzvestaj;
import projectXML.team10.poverenik.repositories.IzvestajRepository;
import projectXML.team10.poverenik.util.FusekiWriter;
import projectXML.team10.poverenik.util.GenerateHTMLAndPDF;
import projectXML.team10.poverenik.util.MarshallerFactory;
import projectXML.team10.poverenik.util.MetadataExtractor;

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
		
		izvestajRepository.save(izvestaj);
		Marshaller marshaller = marshallerFactory.createMarshaller(contextPath, schemaPath);
		StringWriter sw = new StringWriter();
		marshaller.marshal(izvestaj, sw);
		String xmlString = sw.toString();
		metadataExtractor.extractMetadata(xmlString);
		FusekiWriter.saveRDF("/izvestaji");
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

}

