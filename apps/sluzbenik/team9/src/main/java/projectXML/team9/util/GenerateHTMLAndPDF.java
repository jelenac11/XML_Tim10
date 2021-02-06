package projectXML.team9.util;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import projectXML.team9.models.izvestaj.Izvestaj;
import projectXML.team9.models.obavestenje.Obavestenje;
import projectXML.team9.models.zahtev.ZahtevGradjana;
import projectXML.team9.repositories.IzvestajRepository;
import projectXML.team9.repositories.ObavestenjeRepository;
import projectXML.team9.repositories.ResenjeRepository;
import projectXML.team9.repositories.ZahtevRepository;

@Component
public class GenerateHTMLAndPDF {

	private static final String INPUT_FILE = "src/main/resources/static/data/documents/";

	private static final String XSLT_FILE = "src/main/resources/static/data/xslt/";

	private static final String XSLFO_FILE = "src/main/resources/static/data/xsl-fo/";

	private static final String HTML_FILE = "src/main/resources/static/gen/itext/";

	private static final String OUTPUT_FILE = "src/main/resources/static/gen/fo/";

	@Autowired
	private ObavestenjeRepository obavestenjeRepository;

	@Autowired
	private ZahtevRepository zahtevRepository;
	
	@Autowired
	private ResenjeRepository resenjeRepository;
	
	@Autowired
	private IzvestajRepository izvestajRepository;

	@Autowired
	private XMLTransformations xmlTransformations;

	public String generatePDFObavestenje(String id) throws Exception {
		Obavestenje obavestenje = obavestenjeRepository.getById(id);
		obavestenjeRepository.saveToFile(obavestenje, INPUT_FILE + "obavestenje.xml");
		xmlTransformations.generatePDF(INPUT_FILE + "obavestenje.xml", XSLFO_FILE + "obavestenje_fo.xsl",
				OUTPUT_FILE + id + ".pdf");
		return OUTPUT_FILE + id + ".pdf";
	}

	public String generateHTMLObavestenje(String id) throws Exception {
		Obavestenje obavestenje = obavestenjeRepository.getById(id);
		obavestenjeRepository.saveToFile(obavestenje, INPUT_FILE + "obavestenje.xml");
		xmlTransformations.generateHTML(INPUT_FILE + "obavestenje.xml", XSLT_FILE + "obavestenje.xsl",
				HTML_FILE + id + ".html");
		return HTML_FILE + id + ".html";
	}

	public String generatePDFZahtev(String id) throws Exception {
		ZahtevGradjana zahtev = zahtevRepository.getById(id);
		zahtevRepository.saveToFile(zahtev, INPUT_FILE + "zahtev.xml");
		xmlTransformations.generatePDF(INPUT_FILE + "zahtev.xml", XSLFO_FILE + "zahtev_fo.xsl",
				OUTPUT_FILE + id + ".pdf");
		return OUTPUT_FILE + id + ".pdf";
	}

	public String generateHTMLZahtev(String id) throws Exception {
		ZahtevGradjana zahtev = zahtevRepository.getById(id);
		zahtevRepository.saveToFile(zahtev, INPUT_FILE + "zahtev.xml");
		xmlTransformations.generateHTML(INPUT_FILE + "zahtev.xml", XSLT_FILE + "zahtev.xsl", HTML_FILE + id + ".html");
		return HTML_FILE + id + ".html";
	}
	
	public String generatePDFIzvestaj(String id) throws Exception {
		Izvestaj izvestaj = izvestajRepository.getById(id);
		izvestajRepository.saveToFile(izvestaj, INPUT_FILE + "izvestaj.xml");
		xmlTransformations.generatePDF(INPUT_FILE + "izvestaj.xml", XSLFO_FILE + "izvestaj_fo.xsl",
				OUTPUT_FILE + id + ".pdf");
		return OUTPUT_FILE + id + ".pdf";
	}

	public String generateHTMLIzvestaj(String id) throws Exception {
		Izvestaj izvestaj = izvestajRepository.getById(id);
		izvestajRepository.saveToFile(izvestaj, INPUT_FILE + "izvestaj.xml");
		xmlTransformations.generateHTML(INPUT_FILE + "izvestaj.xml", XSLT_FILE + "izvestaj.xsl", HTML_FILE + id + ".html");
		return HTML_FILE + id + ".html";
	}
	
	public String generatePDFResenje(String id) throws Exception {
		String resenje = resenjeRepository.getById(id);
		saveToFile(resenje, INPUT_FILE + "resenje.xml");
		xmlTransformations.generatePDF(INPUT_FILE + "resenje.xml", XSLFO_FILE + "resenje_fo.xsl",
				OUTPUT_FILE + id + ".pdf");
		return OUTPUT_FILE + id + ".pdf";
	}

	public String generateHTMLResenje(String id) throws Exception {
		String resenje = resenjeRepository.getById(id);
		saveToFile(resenje, INPUT_FILE + "resenje.xml");
		xmlTransformations.generateHTML(INPUT_FILE + "resenje.xml", XSLT_FILE + "resenje.xsl", HTML_FILE + id + ".html");
		return HTML_FILE + id + ".html";
	}
	
	public String generateHTMLResenjeXML(String xml) throws Exception {
		saveToFile(xml, INPUT_FILE + "resenje.xml");
		xmlTransformations.generateHTML(INPUT_FILE + "resenje.xml", XSLT_FILE + "resenje.xsl", HTML_FILE + "RNG" + ".html");
		return HTML_FILE + "RNG" + ".html";
	}
	
	private void saveToFile(String content, String fileName) throws IOException {
		FileWriter fileWriter = new FileWriter(fileName);
	    PrintWriter printWriter = new PrintWriter(fileWriter);
	    printWriter.print(content);
	    printWriter.close();
	}
}
