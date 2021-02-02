package projectXML.team9.repositories;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.ArrayList;

import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.xml.sax.SAXException;
import org.xmldb.api.base.Collection;
import org.xmldb.api.base.CompiledExpression;
import org.xmldb.api.base.ResourceIterator;
import org.xmldb.api.base.ResourceSet;
import org.xmldb.api.modules.XMLResource;
import org.xmldb.api.modules.XQueryService;

import projectXML.team9.models.zahtev.ZahtevGradjana;
import projectXML.team9.util.DatabaseConnector;
import projectXML.team9.util.DatabaseQueries;
import projectXML.team9.util.MarshallerFactory;

@Repository
public class ZahtevRepository {

	private static String collectionId = "/db/sample/zahtevi";
	private static String schemaPath = "src/main/resources/static/schemas/sema_zahtev.xsd";
	private static String contextPath = "projectXML.team9.models.zahtev";
	private DatabaseConnector databaseConnector;
	private MarshallerFactory marshallerFactory;

	@Autowired
	public ZahtevRepository(DatabaseConnector databaseConnector, MarshallerFactory marshallerFactory) {
		this.databaseConnector = databaseConnector;
		this.marshallerFactory = marshallerFactory;
	}

	public ZahtevGradjana getById(String id) throws Exception {
		Unmarshaller unmarshaller = marshallerFactory.createUnmarshaller(contextPath, schemaPath);

		Collection col = null;
		XMLResource res = null;
		try {
			col = databaseConnector.getCollection(collectionId);

			res = databaseConnector.getResource(col, id);

			ZahtevGradjana zahtev = (ZahtevGradjana) unmarshaller.unmarshal(res.getContentAsDOM());
			return zahtev;

		} catch (Exception e) {
			throw e;
		} finally {
			databaseConnector.closeConnections(res, col);
		}
	}

	public void save(ZahtevGradjana zahtev, String id) throws Exception {
		Marshaller marshaller = marshallerFactory.createMarshaller(contextPath, schemaPath);

		Collection col = null;
		XMLResource res = null;
		OutputStream os = new ByteArrayOutputStream();

		try {
			col = databaseConnector.getOrCreateCollection(collectionId, 0);
			res = databaseConnector.createResource(col, id);
			marshaller.marshal(zahtev, os);

			res.setContent(os);

			col.storeResource(res);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		} finally {
			databaseConnector.closeConnections(res, col);
		}
	}

	public void saveToFile(ZahtevGradjana gradjana, String path)
			throws JAXBException, SAXException, FileNotFoundException {
		Marshaller marshaller = marshallerFactory.createMarshaller(contextPath, schemaPath);
		OutputStream os = new FileOutputStream(path);
		marshaller.marshal(gradjana, os);
	}

	public ArrayList<String> search(String search) throws Exception {
		ArrayList<String> ids = new ArrayList<String>();

		Collection collection = null;
		XMLResource xmlResource = null;
		try {
			collection = databaseConnector.getCollection(collectionId);
			XQueryService xQueryService = (XQueryService) collection.getService("XQueryService", "1.0");
			String query = String.format(DatabaseQueries.SEARCH_ZAHTEV, search);
			CompiledExpression compiledExpression = xQueryService.compile(query);
			ResourceSet resourceSet = xQueryService.execute(compiledExpression);
			if (resourceSet.getSize() == 0) {
				return ids;
			}
			ResourceIterator resourceIterator = resourceSet.getIterator();
			while (resourceIterator.hasMoreResources()) {
				xmlResource = (XMLResource) resourceIterator.nextResource();
				ids.add((String) xmlResource.getContent());
			}
			return ids;
		} catch (Exception e) {
			return null;
		} finally {
			databaseConnector.closeConnections(xmlResource, collection);
		}
	}
}
