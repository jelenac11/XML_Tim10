package projectXML.team9.repositories;

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
import projectXML.team9.models.obavestenje.Obavestenje;
import projectXML.team9.util.DatabaseConnector;
import projectXML.team9.util.MarshallerFactory;

@Repository
public class ObavestenjeRepository {

	private static String collectionId = "/db/sample/obavestenja";
	private static String schemaPath = "src/main/resources/static/schemas/sema_obavestenje.xsd";
	private static String contextPath = "projectXML.team9.models.obavestenje";
	private DatabaseConnector databaseConnector;
	private MarshallerFactory marshallerFactory;

	@Autowired
	public ObavestenjeRepository(DatabaseConnector databaseConnector, MarshallerFactory marshallerFactory) {
		this.databaseConnector = databaseConnector;
		this.marshallerFactory = marshallerFactory;
	}

	public Obavestenje getById(String id) throws Exception {
		Unmarshaller unmarshaller = marshallerFactory.createUnmarshaller(contextPath, schemaPath);

		Collection col = null;
		XMLResource res = null;
		try {
			col = databaseConnector.getCollection(collectionId);

			res = databaseConnector.getResource(col, id);

			Obavestenje obavestenje = (Obavestenje) unmarshaller.unmarshal(res.getContentAsDOM());
			return obavestenje;

		} catch (Exception e) {
			throw e;
		} finally {
			databaseConnector.closeConnections(res, col);
		}
	}

	public void save(Obavestenje obavestenje, String id) throws Exception {
		Marshaller marshaller = marshallerFactory.createMarshaller(contextPath, schemaPath);

		Collection col = null;
		XMLResource res = null;
		OutputStream os = new ByteArrayOutputStream();

		try {
			col = databaseConnector.getOrCreateCollection(collectionId, 0);
			res = databaseConnector.createResource(col, id);
			marshaller.marshal(obavestenje, os);

			res.setContent(os);

			col.storeResource(res);
		} catch (Exception e) {
			throw e;
		} finally {
			databaseConnector.closeConnections(res, col);
		}
	}

	public void saveToFile(Obavestenje obavestenje, String path)
			throws JAXBException, SAXException, FileNotFoundException {
		Marshaller marshaller = marshallerFactory.createMarshaller(contextPath, schemaPath);
		OutputStream os = new FileOutputStream(path);
		marshaller.marshal(obavestenje, os);
	}
}
