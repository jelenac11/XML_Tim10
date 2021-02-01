package projectXML.team10.poverenik.util;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import projectXML.team10.poverenik.repositories.ResenjeRepository;


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
	
	private void saveToFile(String content, String fileName) throws IOException {
		FileWriter fileWriter = new FileWriter(fileName);
	    PrintWriter printWriter = new PrintWriter(fileWriter);
	    printWriter.print(content);
	    printWriter.close();
	}
}
