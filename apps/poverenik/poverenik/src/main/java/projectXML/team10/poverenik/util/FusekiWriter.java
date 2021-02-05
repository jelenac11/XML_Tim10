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
import java.io.IOException;
import java.util.ArrayList;

@Component
public class FusekiWriter {
    private static final String RDF_FILEPATH = "src/main/resources/rdf/rdfOutput.rdf";
    private static final String GRAPH_URI = "/metadata";
    
	@Autowired
	private PropertiesConfiguration propertiesConfiguration;

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
