package projectXML.team9.services;

import java.time.ZoneId;
import java.util.Date;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import projectXML.team9.models.zahtev.ZahtevGradjana;
import projectXML.team9.repositories.ZahtevRepository;
import projectXML.team9.util.XMLTransformations;

@Service
public class ZahtevService {

	private static final String INPUT_FILE = "src/main/resources/static/data/documents/zahtev.xml";

	private static final String XSLT_FILE = "src/main/resources/static/data/xslt/zahtev.xsl";

	private static final String XSLFO_FILE = "src/main/resources/static/data/xsl-fo/zahtev_fo.xsl";

	private static final String HTML_FILE = "src/main/resources/static/gen/itext/";

	private static final String OUTPUT_FILE = "src/main/resources/static/gen/fo/";

	@Autowired
	private ZahtevRepository zahtevRepository;

	@Autowired
	private XMLTransformations xmlTransformations;

	public ZahtevGradjana getZahtev(String id) throws Exception {
		ZahtevGradjana zahtev = zahtevRepository.getById(id);
		return zahtev;
	}

	public ZahtevGradjana create(ZahtevGradjana zahtevGradjana) throws Exception {
		String id = UUID.randomUUID().toString();
		zahtevGradjana.setId(id);
		zahtevGradjana.setBrojZahteva(id.split("-")[4] + "-"
				+ new Date().toInstant().atZone(ZoneId.systemDefault()).getMonthValue() + "/2020");
		zahtevRepository.save(zahtevGradjana);
		return zahtevGradjana;
	}

	public String generatePDFZahtev(String id) throws Exception {
		ZahtevGradjana zahtev = getZahtev(id);
		zahtevRepository.saveToFile(zahtev, INPUT_FILE);
		xmlTransformations.generatePDF(INPUT_FILE, XSLFO_FILE, OUTPUT_FILE + id + ".pdf");
		return OUTPUT_FILE + id + ".pdf";// TODO Auto-generated method stub
	}

	public String generateHTMLZahtev(String id) throws Exception {
		ZahtevGradjana zahtev = getZahtev(id);
		zahtevRepository.saveToFile(zahtev, INPUT_FILE);
		xmlTransformations.generateHTML(INPUT_FILE, XSLT_FILE, HTML_FILE + id + ".html");
		return HTML_FILE + id + ".html";
	}
}
