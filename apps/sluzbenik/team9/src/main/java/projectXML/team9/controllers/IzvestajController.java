package projectXML.team9.controllers;

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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import projectXML.team9.dto.DocumentsIDDTO;
import projectXML.team9.dto.SearchDTO;
import projectXML.team9.models.izvestaj.Izvestaj;
import projectXML.team9.services.IzvestajService;
import projectXML.team9.soap.XSLTDocumentDTO;
import projectXML.team9.soap.ports.used.IzvestajiPort;

@RestController
@RequestMapping(value = "/api/izvestaji", produces = MediaType.APPLICATION_XML_VALUE)
public class IzvestajController {

	@Autowired
	public IzvestajService izvestajService;
	
	@GetMapping()
	@CrossOrigin
	public ResponseEntity<?> createIzvestaj() {
		try {
			URL wsdl = new URL("http://localhost:8082/ws/izvestaji?wsdl");
	    	QName serviceName = new QName("http://www.projekat.org/ws/izvestaji", "IzvestajiService");
	    	QName portName = new QName("http://www.projekat.org/ws/izvestaji", "IzvestajPort");
	    	Service service = Service.create(wsdl, serviceName);
	        IzvestajiPort izvestajiPort = service.getPort(portName, IzvestajiPort.class);

	        Izvestaj izvestaj = izvestajService.create();
	        izvestaj = izvestajiPort.storeIzvestaj(izvestaj);
	        izvestajService.save(izvestaj);
			return new ResponseEntity<String>(izvestaj.getId(), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
	
	@GetMapping(value = "/generate-pdf/{id}")
	@CrossOrigin
	public byte[] generatePDFIzvestaj(@PathVariable String id) {
		try {
			String path = izvestajService.generatePDFIzvestaj(id);
			File file = new File(path);
			FileInputStream fileInputStream = new FileInputStream(file);
			return IOUtils.toByteArray(fileInputStream);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@GetMapping(value = "/generate-html/{id}")
	@CrossOrigin
	public byte[] generateXHTMLIzvestaj(@PathVariable String id) {
		try {
			String path = izvestajService.generateHTMLIzvestaj(id);
			File file = new File(path);
			FileInputStream fileInputStream = new FileInputStream(file);
			return IOUtils.toByteArray(fileInputStream);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@GetMapping(value = "/{id}")
	@CrossOrigin
	public ResponseEntity<?> getIzvestaj(@PathVariable String id) {
		Izvestaj izvestaj;
		try {
			izvestaj = izvestajService.getIzvestaj(id);
			return ResponseEntity.ok(izvestaj);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@GetMapping(value = "XSLTDocument/{id}")
	@CrossOrigin
	public ResponseEntity<?> getXSLTIzvestaj(@PathVariable String id) {
		String izvestajXSLT;
		try {
			izvestajXSLT = izvestajService.getXSLTIzvestaj(id);
			XSLTDocumentDTO document = new XSLTDocumentDTO();
			document.setXslt(izvestajXSLT);
			return ResponseEntity.ok(document);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
	
	@GetMapping(value = "extract-metadata/json/{id}")
	@CrossOrigin
	public byte[] extractMetadataAsJSONById(@PathVariable String id) {
		try {
			String path = izvestajService.getDocumentMetaDataByIdAsJSON(id);
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
			String path = izvestajService.getDocumentMetaDataByIdAsXML(id);
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
			String path = izvestajService.getDocumentMetaDataByIdAsRDF(id);
			File file = new File(path);
			FileInputStream fileInputStream = new FileInputStream(file);
			return IOUtils.toByteArray(fileInputStream);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@PutMapping(value = "/search")
	@CrossOrigin
	public ResponseEntity<?> search(@RequestBody SearchDTO searchDTO) {
		try {
			DocumentsIDDTO iddto = new DocumentsIDDTO();
			iddto.setZahtev(new ArrayList<String>());
			iddto.getZahtev().addAll(izvestajService.search(searchDTO));

			return ResponseEntity.ok(iddto);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

}
