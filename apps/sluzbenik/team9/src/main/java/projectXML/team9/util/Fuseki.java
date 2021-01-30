package projectXML.team9.util;

import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;
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

	}

	public ArrayList<String> getDocumentsId(String sparqlQuery) {
		ArrayList<String> ids = new ArrayList<String>();

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

				ids.add(varValue.toString());
			}
		}
		return ids;
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
		String sparqlQuery = SparqlUtil.selectDistinctData(
				String.join("/", propertiesConfiguration.getFusekiConfiguration().getEndpoint(),
						propertiesConfiguration.getFusekiConfiguration().getDataset(),
						propertiesConfiguration.getFusekiConfiguration().getData()) + GRAPH_URI + "/zahtevi",
				" ?s ?o ?p \r\n" + "MINUS \r\n" + "  {\r\n" + "  select ?s WHERE { \r\n"
						+ "    ?s <http://www.projekat.org/predicate/status> ?o }\r\n" + "  }");
		ArrayList<String> answeredZahtev = getDocumentsId(sparqlQuery);

		return answeredZahtev;
	}
	
	public ArrayList<String> readAllRejectedZahteviIdByCitizenEmail(String email) {
		String sparqlQuery = SparqlUtil.selectDistinctData(
				String.join("/", propertiesConfiguration.getFusekiConfiguration().getEndpoint(),
						propertiesConfiguration.getFusekiConfiguration().getDataset(),
						propertiesConfiguration.getFusekiConfiguration().getData()) + GRAPH_URI + "/zahtevi",
				" ?s <http://www.projekat.org/predicate/status> false ; \n" + String.format(
				"<http://www.projekat.org/predicate/podnosilac_zahteva> \"%s\"^^<http://www.w3.org/2000/01/rdf-schema#Literal>", 
				email));
		ArrayList<String> answeredZahtev = getDocumentsId(sparqlQuery);

		return answeredZahtev;
	}

	public ArrayList<String> readAllObavestenjaIdByCitizenEmail(String type, String email) {
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

	public void updateZahtevWithStatus(boolean status, String zahtevId) {
		String sparqlUpdate = SparqlUtil.insertData(
				"http://localhost:8080/fuseki/SluzbenikDataset/data/metadata/zahtevi",
				String.format("<%s>  <http://www.projekat.org/predicate/status>  %b", zahtevId, status));
		update(sparqlUpdate);
	}

	public void update(String sparqlUpdate) {
		UpdateRequest update = UpdateFactory.create(sparqlUpdate);

		// UpdateProcessor sends update request to a remote SPARQL update service.
		UpdateProcessor processor = UpdateExecutionFactory.createRemote(update,
				String.join("/", propertiesConfiguration.getFusekiConfiguration().getEndpoint(),
						propertiesConfiguration.getFusekiConfiguration().getDataset(),
						propertiesConfiguration.getFusekiConfiguration().getUpdate()));
		processor.execute();
	}
}
