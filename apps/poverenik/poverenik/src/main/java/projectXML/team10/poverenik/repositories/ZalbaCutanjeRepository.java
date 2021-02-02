package projectXML.team10.poverenik.repositories;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.OutputStream;

import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.xml.sax.SAXException;
import org.xmldb.api.base.Collection;
import org.xmldb.api.modules.XMLResource;

import projectXML.team10.poverenik.models.zalbaCutanje.ZalbaNaCutanje;
import projectXML.team10.poverenik.util.DatabaseConnector;
import projectXML.team10.poverenik.util.MarshallerFactory;

@Repository
public class ZalbaCutanjeRepository {

	private static String collectionId = "/db/sample/zalbeCutanje";
	private static String schemaPath = "src/main/resources/static/schemas/zalba_cutanja.xsd";
	private static String contextPath = "projectXML.team10.poverenik.models.zalbaCutanje";
	private DatabaseConnector databaseConnector;
	private MarshallerFactory marshallerFactory;
	
	@Autowired
	public ZalbaCutanjeRepository(DatabaseConnector databaseConnector, MarshallerFactory marshallerFactory) {
		this.databaseConnector = databaseConnector;
		this.marshallerFactory = marshallerFactory;
	}
	
	public ZalbaNaCutanje getById(String id) throws Exception {
		Unmarshaller unmarshaller = marshallerFactory.createUnmarshaller(contextPath, schemaPath);

		Collection col = null;
		XMLResource res = null;
		try {
			col = databaseConnector.getCollection(collectionId);

			res = databaseConnector.getResource(col, id);

			ZalbaNaCutanje zalba = (ZalbaNaCutanje) unmarshaller.unmarshal(res.getContentAsDOM());
			return zalba;

		} catch (Exception e) {
			throw e;
		} finally {
			databaseConnector.closeConnections(res, col);
		}
	}
	
	public void save(ZalbaNaCutanje zalba) throws Exception {
		Marshaller marshaller = marshallerFactory.createMarshaller(contextPath, schemaPath);

		Collection col = null;
		XMLResource res = null;
		OutputStream os = new ByteArrayOutputStream();

		try {
			col = databaseConnector.getOrCreateCollection(collectionId, 0);
			res = databaseConnector.createResource(col, zalba.getId());
			marshaller.marshal(zalba, os);

			res.setContent(os);

			col.storeResource(res);
		} catch (Exception e) {
			throw e;
		} finally {
			databaseConnector.closeConnections(res, col);
		}
	}
	
	public void saveToFile(ZalbaNaCutanje zalba, String path) throws JAXBException, SAXException, FileNotFoundException {
		Marshaller marshaller = marshallerFactory.createMarshaller(contextPath, schemaPath);
		OutputStream os = new FileOutputStream(path);
		marshaller.marshal(zalba, os);
	}

}
