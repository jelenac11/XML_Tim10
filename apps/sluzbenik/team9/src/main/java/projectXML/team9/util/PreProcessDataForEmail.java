package projectXML.team9.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;

@EnableAsync
@Component
public class PreProcessDataForEmail {

	@Autowired
	private GenerateHTMLAndPDF generateHTMLAndPDF;

	@Autowired
	private AmazonSESSample amazonSESSample;

	@Async
	public void sendMailWhenZahtevIsAccepted(String recipient, String obavestenjeId) throws Exception {
		String htmlPath = generateHTMLAndPDF.generateHTMLObavestenje(obavestenjeId);
		String pdfPath = generateHTMLAndPDF.generatePDFObavestenje(obavestenjeId);

		amazonSESSample.sendMailWhenZahtevIsAccepted(recipient, htmlPath, pdfPath);
	}

	public void sendMailWhenZahtevIsDenied(String recipient) throws Exception {
		amazonSESSample.sendMailWhenZahtevIsDenied(recipient);
	}
}
