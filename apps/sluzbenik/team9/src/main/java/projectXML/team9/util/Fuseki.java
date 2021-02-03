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
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;

@Component
public class Fuseki {

	private static final String RDF_FILEPATH = "src/main/resources/rdf/rdfOutput.rdf";

	private static final String JSON_FILEPATH = "src/main/resources/rdf/";

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

	public ArrayList<String> readAllZahteviForZalbaCutanje(String datum, String email) {
		String sparqlQuery = SparqlUtil.selectDistinctData(
				String.join("/", propertiesConfiguration.getFusekiConfiguration().getEndpoint(),
						propertiesConfiguration
								.getFusekiConfiguration().getDataset(),
						propertiesConfiguration.getFusekiConfiguration().getData()) + GRAPH_URI + "/zahtevi",
				String.format(
						"?s <http://www.projekat.org/predicate/podnosilac_zahteva> \"%s\"^^<http://www.w3.org/2000/01/rdf-schema#Literal> ",
						email) + "\n FILTER NOT EXISTS { ?s <http://www.projekat.org/predicate/status> ?o } ."
						+ "\n ?s   <http://www.projekat.org/predicate/datum_podnosenja> ?date . FILTER"
						+ String.format("( ?date < \"%s\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )", datum));
		ArrayList<String> answeredZahtev = getDocumentsId(sparqlQuery);

		return answeredZahtev;
	}

	public ArrayList<String> readAllRejectedZahteviIdByCitizenEmail(String email) {
		String sparqlQuery = SparqlUtil.selectDistinctData(
				String.join("/", propertiesConfiguration.getFusekiConfiguration().getEndpoint(),
						propertiesConfiguration
								.getFusekiConfiguration().getDataset(),
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

	public ArrayList<String> getDocumentIdThatHasReferenceOnOtherDocumentWithThisId(String object, String type) {
		String sparqlQuery = SparqlUtil.selectDistinctData(
				String.join("/", propertiesConfiguration.getFusekiConfiguration().getEndpoint(),
						propertiesConfiguration.getFusekiConfiguration().getDataset(),
						propertiesConfiguration.getFusekiConfiguration().getData()) + GRAPH_URI + type,
				String.format("?s ?p %s", object));
		return getDocumentsId(sparqlQuery);
	}

	public ArrayList<String> getDocumentIdThatIsReferencedByDocumentWithThisId(String subject, String predicate,
			String type) {
		String sparqlQuery = SparqlUtil.selectObjectData(
				String.join("/", propertiesConfiguration.getFusekiConfiguration().getEndpoint(),
						propertiesConfiguration.getFusekiConfiguration().getDataset(),
						propertiesConfiguration.getFusekiConfiguration().getData()) + GRAPH_URI + type,
				String.format("<%s> <%s> ?o", subject, predicate));
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

	public ResultSet getDocumentMetaDataById(String sparqlQuery) {
		QueryExecution queryExecution = QueryExecutionFactory
				.sparqlService(String.join("/", propertiesConfiguration.getFusekiConfiguration().getEndpoint(),
						propertiesConfiguration.getFusekiConfiguration().getDataset(),
						propertiesConfiguration.getFusekiConfiguration().getQuery()), sparqlQuery);

		return queryExecution.execSelect();
	}

	public String getZahtevMetaDataByIdAsJSON(String zahtevId) throws FileNotFoundException {
		String sparqlQuery = SparqlUtil.selectPredicateObjectData(
				"http://localhost:8080/fuseki/SluzbenikDataset/data/metadata/zahtevi",
				String.format("<http://localhost:4200/zahtev/%s>  ?predicate  ?object", zahtevId));

		ResultSet result = getDocumentMetaDataById(sparqlQuery);

		String path = JSON_FILEPATH + String.format("%s.json", zahtevId);
		OutputStream output = new FileOutputStream(path);

		ResultSetFormatter.outputAsJSON(output, result);

		return path;
	}

	public String getZahtevMetaDataByIdAsXML(String zahtevId) throws FileNotFoundException {
		String sparqlQuery = SparqlUtil.selectPredicateObjectData(
				"http://localhost:8080/fuseki/SluzbenikDataset/data/metadata/zahtevi",
				String.format("<http://localhost:4200/zahtev/%s>  ?predicate  ?object", zahtevId));

		ResultSet result = getDocumentMetaDataById(sparqlQuery);

		String path = JSON_FILEPATH + String.format("%s.xml", zahtevId);
		OutputStream output = new FileOutputStream(path);

		ResultSetFormatter.outputAsXML(output, result);

		return path;
	}

	public String getDocumentMetaDataByIdAsRDF(String type, String zahtevId, String graph)
			throws FileNotFoundException {
		String sparqlQuery = SparqlUtil.describeData(String.format("http://localhost:4200/%s/%s", type, zahtevId),
				String.format("http://localhost:8080/fuseki/SluzbenikDataset/data/metadata/%s", graph),
				String.format("<http://localhost:4200/%s/%s>  ?p  ?o", type, zahtevId));

		QueryExecution queryExecution = QueryExecutionFactory
				.sparqlService(String.join("/", propertiesConfiguration.getFusekiConfiguration().getEndpoint(),
						propertiesConfiguration.getFusekiConfiguration().getDataset(),
						propertiesConfiguration.getFusekiConfiguration().getQuery()), sparqlQuery);

		String path = JSON_FILEPATH + String.format("%s.rdf", zahtevId);
		OutputStream output = new FileOutputStream(path);

		Model describeModel = queryExecution.execDescribe();
		describeModel.write(output);

		return path;
	}

	public String getObavestenjeMetaDataByIdAsJSON(String obavestenjeId) throws FileNotFoundException {
		String sparqlQuery = SparqlUtil.selectPredicateObjectData(
				"http://localhost:8080/fuseki/SluzbenikDataset/data/metadata/obavestenja",
				String.format("<http://localhost:4200/obavestenje/%s>  ?predicate  ?object", obavestenjeId));

		ResultSet result = getDocumentMetaDataById(sparqlQuery);

		String path = JSON_FILEPATH + String.format("%s.json", obavestenjeId);
		OutputStream output = new FileOutputStream(path);

		ResultSetFormatter.outputAsJSON(output, result);

		return path;
	}

	public String getObavestenjeMetaDataByIdAsXML(String obavestenjeId) throws FileNotFoundException {
		String sparqlQuery = SparqlUtil.selectPredicateObjectData(
				"http://localhost:8080/fuseki/SluzbenikDataset/data/metadata/obavestenja",
				String.format("<http://localhost:4200/obavestenje/%s>  ?predicate  ?object", obavestenjeId));

		ResultSet result = getDocumentMetaDataById(sparqlQuery);

		String path = JSON_FILEPATH + String.format("%s.xml", obavestenjeId);
		OutputStream output = new FileOutputStream(path);

		ResultSetFormatter.outputAsXML(output, result);

		return path;
	}

	public ArrayList<String> searchMetadata(String data, String graph) {
		String sparqlQuery = SparqlUtil.selectDistinctData(
				String.format("http://localhost:8080/fuseki/SluzbenikDataset/data/metadata/%s", graph),
				String.format("?s ?p ?o . filter (LCASE(str(?o))=%s)", data));

		return getDocumentsId(sparqlQuery);
	}

	public ArrayList<String> readAllDocuments(String type) {
		String sparqlQuery = SparqlUtil
				.selectDistinctData(
						String.join("/", propertiesConfiguration.getFusekiConfiguration().getEndpoint(),
								propertiesConfiguration.getFusekiConfiguration().getDataset(),
								propertiesConfiguration.getFusekiConfiguration().getData()) + GRAPH_URI + type,
						"?s ?p ?o");
		return getDocumentsId(sparqlQuery);
	}
}
