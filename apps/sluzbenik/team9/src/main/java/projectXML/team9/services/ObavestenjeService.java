package projectXML.team9.services;

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
import org.springframework.stereotype.Service;

import projectXML.team9.models.obavestenje.Obavestenje;
import projectXML.team9.repositories.ObavestenjeRepository;
import projectXML.team9.util.Fuseki;
import projectXML.team9.util.GenerateHTMLAndPDF;
import projectXML.team9.util.MarshallerFactory;
import projectXML.team9.util.MetadataExtractor;
import projectXML.team9.util.PreProcessDataForEmail;

@Service
public class ObavestenjeService {

	private static String schemaPath = "src/main/resources/static/schemas/sema_obavestenje.xsd";

	private static String contextPath = "projectXML.team9.models.obavestenje";

	@Autowired
	private ObavestenjeRepository obavestenjeRepository;

	@Autowired
	private MetadataExtractor metadataExtractor;

	@Autowired
	private MarshallerFactory marshallerFactory;

	@Autowired
	private Fuseki fusekiWriter;

	@Autowired
	private ZahtevService zahtevService;

	@Autowired
	private PreProcessDataForEmail preProcessDataForEmail;

	@Autowired
	private GenerateHTMLAndPDF generateHTMLAndPDF;

	public Obavestenje getObavestenje(String id) throws Exception {
		Obavestenje obavestenje = obavestenjeRepository.getById(id);
		return obavestenje;
	}

	public Obavestenje create(Obavestenje obavestenje) throws Exception {
		String id = UUID.randomUUID().toString();
		obavestenje.setId(id);
		obavestenje.setBrojObavestenja(id.split("-")[4] + "-"
				+ new Date().toInstant().atZone(ZoneId.systemDefault()).getMonthValue() + "/2020");
		obavestenje.setVocab();
		obavestenje.setAbout(id);
		obavestenje.setProperty();
		obavestenje.setContent(obavestenje.getBrojZahteva());
		obavestenje.getInformacijeOObavestenju().getOrgan().setProperty();
		obavestenje.getInformacijeOObavestenju().getOrgan()
				.setContent(obavestenje.getInformacijeOObavestenju().getOrgan().getNaziv());
		obavestenje.getInformacijeOObavestenju().getTrazilac().setProperty();
		obavestenje.getInformacijeOObavestenju().getTrazilac().setContent(
				zahtevService.getZahtev(obavestenje.getBrojZahteva().split("/")[4]).getTrazilac().getContent());
		obavestenje.getInformacijeOObavestenju().getDatumObavestenja().setProperty();
		obavestenje.getInformacijeOObavestenju().getDatumObavestenja().setDatatype("xs:date");
		obavestenjeRepository.save(obavestenje, id);
		Marshaller marshaller = marshallerFactory.createMarshaller(contextPath, schemaPath);
		StringWriter sw = new StringWriter();
		marshaller.marshal(obavestenje, sw);
		String xmlString = sw.toString();
		metadataExtractor.extractMetadata(xmlString);
		fusekiWriter.saveRDF("/obavestenja");
		fusekiWriter.updateZahtevWithStatus(true, obavestenje.getBrojZahteva());
		preProcessDataForEmail.sendMailWhenZahtevIsAccepted(obavestenje.getInformacijeOObavestenju().getTrazilac().getContent(), id);
		return obavestenje;
	}

	public String generatePDFObavestenje(String id) throws Exception {
		return generateHTMLAndPDF.generatePDFObavestenje(id);
	}

	public String generateHTMLObavestenje(String id) throws Exception {
		return generateHTMLAndPDF.generateHTMLObavestenje(id);
	}

	public ArrayList<String> getObavestenjaByCitizenEmail(String email) {
		return fusekiWriter.readAllObavestenjaIdByCitizenEmail("/obavestenja", email);
	}

	public String getXSLTObavestenje(String id) throws Exception {
		String url = generateHTMLAndPDF.generateHTMLObavestenje(id);
		File file = new File(url);
		FileInputStream fileInputStream = new FileInputStream(file);
		return IOUtils.toString(fileInputStream, "UTF-8");
	}

}
