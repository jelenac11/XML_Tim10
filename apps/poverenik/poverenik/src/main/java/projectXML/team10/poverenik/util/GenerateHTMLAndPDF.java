package projectXML.team10.poverenik.util;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import projectXML.team10.poverenik.models.izvestaj.Izvestaj;
import projectXML.team10.poverenik.models.zalbaCutanje.ZalbaNaCutanje;
import projectXML.team10.poverenik.models.zalbaNaOdluku.ZalbaNaOdluku;
import projectXML.team10.poverenik.repositories.IzvestajRepository;
import projectXML.team10.poverenik.repositories.ResenjeRepository;
import projectXML.team10.poverenik.repositories.ZalbaCutanjeRepository;
import projectXML.team10.poverenik.repositories.ZalbaNaOdlukuRepository;


@Component
public class GenerateHTMLAndPDF {

	private static final String INPUT_FILE = "src/main/resources/static/data/documents/";

	private static final String XSLT_FILE = "src/main/resources/static/data/xslt/";

	private static final String XSLFO_FILE = "src/main/resources/static/data/xsl-fo/";

	private static final String HTML_FILE = "src/main/resources/static/gen/itext/";

	private static final String OUTPUT_FILE = "src/main/resources/static/gen/fo/";

	@Autowired
	private ResenjeRepository resenjeRepository;
	@Autowired
	private ZalbaNaOdlukuRepository zalbaNaOdlukuRepository;
	@Autowired
	private ZalbaCutanjeRepository zalbaCutanjeRepository;
	@Autowired
	private IzvestajRepository izvestajRepository;

	@Autowired
	private XMLTransformations xmlTransformations;


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
	
	public String generatePDFZalbaNaOdluku(String id) throws Exception {
		ZalbaNaOdluku zalba = zalbaNaOdlukuRepository.getById(id);
		zalbaNaOdlukuRepository.saveToFile(zalba, INPUT_FILE + "zalbaNaOdluku.xml");
		xmlTransformations.generatePDF(INPUT_FILE + "zalbaNaOdluku.xml", XSLFO_FILE + "zalbaNaOdluku_fo.xsl",
				OUTPUT_FILE + id + ".pdf");
		return OUTPUT_FILE + id + ".pdf";
	}

	public String generateHTMLZalbaNaOdluku(String id) throws Exception {
		ZalbaNaOdluku zalba = zalbaNaOdlukuRepository.getById(id);
		zalbaNaOdlukuRepository.saveToFile(zalba, INPUT_FILE + "zalbaNaOdluku.xml");
		xmlTransformations.generateHTML(INPUT_FILE + "zalbaNaOdluku.xml", XSLT_FILE + "zalbaNaOdluku.xsl",
				HTML_FILE + id + ".html");
		return HTML_FILE + id + ".html";
	}

	public String generateHTMLZalbaCutanje(String id) throws Exception {
		ZalbaNaCutanje zalba = zalbaCutanjeRepository.getById(id);
		zalbaCutanjeRepository.saveToFile(zalba, INPUT_FILE + "zalbaNaCutanje.xml");
		xmlTransformations.generateHTML(INPUT_FILE + "zalbaNaCutanje.xml", XSLT_FILE + "zalbaNaCutanje.xsl",
				HTML_FILE + id + ".html");
		return HTML_FILE + id + ".html";
	}
	
	public String generatePDFZalbaCutanje(String id) throws Exception {
		ZalbaNaCutanje zalba = zalbaCutanjeRepository.getById(id);
		zalbaCutanjeRepository.saveToFile(zalba, INPUT_FILE + "zalbaNaCutanje.xml");
		xmlTransformations.generatePDF(INPUT_FILE + "zalbaNaCutanje.xml", XSLFO_FILE + "zalbaNaCutanje_fo.xsl",
				OUTPUT_FILE + id + ".pdf");
		return OUTPUT_FILE + id + ".pdf";
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
		xmlTransformations.generateHTML(INPUT_FILE + "izvestaj.xml", XSLT_FILE + "izvestaj.xsl",
				HTML_FILE + id + ".html");
		return HTML_FILE + id + ".html";
	}
}
