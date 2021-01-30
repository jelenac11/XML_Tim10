package projectXML.team10.poverenik.controllers;

import java.net.URL;

import javax.xml.namespace.QName;
import javax.xml.ws.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.java.dev.jaxb.array.StringArray;
import net.java.dev.jaxb.array.TStringArray;
import projectXML.team10.poverenik.dto.TXSLTDocumentDTO;
import projectXML.team10.poverenik.dto.XSLTDocumentDTO;
import projectXML.team10.poverenik.models.korisnik.Korisnik;
import projectXML.team10.poverenik.models.zalbaNaOdluku.ZalbaNaOdluku;
import projectXML.team10.poverenik.services.ZalbaNaOdlukuService;
import projectXML.team10.poverenik.soap.ports.ZahteviPort;

@RestController
@RequestMapping(value = "/api/zalba-na-odluku", produces = MediaType.APPLICATION_XML_VALUE)
public class ZalbaNaOdlukuController {

	@Autowired
	private ZalbaNaOdlukuService zalbaNaOdlukuService;

	@GetMapping(value = "/{id}")
	@CrossOrigin
	public ResponseEntity<?> getZalba(@PathVariable String id) {
		ZalbaNaOdluku zalba;
		try {
			zalba = zalbaNaOdlukuService.getZalba(id);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		} 
		return ResponseEntity.ok(zalba);
	}
	
	@PostMapping(consumes = MediaType.APPLICATION_XML_VALUE)
	@CrossOrigin
	public ResponseEntity<?> createZalbaCutanje(@RequestBody ZalbaNaOdluku zalba){
		try {
			zalbaNaOdlukuService.create(zalba);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		return ResponseEntity.ok(zalba);
	}
	
	@GetMapping(value = "/odbijeniZahtevi")
	@CrossOrigin
	public ResponseEntity<?> getOdbijeniZahtevi() {
		Korisnik current = null;
		try {
			current = (Korisnik) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			URL wsdl = new URL("http://localhost:8081/ws/zahtevi?wsdl");
	    	QName serviceName = new QName("http://www.projekat.org/ws/zahtevi", "ZahteviService");
	    	QName portName = new QName("http://www.projekat.org/ws/zahtevi", "ZahtevPort");
	    	
	    	Service service = Service.create(wsdl, serviceName);
	    	
	        ZahteviPort zahteviPort = service.getPort(portName, ZahteviPort.class);
	        TStringArray items = zahteviPort.getOdbijeniZahtevi(current.getEmail());
			StringArray sa = new StringArray(items.getItem());
			return ResponseEntity.ok(sa);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping(value = "/XSLTZahtev/{id}")
	@CrossOrigin
	public ResponseEntity<?> getZahtevById(@PathVariable String id) {
		try {
			URL wsdl = new URL("http://localhost:8081/ws/zahtevi?wsdl");
	    	QName serviceName = new QName("http://www.projekat.org/ws/zahtevi", "ZahteviService");
	    	QName portName = new QName("http://www.projekat.org/ws/zahtevi", "ZahtevPort");
	    	
	    	Service service = Service.create(wsdl, serviceName);
	    	
	        ZahteviPort zahteviPort = service.getPort(portName, ZahteviPort.class);
	        TXSLTDocumentDTO zahtevXSLT = zahteviPort.getZahtevById(id);
	        XSLTDocumentDTO zahtev = new XSLTDocumentDTO(zahtevXSLT.getXslt());
			return ResponseEntity.ok(zahtev);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}
