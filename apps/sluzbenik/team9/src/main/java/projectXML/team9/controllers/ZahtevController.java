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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import projectXML.team9.dto.DocumentsIDDTO;
import projectXML.team9.dto.SearchDTO;
import projectXML.team9.soap.TStringArray;
import projectXML.team9.soap.XSLTDocumentDTO;
import projectXML.team9.soap.ports.used.OdgovorNaZalbuPort;
import projectXML.team9.soap.ports.used.ZalbePort;
import projectXML.team9.models.korisnik.Korisnik;
import projectXML.team9.models.zahtev.ZahtevGradjana;
import projectXML.team9.services.ZahtevService;

@RestController
@RequestMapping(value = "/api/zahtevi", produces = MediaType.APPLICATION_XML_VALUE)
public class ZahtevController {

	@Autowired
	private ZahtevService zahtevService;

	@GetMapping(value = "/generate-pdf/{id}")
	@CrossOrigin
	public byte[] generatePDFZahtev(@PathVariable String id) {
		try {
			String path = zahtevService.generatePDFZahtev(id);
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
	public byte[] generateXHTMLZahtev(@PathVariable String id) {
		try {
			String path = zahtevService.generateHTMLZahtev(id);
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
	public ResponseEntity<?> getZahtev(@PathVariable String id) {
		ZahtevGradjana zahtev;
		try {
			zahtev = zahtevService.getZahtev(id);
			return ResponseEntity.ok(zahtev);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@GetMapping(value = "all")
	@CrossOrigin
	public ResponseEntity<?> getAllZahtevi() {
		DocumentsIDDTO iddto = new DocumentsIDDTO();
		try {
			iddto.setZahtev(zahtevService.getAllZahtevi());
			return ResponseEntity.ok(iddto);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@GetMapping(value = "extract-metadata/json/{id}")
	@CrossOrigin
	public byte[] extractMetadataAsJSONById(@PathVariable String id) {
		try {
			String path = zahtevService.getDocumentMetaDataByIdAsJSON(id);
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
			String path = zahtevService.getDocumentMetaDataByIdAsXML(id);
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
			String path = zahtevService.getDocumentMetaDataByIdAsRDF(id);
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
	public ResponseEntity<?> getXSLTZahtev(@PathVariable String id) {
		String zahtevXSLT;
		try {
			zahtevXSLT = zahtevService.getXSLTZahtev(id);
			XSLTDocumentDTO document = new XSLTDocumentDTO();
			document.setXslt(zahtevXSLT);
			return ResponseEntity.ok(document);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@GetMapping
	@CrossOrigin
	public ResponseEntity<?> getZahteviByCurrentUser() {
		DocumentsIDDTO zahtevi = new DocumentsIDDTO();
		try {
			Korisnik user = (Korisnik) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			ArrayList<String> idsZahteva = zahtevService.getZahtevi(user.getEmail());
			zahtevi.setZahtev(idsZahteva);
			return ResponseEntity.ok(zahtevi);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@GetMapping(value = "/unanswered-zahtevi")
	@CrossOrigin
	public ResponseEntity<?> getUnansweredZahtevi() {
		DocumentsIDDTO zahtevi = new DocumentsIDDTO();
		try {
			ArrayList<String> idsZahteva = zahtevService.getUnansweredZahtevi();
			zahtevi.setZahtev(idsZahteva);
			return ResponseEntity.ok(zahtevi);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@PostMapping(consumes = MediaType.APPLICATION_XML_VALUE)
	@CrossOrigin
	public ResponseEntity<?> createZahtev(@RequestBody ZahtevGradjana zahtevGradjana) {
		try {
			Korisnik user = (Korisnik) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			ZahtevGradjana zahtev = zahtevService.create(zahtevGradjana, user.getEmail());
			return ResponseEntity.ok(zahtev);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@PutMapping(consumes = MediaType.APPLICATION_XML_VALUE)
	@CrossOrigin
	public void declineZahtev(@RequestBody DocumentsIDDTO zahtevi) {
		try {
			zahtevService.declineZahtev(zahtevi.getZahtev().get(0));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@PutMapping(value = "/search")
	@CrossOrigin
	public ResponseEntity<?> search(@RequestBody SearchDTO searchDTO) {
		try {
			DocumentsIDDTO iddto = new DocumentsIDDTO();
			iddto.setZahtev(new ArrayList<String>());
			iddto.getZahtev().addAll(zahtevService.search(searchDTO));

			return ResponseEntity.ok(iddto);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
	
	@GetMapping(value = "/zalbe-zahtevi")
	@CrossOrigin
	public ResponseEntity<?> getZahteviZalbe() {
		try {
			URL wsdl = new URL("http://localhost:8082/ws/odgovori?wsdl");
	    	QName serviceName = new QName("http://www.projekat.org/ws/odgovor", "OdgovorNaZalbuService");
	    	QName portName = new QName("http://www.projekat.org/ws/odgovor", "OdgovorPort");
	    	
	    	Service service = Service.create(wsdl, serviceName);
	        OdgovorNaZalbuPort odgovorPort = service.getPort(portName, OdgovorNaZalbuPort.class);
			return ResponseEntity.ok(odgovorPort.getZalbeNaKojeTrebaOdgovoriti());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
	
	@PutMapping(value = "/odbi-zalbu/{tip}/{idZalbe}")
	@CrossOrigin
	public void odbiZalbu(@PathVariable String tip ,@PathVariable String idZalbe) {
		try {
			URL wsdl = new URL("http://localhost:8082/ws/odgovori?wsdl");
	    	QName serviceName = new QName("http://www.projekat.org/ws/odgovor", "OdgovorNaZalbuService");
	    	QName portName = new QName("http://www.projekat.org/ws/odgovor", "OdgovorPort");
	    	
	    	Service service = Service.create(wsdl, serviceName);
	        OdgovorNaZalbuPort odgovorPort = service.getPort(portName, OdgovorNaZalbuPort.class);
	        odgovorPort.odbiZalbu(idZalbe, tip);
	        
		} catch (Exception e) {
		}
	}
	
	
	@PutMapping(value = "/prihvati-zalbu/{tip}/{idZalbe}")
	@CrossOrigin
	public void prihvatiZalbu(@PathVariable String tip ,@PathVariable String idZalbe) {
		try {
			URL wsdl = new URL("http://localhost:8082/ws/odgovori?wsdl");
	    	QName serviceName = new QName("http://www.projekat.org/ws/odgovor", "OdgovorNaZalbuService");
	    	QName portName = new QName("http://www.projekat.org/ws/odgovor", "OdgovorPort");
	    	
	    	Service service = Service.create(wsdl, serviceName);
	        OdgovorNaZalbuPort odgovorPort = service.getPort(portName, OdgovorNaZalbuPort.class);
	        odgovorPort.prihvatiZalbu(idZalbe, tip);
	        
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
	
	@GetMapping(value = "/XSLTZalbaCutanje/{id}")
	@CrossOrigin
	public ResponseEntity<?> getZalbaCutanjeById(@PathVariable String id) {
		try {
			URL wsdl = new URL("http://localhost:8082/ws/zalbe?wsdl");
	    	QName serviceName = new QName("http://www.projekat.org/ws/zalbe", "ZalbeService");
	    	QName portName = new QName("http://www.projekat.org/ws/zalbe", "ZalbaPort");
	    	
	    	Service service = Service.create(wsdl, serviceName);
	        ZalbePort zalbePort = service.getPort(portName, ZalbePort.class);

	        XSLTDocumentDTO zalbaXSLT = zalbePort.getXSLTZalbeCutanje(id);
			return ResponseEntity.ok(zalbaXSLT);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping(value = "/XSLTZalbaNaOdluku/{id}")
	@CrossOrigin
	public ResponseEntity<?> getZalbaNaOdlukuById(@PathVariable String id) {
		try {
			URL wsdl = new URL("http://localhost:8082/ws/zalbe?wsdl");
	    	QName serviceName = new QName("http://www.projekat.org/ws/zalbe", "ZalbeService");
	    	QName portName = new QName("http://www.projekat.org/ws/zalbe", "ZalbaPort");
	    	
	    	Service service = Service.create(wsdl, serviceName);
	        ZalbePort zalbePort = service.getPort(portName, ZalbePort.class);

	        XSLTDocumentDTO zalbaXSLT = zalbePort.getXSLTZalbeNaOdluku(id);
			return ResponseEntity.ok(zalbaXSLT);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping(value = "/find-id-with-references-on-zalba-cutanje/{id}")
	@CrossOrigin
	public ResponseEntity<?> findIdWithReferencesOnZalbaCutanje(@PathVariable String id) {
		try {
			URL wsdl = new URL("http://localhost:8082/ws/zalbe?wsdl");
	    	QName serviceName = new QName("http://www.projekat.org/ws/zalbe", "ZalbeService");
	    	QName portName = new QName("http://www.projekat.org/ws/zalbe", "ZalbaPort");
	    	
	    	Service service = Service.create(wsdl, serviceName);
	        ZalbePort zalbePort = service.getPort(portName, ZalbePort.class);

	        TStringArray items = zalbePort.getReferenciraneZalbeCutanje(id);
			return ResponseEntity.ok(items);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping(value = "/find-id-with-references-on-zalba-na-odluku/{id}")
	@CrossOrigin
	public ResponseEntity<?> findIdWithReferencesOnZalbaNaOdluku(@PathVariable String id) {
		try {
			URL wsdl = new URL("http://localhost:8082/ws/zalbe?wsdl");
	    	QName serviceName = new QName("http://www.projekat.org/ws/zalbe", "ZalbeService");
	    	QName portName = new QName("http://www.projekat.org/ws/zalbe", "ZalbaPort");
	    	
	    	Service service = Service.create(wsdl, serviceName);
	        ZalbePort zalbePort = service.getPort(portName, ZalbePort.class);

	        TStringArray items = zalbePort.getReferenciraneZalbeNaOdluku(id);
	        System.out.println(items.getItem().size());
			return ResponseEntity.ok(items);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
