package projectXML.team10.poverenik.repositories;

import java.io.ByteArrayOutputStream;
import java.io.OutputStream;

import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.xmldb.api.base.Collection;
import org.xmldb.api.modules.XMLResource;

import projectXML.team10.poverenik.models.zalbaNaOdluku.ZalbaNaOdluku;
import projectXML.team10.poverenik.util.DatabaseConnector;
import projectXML.team10.poverenik.util.MarshallerFactory;

@Repository
public class ZalbaNaOdlukuRepository {

	private static String collectionId = "/db/sample/zalbeNaOdluku";
	private static String schemaPath = "src/main/resources/static/schemas/zalba_na_odluku.xsd";
	private static String contextPath = "projectXML.team10.poverenik.models.zalbaNaOdluku";
	private DatabaseConnector databaseConnector;
	private MarshallerFactory marshallerFactory;
	
	@Autowired
	public ZalbaNaOdlukuRepository(DatabaseConnector databaseConnector, MarshallerFactory marshallerFactory) {
		this.databaseConnector = databaseConnector;
		this.marshallerFactory = marshallerFactory;
	}
	
	public ZalbaNaOdluku getById(String id) throws Exception {
		Unmarshaller unmarshaller = marshallerFactory.createUnmarshaller(contextPath, schemaPath);

		Collection col = null;
		XMLResource res = null;
		try {
			col = databaseConnector.getCollection(collectionId);

			res = databaseConnector.getResource(col, id);

			ZalbaNaOdluku zalba = (ZalbaNaOdluku) unmarshaller.unmarshal(res.getContentAsDOM());
			return zalba;

		} catch (Exception e) {
			throw e;
		} finally {
			databaseConnector.closeConnections(res, col);
		}
	}
	
	public void save(ZalbaNaOdluku zalba) throws Exception {
		Marshaller marshaller = marshallerFactory.createMarshaller(contextPath, schemaPath);

		Collection col = null;
		XMLResource res = null;
		OutputStream os = new ByteArrayOutputStream();

		try {
			col = databaseConnector.getOrCreateCollection(collectionId, 0);
			res = databaseConnector.createResource(col, zalba.getId());
			System.out.println(zalba.getPodaciOZalbi().getPodnosilacZalbe().getLice().getAdresa().getMesto());
			marshaller.marshal(zalba, os);

			res.setContent(os);

			col.storeResource(res);
		} catch (Exception e) {
			throw e;
		} finally {
			databaseConnector.closeConnections(res, col);
		}
	}
	
}
