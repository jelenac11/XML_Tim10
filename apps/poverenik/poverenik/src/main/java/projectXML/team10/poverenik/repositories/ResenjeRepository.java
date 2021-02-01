package projectXML.team10.poverenik.repositories;


import java.io.StringWriter;

import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.exist.xmldb.EXistResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.w3c.dom.Document;
import org.xmldb.api.base.Collection;
import org.xmldb.api.modules.XMLResource;
import projectXML.team10.poverenik.util.DatabaseConnector;
import projectXML.team10.poverenik.util.FusekiWriter;
import projectXML.team10.poverenik.util.MetadataExtractor;

@Repository
public class ResenjeRepository {

	private static String collectionId = "/db/sample/odlukePoverioca";
	private DatabaseConnector databaseConnector;
	private MetadataExtractor metadataExtractor;
	
	@Autowired
	public ResenjeRepository(DatabaseConnector databaseConnector, MetadataExtractor metadataExtractor) {
		this.databaseConnector = databaseConnector;
		this.metadataExtractor = metadataExtractor;
	}
	
	public String getById(String id) throws Exception {
		Collection col = null;
		XMLResource res = null;

		try {
			col = databaseConnector.getCollection(collectionId);
			res = databaseConnector.getResource(col, id);
			String xmlString =  (String) res.getContent();
			return xmlString;

		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		} finally {
			databaseConnector.closeConnections(res, col);
		}
	}
	
	public String save(Document odluka) throws Exception {
		Collection col = null;
		XMLResource res = null;
		String id = odluka.getDocumentElement().getAttribute("broj_rešenja");
		
		try {
			col = databaseConnector.getOrCreateCollection(collectionId, 0);
			res = (XMLResource) col.createResource(id, XMLResource.RESOURCE_TYPE);
			
			String xmlString = xmlString(odluka);
			res.setContent(xmlString);
			col.storeResource(res);
			
			metadataExtractor.extractMetadata(xmlString);
			FusekiWriter.saveRDF("/resenja");
			return xmlString;
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		} finally {
			((EXistResource)res).freeResources(); 
			databaseConnector.closeConnections(res, col);
		}
	}
	
	private String xmlString(Document doc) throws Exception {
		TransformerFactory transfac = TransformerFactory.newInstance();
		Transformer trans = transfac.newTransformer();
		trans.setOutputProperty(OutputKeys.METHOD, "xml");
		trans.setOutputProperty(OutputKeys.INDENT, "yes");
		trans.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", Integer.toString(2));

		StringWriter sw = new StringWriter();
		StreamResult result = new StreamResult(sw);
		DOMSource source = new DOMSource(doc.getDocumentElement());

		trans.transform(source, result);
		return sw.toString();
	}

}
