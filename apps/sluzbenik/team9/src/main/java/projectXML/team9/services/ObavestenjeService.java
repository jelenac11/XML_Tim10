package projectXML.team9.services;

import java.time.ZoneId;
import java.util.Date;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import projectXML.team9.models.obavestenje.Obavestenje;
import projectXML.team9.repositories.ObavestenjeRepository;
import projectXML.team9.util.XMLTransformations;

@Service
public class ObavestenjeService {

	private static final String INPUT_FILE = "src/main/resources/static/data/documents/obavestenje.xml";

	private static final String XSLT_FILE = "src/main/resources/static/data/xslt/obavestenje.xsl";

	private static final String XSLFO_FILE = "src/main/resources/static/data/xsl-fo/obavestenje_fo.xsl";

	private static final String HTML_FILE = "src/main/resources/static/gen/itext/";

	private static final String OUTPUT_FILE = "src/main/resources/static/gen/fo/";

	@Autowired
	private ObavestenjeRepository obavestenjeRepository;

	@Autowired
	private XMLTransformations xmlTransformations;

	public Obavestenje getObavestenje(String id) throws Exception {
		Obavestenje obavestenje = obavestenjeRepository.getById(id);
		return obavestenje;
	}

	public Obavestenje create(Obavestenje obavestenje) throws Exception {
		String id = UUID.randomUUID().toString();
		obavestenje.setId(id);
		obavestenje.setBrojObavestenja(id.split("-")[4] + "-"
				+ new Date().toInstant().atZone(ZoneId.systemDefault()).getMonthValue() + "/2020");
		obavestenjeRepository.save(obavestenje);
		return obavestenje;
	}

	public String generatePDFAndHTMLZahtev(String id) throws Exception {
		Obavestenje obavestenje = getObavestenje(id);
		obavestenjeRepository.saveToFile(obavestenje, INPUT_FILE);
		xmlTransformations.generateHTML(INPUT_FILE, XSLT_FILE, HTML_FILE + id + ".html");
		xmlTransformations.generatePDF(INPUT_FILE, XSLFO_FILE, OUTPUT_FILE + id + ".pdf");
		return OUTPUT_FILE + id + ".pdf";
	}

	public String generatePDFZahtev(String id) throws Exception {
		Obavestenje obavestenje = getObavestenje(id);
		obavestenjeRepository.saveToFile(obavestenje, INPUT_FILE);
		xmlTransformations.generatePDF(INPUT_FILE, XSLFO_FILE, OUTPUT_FILE + id + ".pdf");
		return OUTPUT_FILE + id + ".pdf";
	}

	public String generateHTMLZahtev(String id) throws Exception {
		Obavestenje obavestenje = getObavestenje(id);
		obavestenjeRepository.saveToFile(obavestenje, INPUT_FILE);
		xmlTransformations.generateHTML(INPUT_FILE, XSLT_FILE, HTML_FILE + id + ".html");
		return HTML_FILE + id + ".html";
	}
}
