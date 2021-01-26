package projectXML.team9.services;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.UUID;

import javax.xml.bind.Marshaller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import projectXML.team9.models.zahtev.ZahtevGradjana;
import projectXML.team9.repositories.ZahtevRepository;
import projectXML.team9.util.Fuseki;
import projectXML.team9.util.MarshallerFactory;
import projectXML.team9.util.MetadataExtractor;
import projectXML.team9.util.XMLTransformations;

@Service
public class ZahtevService {

	private static String schemaPath = "src/main/resources/static/schemas/sema_zahtev.xsd";

	private static String contextPath = "projectXML.team9.models.zahtev";

	private static final String INPUT_FILE = "src/main/resources/static/data/documents/zahtev.xml";

	private static final String XSLT_FILE = "src/main/resources/static/data/xslt/zahtev.xsl";

	private static final String XSLFO_FILE = "src/main/resources/static/data/xsl-fo/zahtev_fo.xsl";

	private static final String HTML_FILE = "src/main/resources/static/gen/itext/";

	private static final String OUTPUT_FILE = "src/main/resources/static/gen/fo/";

	@Autowired
	private MetadataExtractor metadataExtractor;

	@Autowired
	private MarshallerFactory marshallerFactory;

	@Autowired
	private Fuseki fusekiWriter;

	@Autowired
	private ZahtevRepository zahtevRepository;

	@Autowired
	private XMLTransformations xmlTransformations;

	public ZahtevGradjana getZahtev(String id) throws Exception {
		ZahtevGradjana zahtev = zahtevRepository.getById(id);
		return zahtev;
	}

	public ZahtevGradjana create(ZahtevGradjana zahtevGradjana, String email) throws Exception {
		String id = UUID.randomUUID().toString();
		zahtevGradjana.setId(id);
		zahtevGradjana.setVocab();
		zahtevGradjana.setAbout(id);
		zahtevGradjana.getInformacijeVezaneZaZahtev().getMesto().setProperty();
		zahtevGradjana.getInformacijeVezaneZaZahtev().getMesto().setDatatype("xs:string");
		zahtevGradjana.getInformacijeVezaneZaZahtev().getDatum().setDatatype("xs:date");
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
		ZahtevGradjana zahtev = getZahtev(id);
		zahtevRepository.saveToFile(zahtev, INPUT_FILE);
		xmlTransformations.generatePDF(INPUT_FILE, XSLFO_FILE, OUTPUT_FILE + id + ".pdf");
		return OUTPUT_FILE + id + ".pdf";
	}

	public String generateHTMLZahtev(String id) throws Exception {
		ZahtevGradjana zahtev = getZahtev(id);
		zahtevRepository.saveToFile(zahtev, INPUT_FILE);
		xmlTransformations.generateHTML(INPUT_FILE, XSLT_FILE, HTML_FILE + id + ".html");
		return HTML_FILE + id + ".html";
	}

	public ArrayList<String> getZahtevi(String email) {
		return fusekiWriter.readAllZahteviIdByEmail("/zahtevi", email);
	}

	public ArrayList<String> getUnansweredZahtevi() {
		return fusekiWriter.readAllUnansweredZahteviId("/zahtevi");
	}

	public void declineZahtev(String zahtevId) {
		fusekiWriter.updateZahtevWithStatus(false, zahtevId);
		
	}
	
	public void acceptZahtev(String zahtevId) {
		fusekiWriter.updateZahtevWithStatus(true, zahtevId);
		
	}
}
