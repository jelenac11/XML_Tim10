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
import projectXML.team10.poverenik.soap.ports.used.ZahteviPort;
import projectXML.team10.poverenik.dto.DocumentsIDDTO;
import projectXML.team10.poverenik.dto.SearchDTO;
import projectXML.team10.poverenik.soap.XSLTDocument;
import projectXML.team10.poverenik.dto.XSLTDocumentDTO;
import projectXML.team10.poverenik.models.korisnik.Korisnik;
import projectXML.team10.poverenik.models.zahtev.ZahtevGradjana;
import projectXML.team10.poverenik.models.zalbaNaOdluku.ZalbaNaOdluku;
import projectXML.team10.poverenik.services.ZalbaNaOdlukuService;

@RestController
@CrossOrigin(origins = "http://localhost:4201", maxAge = 3600, allowedHeaders = "*")
@RequestMapping(value = "/api/zalbe-na-odluku", produces = MediaType.APPLICATION_XML_VALUE)
public class ZalbaNaOdlukuController {

	@Autowired
	private ZalbaNaOdlukuService zalbaNaOdlukuService;

	@GetMapping(value = "/{id}")
	public ResponseEntity<?> getZalba(@PathVariable String id) {
		ZalbaNaOdluku zalba;
		try {
			zalba = zalbaNaOdlukuService.getZalba(id);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		} 
		return ResponseEntity.ok(zalba);
	}
	
	@GetMapping
	public ResponseEntity<?> getZalbeByCurrentUser() {
		StringArray zalbe = new StringArray();
		try {
			Korisnik user = (Korisnik) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			ArrayList<String> idsZalbi = zalbaNaOdlukuService.getZalbeByCurrentUser(user.getEmail());
			zalbe.setItem(idsZalbi);
			return ResponseEntity.ok(zalbe);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
	
	@GetMapping(value = "/poverenik")
	public ResponseEntity<?> getAll() {
		StringArray zalbe = new StringArray();
		try {
			ArrayList<String> idsZalbi = zalbaNaOdlukuService.getAll();
			zalbe.setItem(idsZalbi);
			return ResponseEntity.ok(zalbe);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
	
	@PostMapping(consumes = MediaType.APPLICATION_XML_VALUE)
	public ResponseEntity<?> createZalbaNaOdluku(@RequestBody ZalbaNaOdluku zalba){
		try {
			zalbaNaOdlukuService.create(zalba);
			URL wsdl = new URL("http://localhost:8081/ws/zahtevi?wsdl");
	    	QName serviceName = new QName("http://www.projekat.org/ws/zahtevi", "ZahteviService");
	    	QName portName = new QName("http://www.projekat.org/ws/zahtevi", "ZahtevPort");
	    	
	    	Service service = Service.create(wsdl, serviceName);
	        ZahteviPort zahteviPort = service.getPort(portName, ZahteviPort.class);

	        zahteviPort.updateZahtev(zalba.getBrojZahteva().split("/")[4]);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		return ResponseEntity.ok(zalba);
	}
	
	@GetMapping(value = "/odbijeniZahtevi")
	public ResponseEntity<?> getOdbijeniZahtevi() {
		Korisnik current = null;
		try {
			current = (Korisnik) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			URL wsdl = new URL("http://localhost:8081/ws/zahtevi?wsdl");
	    	QName serviceName = new QName("http://www.projekat.org/ws/zahtevi", "ZahteviService");
	    	QName portName = new QName("http://www.projekat.org/ws/zahtevi", "ZahtevPort");
	    	
	    	Service service = Service.create(wsdl, serviceName);
	        ZahteviPort zahteviPort = service.getPort(portName, ZahteviPort.class);

	        StringArray items = zahteviPort.getOdbijeniZahtevi(current.getEmail());
			return ResponseEntity.ok(items);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping(value = "/XSLTZahtev/{id}")
	public ResponseEntity<?> getZahtevById(@PathVariable String id) {
		try {
			URL wsdl = new URL("http://localhost:8081/ws/zahtevi?wsdl");
	    	QName serviceName = new QName("http://www.projekat.org/ws/zahtevi", "ZahteviService");
	    	QName portName = new QName("http://www.projekat.org/ws/zahtevi", "ZahtevPort");
	    	
	    	Service service = Service.create(wsdl, serviceName);
	        ZahteviPort zahteviPort = service.getPort(portName, ZahteviPort.class);

	        XSLTDocument zahtevXSLT = zahteviPort.getZahtevById(id);
			return ResponseEntity.ok(zahtevXSLT);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping(value = "/zahtev/{id}")
	public ResponseEntity<?> getZahtev(@PathVariable String id) {
		try {
			URL wsdl = new URL("http://localhost:8081/ws/zahtevi?wsdl");
	    	QName serviceName = new QName("http://www.projekat.org/ws/zahtevi", "ZahteviService");
	    	QName portName = new QName("http://www.projekat.org/ws/zahtevi", "ZahtevPort");
	    	
	    	Service service = Service.create(wsdl, serviceName);
	        ZahteviPort zahteviPort = service.getPort(portName, ZahteviPort.class);

	        ZahtevGradjana zahtev = zahteviPort.getZahtev(id);
			return ResponseEntity.ok(zahtev);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping(value = "XSLTDocument/{id}")
	public ResponseEntity<?> getXSLTZalbaNaOdluku(@PathVariable String id) {
		String zalbaXSLT;
		try {
			zalbaXSLT = zalbaNaOdlukuService.getXSLTZalba(id);
			XSLTDocumentDTO document = new XSLTDocumentDTO();
			document.setXslt(zalbaXSLT);
			return ResponseEntity.ok(document);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
	
	@GetMapping(value = "/generate-pdf/{id}")
	public byte[] generatePDFZalbaNaOdluku(@PathVariable String id) {
		try {
			String path = zalbaNaOdlukuService.generatePDFZalbaNaOdluku(id);
			File file = new File(path);
			FileInputStream fileInputStream = new FileInputStream(file);
			return IOUtils.toByteArray(fileInputStream);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@GetMapping(value = "/generate-html/{id}")
	public byte[] generateXHTMLZalbaNaOdluku(@PathVariable String id) {
		try {
			String path = zalbaNaOdlukuService.generateHTMLZalbaNaOdluku(id);
			File file = new File(path);
			FileInputStream fileInputStream = new FileInputStream(file);
			return IOUtils.toByteArray(fileInputStream);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@GetMapping(value = "extract-metadata/json/{id}")
	public byte[] extractMetadataAsJSONById(@PathVariable String id) {
		try {
			String path = zalbaNaOdlukuService.getDocumentMetaDataByIdAsJSON(id);
			File file = new File(path);
			FileInputStream fileInputStream = new FileInputStream(file);
			return IOUtils.toByteArray(fileInputStream);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@GetMapping(value = "extract-metadata/xml/{id}")
	public byte[] extractMetadataAsXMLById(@PathVariable String id) {
		try {
			String path = zalbaNaOdlukuService.getDocumentMetaDataByIdAsXML(id);
			File file = new File(path);
			FileInputStream fileInputStream = new FileInputStream(file);
			return IOUtils.toByteArray(fileInputStream);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@GetMapping(value = "extract-metadata/rdf/{id}")
	public byte[] extractMetadataAsRDFById(@PathVariable String id) {
		try {
			String path = zalbaNaOdlukuService.getDocumentMetaDataByIdAsRDF(id);
			File file = new File(path);
			FileInputStream fileInputStream = new FileInputStream(file);
			return IOUtils.toByteArray(fileInputStream);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@GetMapping(value = "all")
	public ResponseEntity<?> getAllZalbeCutanje() {
		DocumentsIDDTO iddto = new DocumentsIDDTO();
		try {
			iddto.setItem(zalbaNaOdlukuService.getAllZalbeNaOdluku());
			return ResponseEntity.ok(iddto);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
	
	@PutMapping(value = "/search")
	public ResponseEntity<?> search(@RequestBody SearchDTO searchDTO) {
		try {
			DocumentsIDDTO iddto = new DocumentsIDDTO();
			iddto.setItem(new ArrayList<String>());
			iddto.getItem().addAll(zalbaNaOdlukuService.search(searchDTO));

			return ResponseEntity.ok(iddto);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
	
	@GetMapping(value = "references-on/{id}")
	public ResponseEntity<?> getDocumentIdThatIsReferencedByDocumentWithThisId(@PathVariable String id) {
		DocumentsIDDTO documentsIDDTO = new DocumentsIDDTO();
		try {
			documentsIDDTO.setItem(zalbaNaOdlukuService.getDocumentIdThatIsReferencedByDocumentWithThisId(id));
			return ResponseEntity.ok(documentsIDDTO);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
}
