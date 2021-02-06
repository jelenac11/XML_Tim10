package projectXML.team10.poverenik.controllers;

import java.io.File;
import java.io.FileInputStream;
import java.net.URL;
import java.util.ArrayList;

import javax.xml.namespace.QName;
import javax.xml.ws.Service;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import projectXML.team10.poverenik.soap.StringArray;
import projectXML.team10.poverenik.soap.ports.used.ResenjaPort;
import projectXML.team10.poverenik.dto.DocumentsIDDTO;
import projectXML.team10.poverenik.dto.SearchDTO;
import projectXML.team10.poverenik.dto.XSLTDocumentDTO;
import projectXML.team10.poverenik.models.korisnik.Korisnik;
import projectXML.team10.poverenik.services.ResenjeService;

@RestController
@RequestMapping(value = "/api/resenje", produces = MediaType.APPLICATION_XML_VALUE)
public class ResenjeController {

	@Autowired
	private ResenjeService resenjeService;
	
	@GetMapping(value = "/generate-pdf/{id}")
	@CrossOrigin
	public byte[] generatePDFResenje(@PathVariable String id) {
		try {
			String path = resenjeService.generatePDFResenje(id);
			File file = new File(path);
			FileInputStream fileInputStream = new FileInputStream(file);
			return IOUtils.toByteArray(fileInputStream);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@GetMapping
	@CrossOrigin
	public ResponseEntity<?> getResenjaByCurrentUser() {
		StringArray resenja = new StringArray();
		try {
			Korisnik user = (Korisnik) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			ArrayList<String> idsResenja = resenjeService.getResenjaByCurrentUser(user.getEmail());
			resenja.setItem(idsResenja);
			return ResponseEntity.ok(resenja);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
	
	@GetMapping(value = "/poverenik")
	@CrossOrigin
	public ResponseEntity<?> getAll() {
		StringArray resenja = new StringArray();
		try {
			ArrayList<String> idsResenja = resenjeService.getAll();
			resenja.setItem(idsResenja);
			return ResponseEntity.ok(resenja);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@GetMapping(value = "/generate-html/{id}")
	@CrossOrigin
	public byte[] generateXHTMLResenje(@PathVariable String id) {
		try {
			String path = resenjeService.generateHTMLResenje(id);
			File file = new File(path);
			FileInputStream fileInputStream = new FileInputStream(file);
			return IOUtils.toByteArray(fileInputStream);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@GetMapping(value = "XSLTDocument/{id}")
	@CrossOrigin
	public ResponseEntity<?> getXSLTresenje(@PathVariable String id) {
		String resenjeXSLT;
		try {
			resenjeXSLT = resenjeService.getXSLTResenje(id);
			XSLTDocumentDTO document = new XSLTDocumentDTO();
			document.setXslt(resenjeXSLT);
			return ResponseEntity.ok(document);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
	
	@PostMapping(value = "transform")
	@CrossOrigin
	public ResponseEntity<?> transform(@RequestBody String xml) {
		String resenjeXSLT;
		try {
			resenjeXSLT = resenjeService.generateHTML(xml);
			XSLTDocumentDTO document = new XSLTDocumentDTO();
			document.setXslt(resenjeXSLT);
			return ResponseEntity.ok(document);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@GetMapping(value = "/{id}")
	@CrossOrigin
	public ResponseEntity<?> ResponseEntitygetOdluka(@PathVariable String id) {
		String odluka;
		try {
			odluka = resenjeService.getOdlukaPoverioca(id);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		} 
		return ResponseEntity.ok(odluka);
	}
	
	@PostMapping(consumes = MediaType.APPLICATION_XML_VALUE)
	@CrossOrigin
	public ResponseEntity<?> createOdlukaPoverioca(@RequestBody String odluka){
		try {
			URL wsdl = new URL("http://localhost:8081/ws/resenja?wsdl");
	    	QName serviceName = new QName("http://www.projekat.org/ws/resenja", "ResenjaService");
	    	QName portName = new QName("http://www.projekat.org/ws/resenja", "ResenjePort");
	    	
	    	Service service = Service.create(wsdl, serviceName);
	        ResenjaPort resenjaPort = service.getPort(portName, ResenjaPort.class);

	        resenjaPort.storeOdlukaPoverioca(odluka);
			return ResponseEntity.ok(resenjeService.create(odluka));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
	
	
	@GetMapping(value = "references-on/{id}")
	@CrossOrigin
	public ResponseEntity<?> getDocumentIdThatIsReferencedByDocumentWithThisId(@PathVariable String id) {
		try {
			ArrayList<String> item = resenjeService.getDocumentIdThatIsReferencedByDocumentWithThisId(id);
			return ResponseEntity.ok(new StringArray(item));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
	
	
	@GetMapping(value = "extract-metadata/json/{id}")
	@CrossOrigin
	public byte[] extractMetadataAsJSONById(@PathVariable String id) {
		try {
			String path = resenjeService.getDocumentMetaDataByIdAsJSON(id);
			File file = new File(path);
			FileInputStream fileInputStream = new FileInputStream(file);
			return IOUtils.toByteArray(fileInputStream);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@GetMapping(value = "extract-metadata/xml/{id}")
	@CrossOrigin
	public byte[] extractMetadataAsXMLById(@PathVariable String id) {
		try {
			String path = resenjeService.getDocumentMetaDataByIdAsXML(id);
			File file = new File(path);
			FileInputStream fileInputStream = new FileInputStream(file);
			return IOUtils.toByteArray(fileInputStream);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@GetMapping(value = "extract-metadata/rdf/{id}")
	@CrossOrigin
	public byte[] extractMetadataAsRDFById(@PathVariable String id) {
		try {
			String path = resenjeService.getDocumentMetaDataByIdAsRDF(id);
			File file = new File(path);
			FileInputStream fileInputStream = new FileInputStream(file);
			return IOUtils.toByteArray(fileInputStream);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@GetMapping(value = "all")
	@CrossOrigin
	public ResponseEntity<?> getAllResenja() {
		DocumentsIDDTO iddto = new DocumentsIDDTO();
		try {
			iddto.setItem(resenjeService.getAllResenja());
			return ResponseEntity.ok(iddto);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
	
	@PutMapping(value = "/search")
	@CrossOrigin
	public ResponseEntity<?> search(@RequestBody SearchDTO searchDTO) {
		try {
			DocumentsIDDTO iddto = new DocumentsIDDTO();
			iddto.setItem(new ArrayList<String>());
			iddto.getItem().addAll(resenjeService.search(searchDTO));

			return ResponseEntity.ok(iddto);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
	
}
