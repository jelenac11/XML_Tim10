package projectXML.team9.util;

import javax.xml.transform.OutputKeys;

import org.exist.xmldb.EXistResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.xmldb.api.DatabaseManager;
import org.xmldb.api.base.Collection;
import org.xmldb.api.base.Database;
import org.xmldb.api.base.XMLDBException;
import org.xmldb.api.modules.CollectionManagementService;
import org.xmldb.api.modules.XMLResource;

import projectXML.team9.configuration.PropertiesConfiguration;

@Component
public class DatabaseConnector {

	private PropertiesConfiguration propertiesConfiguration;

	@Autowired
	public DatabaseConnector(PropertiesConfiguration propertiesConfiguration) {
		this.propertiesConfiguration = propertiesConfiguration;
	}

	public XMLResource getResource(Collection col, String id) throws XMLDBException {
		return (XMLResource) col.getResource(id);
	}

	public XMLResource createResource(Collection col, String id) throws XMLDBException {
		return (XMLResource) col.createResource(id, XMLResource.RESOURCE_TYPE);
	}

	public void closeConnections(XMLResource res, Collection col) {
		if (res != null) {
			try {
				((EXistResource) res).freeResources();
			} catch (XMLDBException xe) {
				xe.printStackTrace();
			}
		}

		if (col != null) {
			try {
				col.close();
			} catch (XMLDBException xe) {
				xe.printStackTrace();
			}
		}
	}

	public Collection getCollection(String collectionId)
			throws XMLDBException, ClassNotFoundException, InstantiationException, IllegalAccessException {
		Class<?> cl = Class.forName(propertiesConfiguration.getExistDBConfiguration().getDriver());
		Database database = (Database) cl.newInstance();
		database.setProperty("create-database", "true");

		// entry point for the API which enables you to get the Collection reference
		DatabaseManager.registerDatabase(database);

		Collection col = DatabaseManager
				.getCollection(String.format(propertiesConfiguration.getExistDBConfiguration().getUri(),
						propertiesConfiguration.getExistDBConfiguration().getHost(),
						propertiesConfiguration.getExistDBConfiguration().getPort()) + collectionId);
		col.setProperty(OutputKeys.INDENT, "yes");
		return col;
	}

	public Collection getOrCreateCollection(String collectionUri, int pathSegmentOffset)
			throws XMLDBException, ClassNotFoundException, InstantiationException, IllegalAccessException {

		Class<?> cl = Class.forName(propertiesConfiguration.getExistDBConfiguration().getDriver());
		Database database = (Database) cl.newInstance();
		database.setProperty("create-database", "true");

		// entry point for the API which enables you to get the Collection reference
		DatabaseManager.registerDatabase(database);

		String uri = String.format(propertiesConfiguration.getExistDBConfiguration().getUri(),
				propertiesConfiguration.getExistDBConfiguration().getHost(),
				propertiesConfiguration.getExistDBConfiguration().getPort());
		Collection col = DatabaseManager.getCollection(uri + collectionUri,
				propertiesConfiguration.getExistDBConfiguration().getUser(),
				propertiesConfiguration.getExistDBConfiguration().getPassword());

		// create the collection if it does not exist
		if (col == null) {

			if (collectionUri.startsWith("/")) {
				collectionUri = collectionUri.substring(1);
			}

			String pathSegments[] = collectionUri.split("/");

			if (pathSegments.length > 0) {
				StringBuilder path = new StringBuilder();

				for (int i = 0; i <= pathSegmentOffset; i++) {
					path.append("/" + pathSegments[i]);
				}

				Collection startCol = DatabaseManager.getCollection(uri + path,
						propertiesConfiguration.getExistDBConfiguration().getUser(),
						propertiesConfiguration.getExistDBConfiguration().getPassword());

				if (startCol == null) {

					// child collection does not exist

					String parentPath = path.substring(0, path.lastIndexOf("/"));
					Collection parentCol = DatabaseManager.getCollection(uri + parentPath,
							propertiesConfiguration.getExistDBConfiguration().getUser(),
							propertiesConfiguration.getExistDBConfiguration().getPassword());
					CollectionManagementService mgt = (CollectionManagementService) parentCol
							.getService("CollectionManagementService", "1.0");

					System.out.println("[INFO] Creating the collection: " + pathSegments[pathSegmentOffset]);
					col = mgt.createCollection(pathSegments[pathSegmentOffset]);

					col.close();
					parentCol.close();

				} else {
					startCol.close();
				}
			}
			return getOrCreateCollection(collectionUri, ++pathSegmentOffset);
		} else {
			return col;
		}
	}
}
