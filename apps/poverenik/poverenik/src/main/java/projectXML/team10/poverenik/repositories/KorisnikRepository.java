package projectXML.team10.poverenik.repositories;

import java.io.ByteArrayOutputStream;
import java.io.OutputStream;

import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.xmldb.api.base.Collection;
import org.xmldb.api.base.CompiledExpression;
import org.xmldb.api.base.ResourceIterator;
import org.xmldb.api.base.ResourceSet;
import org.xmldb.api.modules.XMLResource;
import org.xmldb.api.modules.XQueryService;

import projectXML.team10.poverenik.models.korisnik.Korisnik;
import projectXML.team10.poverenik.util.DatabaseConnector;
import projectXML.team10.poverenik.util.DatabaseQueries;
import projectXML.team10.poverenik.util.MarshallerFactory;

@Repository
public class KorisnikRepository {

	private static String collectionId = "/db/sample/korisnici";
	private static String schemaPath = "src/main/resources/static/schemas/korisnik.xsd";
	private static String contextPath = "projectXML.team10.poverenik.models.korisnik";
	private DatabaseConnector databaseConnector;
	private MarshallerFactory marshallerFactory;
	
	@Autowired
	public KorisnikRepository(DatabaseConnector databaseConnector, MarshallerFactory marshallerFactory) {
		this.databaseConnector = databaseConnector;
		this.marshallerFactory = marshallerFactory;
	}
	
	public Korisnik getById(String id) throws Exception {
		Unmarshaller unmarshaller = marshallerFactory.createUnmarshaller(contextPath, schemaPath);

		Collection col = null;
		XMLResource res = null;
		try {
			col = databaseConnector.getCollection(collectionId);

			res = databaseConnector.getResource(col, id);

			Korisnik korisnik = (Korisnik) unmarshaller.unmarshal(res.getContentAsDOM());
			return korisnik;

		} catch (Exception e) {
			throw e;
		} finally {
			databaseConnector.closeConnections(res, col);
		}
	}
	
	public void save(Korisnik korisnik) throws Exception {
		Marshaller marshaller = marshallerFactory.createMarshaller(contextPath, schemaPath);

		Collection col = null;
		XMLResource res = null;
		OutputStream os = new ByteArrayOutputStream();

		try {
			col = databaseConnector.getOrCreateCollection(collectionId, 0);
			res = databaseConnector.createResource(col, korisnik.getId());
			marshaller.marshal(korisnik, os);

			res.setContent(os);

			col.storeResource(res);
		} catch (Exception e) {
			throw e;
		} finally {
			databaseConnector.closeConnections(res, col);
		}
	}
	

	public Korisnik findByEmail(String email) throws Exception {
		Unmarshaller unmarshaller = marshallerFactory.createUnmarshaller(contextPath, schemaPath);

		Collection collection = null;
		XMLResource xmlResource = null;
		try {
			collection = databaseConnector.getCollection(collectionId);
			XQueryService xQueryService = (XQueryService) collection.getService("XQueryService", "1.0");
	        CompiledExpression compiledExpression = xQueryService.compile(String.format(DatabaseQueries.X_QUERY_FIND_BY_EMAIL_KORISNICI, email));
	        ResourceSet resourceSet = xQueryService.execute(compiledExpression);
	        if (resourceSet.getSize() == 0) {
	        	return null;
	        }
	        ResourceIterator resourceIterator = resourceSet.getIterator();
	        while (resourceIterator.hasMoreResources()){
	            xmlResource = (XMLResource) resourceIterator.nextResource();
	            return (Korisnik) unmarshaller.unmarshal(xmlResource.getContentAsDOM());
	        }
	        return null;
		} catch (Exception e) {
			return null;
		}  finally {
			databaseConnector.closeConnections(xmlResource, collection);
		}
	}
}
