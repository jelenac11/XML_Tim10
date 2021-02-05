package projectXML.team10.poverenik.util;

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

import projectXML.team10.poverenik.configuration.PropertiesConfiguration;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;

@Component
public class FusekiWriter {
    private static final String RDF_FILEPATH = "src/main/resources/rdf/rdfOutput.rdf";
    private static final String GRAPH_URI = "/metadata";

	private static final String JSON_FILEPATH = "src/main/resources/rdf/";
    
	@Autowired
	private PropertiesConfiguration propertiesConfiguration;
	
	public static void updateZalbaWithStatus(boolean status, String zalbaId, String type, String db) throws IOException {
        AuthenticationUtilities.ConnectionProperties conn = AuthenticationUtilities.loadProperties();
		//Delete first triplet
        String sparqlUpdate = SparqlUtil.deleteData(
        		conn.dataEndpoint + GRAPH_URI + type,
        		String.format("<http://localhost:4200%s/%s>  <http://www.projekat.org/predicate/status> false",db, zalbaId));
		UpdateRequest request = UpdateFactory.create();
        UpdateProcessor processor = UpdateExecutionFactory.createRemote(request,conn.updateEndpoint);
		UpdateRequest update = UpdateFactory.create(sparqlUpdate);
	    processor = UpdateExecutionFactory.createRemote(update,conn.updateEndpoint);
	    processor.execute();
        
        //Inseert
        sparqlUpdate = SparqlUtil.insertData(
				conn.dataEndpoint + GRAPH_URI + type,
				String.format("<http://localhost:4200%s/%s>  <http://www.projekat.org/predicate/status>  %b",db, zalbaId, status));
		
		request = UpdateFactory.create();
        processor = UpdateExecutionFactory.createRemote(request,conn.updateEndpoint);
		update = UpdateFactory.create(sparqlUpdate);
	    processor = UpdateExecutionFactory.createRemote(update,conn.updateEndpoint);
	    processor.execute();
	}
	

    public static void saveRDF(String type) throws IOException {
        AuthenticationUtilities.ConnectionProperties conn = AuthenticationUtilities.loadProperties();

        Model model = ModelFactory.createDefaultModel();
        model.read(RDF_FILEPATH);

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        model.write(out, SparqlUtil.NTRIPLES);
        model.write(System.out, SparqlUtil.RDF_XML);

        UpdateRequest request = UpdateFactory.create();
        UpdateProcessor processor = UpdateExecutionFactory.createRemote(request,conn.updateEndpoint);
        processor.execute();
        String sparqlUpdate = SparqlUtil.insertData(conn.dataEndpoint + GRAPH_URI + type,
                new String(out.toByteArray()));

        UpdateRequest update = UpdateFactory.create(sparqlUpdate);
        processor = UpdateExecutionFactory.createRemote(update,conn.updateEndpoint);
        processor.execute();
        
        String sparqlQuery = SparqlUtil.selectData(conn.dataEndpoint + GRAPH_URI + type, "?s ?p ?o");
		
		// Create a QueryExecution that will access a SPARQL service over HTTP
        QueryExecution query = QueryExecutionFactory.sparqlService(conn.queryEndpoint, sparqlQuery);

		
		// Query the collection, dump output response as XML
		ResultSet results = query.execSelect();
		
		ResultSetFormatter.outputAsXML(System.out, results);
		
		query.close() ;
		
		System.out.println("[INFO] End.");

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
    
    public ArrayList<String> readAllZalbeCutanjeIdByEmail(String type, String email) {
		String sparqlQuery = SparqlUtil.selectDistinctData(
				String.join("/", propertiesConfiguration.getFusekiConfiguration().getEndpoint(),
						propertiesConfiguration
								.getFusekiConfiguration().getDataset(),
						propertiesConfiguration.getFusekiConfiguration().getData()) + GRAPH_URI + type,
				String.format(
						"?s <http://www.projekat.org/predicate/podnosilac_zalbe> \"%s\"^^<http://www.w3.org/2000/01/rdf-schema#Literal>",
						email));
		return getDocumentsId(sparqlQuery);
	}
    
    public ArrayList<String> readAllZalbeNaOdlukuIdByEmail(String type, String email) {
		String sparqlQuery = SparqlUtil.selectDistinctData(
				String.join("/", propertiesConfiguration.getFusekiConfiguration().getEndpoint(),
						propertiesConfiguration
								.getFusekiConfiguration().getDataset(),
						propertiesConfiguration.getFusekiConfiguration().getData()) + GRAPH_URI + type,
				String.format(
						"?s <http://www.projekat.org/predicate/podnosilac_zalbe> \"%s\"^^<http://www.w3.org/2000/01/rdf-schema#Literal>",
						email));
		return getDocumentsId(sparqlQuery);
	}
    
    public ArrayList<String> readAllResenjaIdByEmail(String type, String email) {
		String sparqlQuery = SparqlUtil.selectDistinctData(
				String.join("/", propertiesConfiguration.getFusekiConfiguration().getEndpoint(),
						propertiesConfiguration
								.getFusekiConfiguration().getDataset(),
						propertiesConfiguration.getFusekiConfiguration().getData()) + GRAPH_URI + type,
				String.format(
						"?s <http://www.projekat.org/predicate/podnosilac_zalbe> \"%s\"^^<http://www.w3.org/2000/01/rdf-schema#Literal>",
						email));
		return getDocumentsId(sparqlQuery);
	}

	public ArrayList<String> readAllZalbeCutanje(String string) {
		String sparqlQuery = SparqlUtil.selectData(
				String.join("/", propertiesConfiguration.getFusekiConfiguration().getEndpoint(),
						propertiesConfiguration
								.getFusekiConfiguration().getDataset(),
						propertiesConfiguration.getFusekiConfiguration().getData()) + GRAPH_URI + "/zalbe-na-cutanje",
				String.format(
						"?s <http://www.projekat.org/predicate/status> false"));
		return getDocumentsId(sparqlQuery);
	}
	
	public ArrayList<String> readAllZalbeNaOdluku(String string) {
		String sparqlQuery = SparqlUtil.selectData(
				String.join("/", propertiesConfiguration.getFusekiConfiguration().getEndpoint(),
						propertiesConfiguration
								.getFusekiConfiguration().getDataset(),
						propertiesConfiguration.getFusekiConfiguration().getData()) + GRAPH_URI + "/zalbe-na-odluku",
				String.format(
						"?s <http://www.projekat.org/predicate/status> false"));
		return getDocumentsId(sparqlQuery);
	}
	
	public ArrayList<String> readAllResenja(String type, String poverenik) {
		String sparqlQuery = SparqlUtil.selectData(
				String.join("/", propertiesConfiguration.getFusekiConfiguration().getEndpoint(),
						propertiesConfiguration
								.getFusekiConfiguration().getDataset(),
						propertiesConfiguration.getFusekiConfiguration().getData()) + GRAPH_URI + type,
				String.format(
						"?s <http://www.projekat.org/predicate/poverenik> \"%s\"^^<http://www.w3.org/2000/01/rdf-schema#Literal>",
						poverenik));
		return getDocumentsId(sparqlQuery);
	}

	public ArrayList<String> readAllResenja(String type) {
		String sparqlQuery = SparqlUtil.selectDataJustSubject(
				String.join("/", propertiesConfiguration.getFusekiConfiguration().getEndpoint(),
						propertiesConfiguration
								.getFusekiConfiguration().getDataset(),
						propertiesConfiguration.getFusekiConfiguration().getData()) + GRAPH_URI + type,
				"?s ?p ?o");
		return getDocumentsId(sparqlQuery);
    public ArrayList<String> readAllDocuments(String type) {
		String sparqlQuery = SparqlUtil
				.selectDistinctData(
						String.join("/", propertiesConfiguration.getFusekiConfiguration().getEndpoint(),
								propertiesConfiguration.getFusekiConfiguration().getDataset(),
								propertiesConfiguration.getFusekiConfiguration().getData()) + GRAPH_URI + type,
						"?s ?p ?o");
		return getDocumentsId(sparqlQuery);
	}
    
    public ResultSet getDocumentMetaDataById(String sparqlQuery) {
		QueryExecution queryExecution = QueryExecutionFactory
				.sparqlService(String.join("/", propertiesConfiguration.getFusekiConfiguration().getEndpoint(),
						propertiesConfiguration.getFusekiConfiguration().getDataset(),
						propertiesConfiguration.getFusekiConfiguration().getQuery()), sparqlQuery);

		return queryExecution.execSelect();
	}
    
    public String getZalbaCutanjeMetaDataByIdAsJSON(String zalbaId) throws FileNotFoundException {
		String sparqlQuery = SparqlUtil.selectPredicateObjectData(
				"http://localhost:8080/fusekiPoverenik/PoverenikDataset/data/metadata/zalbe-na-cutanje",
				String.format("<http://localhost:4201/zalbe-cutanje/%s>  ?predicate  ?object", zalbaId));

		ResultSet result = getDocumentMetaDataById(sparqlQuery);

		String path = JSON_FILEPATH + String.format("%s.json", zalbaId);
		OutputStream output = new FileOutputStream(path);

		ResultSetFormatter.outputAsJSON(output, result);

		return path;
	}

	public String getZalbaCutanjeMetaDataByIdAsXML(String zalbaId) throws FileNotFoundException {
		String sparqlQuery = SparqlUtil.selectPredicateObjectData(
				"http://localhost:8080/fusekiPoverenik/PoverenikDataset/data/metadata/zalbe-na-cutanje",
				String.format("<http://localhost:4201/zalbe-cutanje/%s>  ?predicate  ?object", zalbaId));

		ResultSet result = getDocumentMetaDataById(sparqlQuery);

		String path = JSON_FILEPATH + String.format("%s.xml", zalbaId);
		OutputStream output = new FileOutputStream(path);

		ResultSetFormatter.outputAsXML(output, result);

		return path;
	}
	
	 public String getIzvestajMetaDataByIdAsJSON(String izvestajId) throws FileNotFoundException {
			String sparqlQuery = SparqlUtil.selectPredicateObjectData(
					"http://localhost:8080/fusekiPoverenik/PoverenikDataset/data/metadata/izvestaji",
					String.format("<http://localhost:4201/izvestaji/%s>  ?predicate  ?object", izvestajId));

			ResultSet result = getDocumentMetaDataById(sparqlQuery);

			String path = JSON_FILEPATH + String.format("%s.json", izvestajId);
			OutputStream output = new FileOutputStream(path);

			ResultSetFormatter.outputAsJSON(output, result);

			return path;
		}

		public String getIzvestajMetaDataByIdAsXML(String izvestajId) throws FileNotFoundException {
			String sparqlQuery = SparqlUtil.selectPredicateObjectData(
					"http://localhost:8080/fusekiPoverenik/PoverenikDataset/data/metadata/izvestaji",
					String.format("<http://localhost:4201/izvestaji/%s>  ?predicate  ?object", izvestajId));

			ResultSet result = getDocumentMetaDataById(sparqlQuery);

			String path = JSON_FILEPATH + String.format("%s.xml", izvestajId);
			OutputStream output = new FileOutputStream(path);

			ResultSetFormatter.outputAsXML(output, result);

			return path;
		}

	public String getZalbaNaOdlukuMetaDataByIdAsJSON(String zalbaId) throws FileNotFoundException {
		String sparqlQuery = SparqlUtil.selectPredicateObjectData(
				"http://localhost:8080/fusekiPoverenik/PoverenikDataset/data/metadata/zalbe-na-odluku",
				String.format("<http://localhost:4201/zalbe-na-odluku/%s>  ?predicate  ?object", zalbaId));

		ResultSet result = getDocumentMetaDataById(sparqlQuery);

		String path = JSON_FILEPATH + String.format("%s.json", zalbaId);
		OutputStream output = new FileOutputStream(path);

		ResultSetFormatter.outputAsJSON(output, result);

		return path;
	}

	public String getZalbaNaOdlukuMetaDataByIdAsXML(String zalbaId) throws FileNotFoundException {
		String sparqlQuery = SparqlUtil.selectPredicateObjectData(
				"http://localhost:8080/fusekiPoverenik/PoverenikDataset/data/metadata/zalbe-na-odluku",
				String.format("<http://localhost:4201/zalbe-na-odluku/%s>  ?predicate  ?object", zalbaId));

		ResultSet result = getDocumentMetaDataById(sparqlQuery);

		String path = JSON_FILEPATH + String.format("%s.xml", zalbaId);
		OutputStream output = new FileOutputStream(path);

		ResultSetFormatter.outputAsXML(output, result);

		return path;
	}
	
	public String getDocumentMetaDataByIdAsRDF(String type, String zalbaId, String graph)
			throws FileNotFoundException {
		String sparqlQuery = SparqlUtil.describeData(String.format("http://localhost:4201/%s/%s", type, zalbaId),
				String.format("http://localhost:8080/fusekiPoverenik/PoverenikDataset/data/metadata/%s", graph),
				String.format("<http://localhost:4201/%s/%s>  ?p  ?o", type, zalbaId));

		QueryExecution queryExecution = QueryExecutionFactory
				.sparqlService(String.join("/", propertiesConfiguration.getFusekiConfiguration().getEndpoint(),
						propertiesConfiguration.getFusekiConfiguration().getDataset(),
						propertiesConfiguration.getFusekiConfiguration().getQuery()), sparqlQuery);

		String path = JSON_FILEPATH + String.format("%s.ttl", zalbaId);
		OutputStream output = new FileOutputStream(path);

		Model describeModel = queryExecution.execDescribe();
		describeModel.write(output, "TURTLE");

		return path;
	}

}
