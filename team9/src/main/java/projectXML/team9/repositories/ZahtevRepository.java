package projectXML.team9.repositories;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import javax.xml.XMLConstants;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import org.springframework.stereotype.Repository;
import org.xml.sax.SAXException;
import projectXML.team9.models.zahtev.ZahtevGradjana;

@Repository
public class ZahtevRepository {

	private static String documentPath = "src/main/resources/static/XMLDocuments/";
	private static String schemaPath = "src/main/resources/static/schemas/sema_zahtev.xsd";

	public ZahtevGradjana loadDocument(String name) throws SAXException, JAXBException {
		JAXBContext context = JAXBContext.newInstance("projectXML.team9.models.zahtev");

		Unmarshaller unmarshaller = context.createUnmarshaller();

		SchemaFactory schemaFactory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
		Schema schema = schemaFactory.newSchema(new File(schemaPath));
		unmarshaller.setSchema(schema);

		ZahtevGradjana zahtev = (ZahtevGradjana) unmarshaller.unmarshal(new File(documentPath + name + ".xml"));

		return zahtev;
	}
	
	public void save(ZahtevGradjana zahtev) throws JAXBException, SAXException, IOException {
		JAXBContext context = JAXBContext.newInstance("projectXML.team9.models.zahtev");

		SchemaFactory schemaFactory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
		Schema schema = schemaFactory.newSchema(new File(schemaPath));
		
		Marshaller marshaller = context.createMarshaller();
		marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
		marshaller.setSchema(schema);
		
		OutputStream os = new FileOutputStream( documentPath + "zahtevUpdate.xml" );
		marshaller.marshal(zahtev, os);
		os.flush();
		os.close();
	}
}
