package projectXML.team9.util;

import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;
import org.apache.jena.query.ResultSetFormatter;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.RDFNode;
import org.apache.jena.update.UpdateExecutionFactory;
import org.apache.jena.update.UpdateFactory;
import org.apache.jena.update.UpdateProcessor;
import org.apache.jena.update.UpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import projectXML.team9.configuration.PropertiesConfiguration;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;

@Component
public class Fuseki {

	private static final String RDF_FILEPATH = "src/main/resources/rdf/rdfOutput.rdf";

	private static final String GRAPH_URI = "/metadata";

	@Autowired
	private PropertiesConfiguration propertiesConfiguration;

	public void saveRDF(String type) throws IOException {
		Model model = ModelFactory.createDefaultModel();
		model.read(RDF_FILEPATH);

		ByteArrayOutputStream out = new ByteArrayOutputStream();
		model.write(out, SparqlUtil.NTRIPLES);
		model.write(System.out, SparqlUtil.RDF_XML);

		UpdateRequest request = UpdateFactory.create();
		UpdateProcessor processor = UpdateExecutionFactory.createRemote(request,
				String.join("/", propertiesConfiguration.getFusekiConfiguration().getEndpoint(),
						propertiesConfiguration.getFusekiConfiguration().getDataset(),
						propertiesConfiguration.getFusekiConfiguration().getUpdate()));
		processor.execute();
		String sparqlUpdate = SparqlUtil.insertData(
				String.join("/", propertiesConfiguration.getFusekiConfiguration().getEndpoint(),
						propertiesConfiguration.getFusekiConfiguration().getDataset(),
						propertiesConfiguration.getFusekiConfiguration().getData()) + GRAPH_URI + type,
				new String(out.toByteArray()));

		UpdateRequest update = UpdateFactory.create(sparqlUpdate);
		processor = UpdateExecutionFactory.createRemote(update,
				String.join("/", propertiesConfiguration.getFusekiConfiguration().getEndpoint(),
						propertiesConfiguration.getFusekiConfiguration().getDataset(),
						propertiesConfiguration.getFusekiConfiguration().getUpdate()));
		processor.execute();

		String sparqlQuery = SparqlUtil
				.selectData(
						String.join("/", propertiesConfiguration.getFusekiConfiguration().getEndpoint(),
								propertiesConfiguration.getFusekiConfiguration().getDataset(),
								propertiesConfiguration.getFusekiConfiguration().getData()) + GRAPH_URI + type,
						"?s ?p ?o");
		// Create a QueryExecution that will access a SPARQL service over HTTP
		QueryExecution query = QueryExecutionFactory
				.sparqlService(String.join("/", propertiesConfiguration.getFusekiConfiguration().getEndpoint(),
						propertiesConfiguration.getFusekiConfiguration().getDataset(),
						propertiesConfiguration.getFusekiConfiguration().getQuery()), sparqlQuery);

		// Query the collection, dump output response as XML
		ResultSet results = query.execSelect();

		ResultSetFormatter.outputAsXML(System.out, results);

		query.close();

		System.out.println("[INFO] End.");

	}

	public ArrayList<String> getDocumentsId(String sparqlQuery) {
		ArrayList<String> zahtevi = new ArrayList<String>();
		// Create a QueryExecution that will access a SPARQL service over HTTP
		QueryExecution queryExecution = QueryExecutionFactory
				.sparqlService(String.join("/", propertiesConfiguration.getFusekiConfiguration().getEndpoint(),
						propertiesConfiguration.getFusekiConfiguration().getDataset(),
						propertiesConfiguration.getFusekiConfiguration().getQuery()), sparqlQuery);

		ResultSet results = queryExecution.execSelect();
		String varName;
		RDFNode varValue;

		while (results.hasNext()) {

			// A single answer from a SELECT query
			QuerySolution querySolution = results.next();
			java.util.Iterator<String> variableBindings = querySolution.varNames();

			// Retrieve variable bindings
			while (variableBindings.hasNext()) {

				varName = variableBindings.next();
				varValue = querySolution.get(varName);

				zahtevi.add(varValue.toString());
			}
		}
		return zahtevi;
	}

	public ArrayList<String> readAllZahteviIdByEmail(String type, String email) {
		String sparqlQuery = SparqlUtil.selectData(
				String.join("/", propertiesConfiguration.getFusekiConfiguration().getEndpoint(),
						propertiesConfiguration
								.getFusekiConfiguration().getDataset(),
						propertiesConfiguration.getFusekiConfiguration().getData()) + GRAPH_URI + type,
				String.format(
						"?s <http://www.projekat.org/predicate/podnosilac_zahteva> \"%s\"^^<http://www.w3.org/2000/01/rdf-schema#Literal>",
						email));
		return getDocumentsId(sparqlQuery);
	}

	public ArrayList<String> readAllUnansweredZahteviId(String type) {
		ArrayList<String> unansweredZahtev = new ArrayList<String>();

		String sparqlQuery = SparqlUtil
				.selectDistinctData(
						String.join("/", propertiesConfiguration.getFusekiConfiguration().getEndpoint(),
								propertiesConfiguration.getFusekiConfiguration().getDataset(),
								propertiesConfiguration.getFusekiConfiguration().getData()) + GRAPH_URI + type,
						"?s ?p ?o");
		ArrayList<String> all = getDocumentsId(sparqlQuery);

		sparqlQuery = SparqlUtil.selectObjectData(
				String.join("/", propertiesConfiguration.getFusekiConfiguration().getEndpoint(),
						propertiesConfiguration.getFusekiConfiguration().getDataset(),
						propertiesConfiguration.getFusekiConfiguration().getData()) + GRAPH_URI + "/obavestenja",
				"?s <http://www.projekat.org/predicate/zahtev_na_koji_se_odnosi_obavestenje> ?o");
		ArrayList<String> answeredZahtev = getDocumentsId(sparqlQuery);
		for (String id : all) {
			boolean exist = false;
			for (String answeredId : answeredZahtev) {
				answeredId = answeredId.split("\\^\\^")[0];
				if (id.equals(answeredId)) {
					exist = true;
				}
			}
			if (!exist) {
				unansweredZahtev.add(id);
			}
		}
		return unansweredZahtev;
	}

	public ArrayList<String> readAllObavestenjaIdByEmail(String type, String email) {
		String sparqlQuery = SparqlUtil.selectData(
				String.join("/", propertiesConfiguration.getFusekiConfiguration().getEndpoint(),
						propertiesConfiguration
								.getFusekiConfiguration().getDataset(),
						propertiesConfiguration.getFusekiConfiguration().getData()) + GRAPH_URI + type,
				String.format(
						"?s <http://www.projekat.org/predicate/trazilac_informacija> \"%s\"^^<http://www.w3.org/2000/01/rdf-schema#Literal>",
						email));
		return getDocumentsId(sparqlQuery);
	}
}
