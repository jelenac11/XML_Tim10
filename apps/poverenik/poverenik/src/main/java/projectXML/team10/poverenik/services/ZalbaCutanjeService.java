package projectXML.team10.poverenik.services;

import java.io.StringWriter;
import java.time.ZoneId;
import java.util.Date;
import java.util.UUID;

import javax.xml.bind.Marshaller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import projectXML.team10.poverenik.models.zalbaCutanje.ZalbaNaCutanje;
import projectXML.team10.poverenik.repositories.ZalbaCutanjeRepository;
import projectXML.team10.poverenik.util.FusekiWriter;
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
	private MarshallerFactory marshallerFactory;

	public ZalbaNaCutanje getZalba(String id) throws Exception {
		ZalbaNaCutanje zalba = zalbaCutanjeRepository.getById(id);
		return zalba;
	}

	public ZalbaNaCutanje create(ZalbaNaCutanje zalba) throws Exception {
		String id = UUID.randomUUID().toString();
		zalba.setId(id);
		zalba.setAbout("http://www.projekat.org/zalbe-na-cutanje/" + id);
		zalba.setBrojZalbe(id.split("-")[4] + "-" + new Date().toInstant().atZone(ZoneId.systemDefault()).getMonthValue() + "/2020");
		zalba.getOrganProtivKojegJeZalba().setContent("http://www.projekat.org/organi/" + zalba.getOrganProtivKojegJeZalba().getNaziv());
		zalbaCutanjeRepository.save(zalba);
		Marshaller marshaller = marshallerFactory.createMarshaller(contextPath, schemaPath);
		StringWriter sw = new StringWriter();
		marshaller.marshal(zalba, sw);
		String xmlString = sw.toString();
		metadataExtractor.extractMetadata(xmlString);
		FusekiWriter.saveRDF("/zalbe-na-cutanje");
		return zalba;
	}

}
