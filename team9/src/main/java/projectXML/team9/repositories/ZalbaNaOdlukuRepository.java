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
import javax.xml.datatype.DatatypeConstants;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;

import org.springframework.stereotype.Repository;
import org.xml.sax.SAXException;

import projectXML.team9.models.zalbaNaOdluku.ZalbaNaOdluku;

@Repository
public class ZalbaNaOdlukuRepository {

	private static String documentPath = "src/main/resources/static/XMLDocuments/ZalbeNaOdluku/";
	private static String schemaPath = "src/main/resources/static/schemas/zalba_na_odluku.xsd";

	public ZalbaNaOdluku loadDocument(String name) throws SAXException, JAXBException {
		JAXBContext context = JAXBContext.newInstance("projectXML.team9.models.zalbaNaOdluku");

		Unmarshaller unmarshaller = context.createUnmarshaller();

		SchemaFactory schemaFactory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
		Schema schema = schemaFactory.newSchema(new File(schemaPath));
		unmarshaller.setSchema(schema);

		ZalbaNaOdluku zalbaNaOdluku = (ZalbaNaOdluku) unmarshaller.unmarshal(new File(documentPath + name + ".xml"));
		return zalbaNaOdluku;
	}

	public void save(ZalbaNaOdluku zalba) throws JAXBException, SAXException, IOException {
		JAXBContext context = JAXBContext.newInstance("projectXML.team9.models.zalbaNaOdluku");

		SchemaFactory schemaFactory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
		Schema schema = schemaFactory.newSchema(new File(schemaPath));
		
		Marshaller marshaller = context.createMarshaller();
		marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
		marshaller.setSchema(schema);
		
		OutputStream os = new FileOutputStream( documentPath + "nova_zalba_na_odluku.xml" );

		zalba.getDatumZahteva().setTimezone(DatatypeConstants.FIELD_UNDEFINED);
		zalba.getDatumZahteva().setTime(DatatypeConstants.FIELD_UNDEFINED,
			       DatatypeConstants.FIELD_UNDEFINED,
			       DatatypeConstants.FIELD_UNDEFINED,
			       DatatypeConstants.FIELD_UNDEFINED);
		
		zalba.getPodaciOZalbi().getDatumPodnosenja().setTimezone(DatatypeConstants.FIELD_UNDEFINED);
		zalba.getPodaciOZalbi().getDatumPodnosenja().setTime(DatatypeConstants.FIELD_UNDEFINED,
			       DatatypeConstants.FIELD_UNDEFINED,
			       DatatypeConstants.FIELD_UNDEFINED,
			       DatatypeConstants.FIELD_UNDEFINED);
		
		marshaller.marshal(zalba, os);
		os.flush();
		os.close();
	}
	
}
