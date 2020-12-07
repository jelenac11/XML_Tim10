package projectXML.team9.controllers;

import java.io.IOException;

import javax.xml.bind.JAXBException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.xml.sax.SAXException;

import projectXML.team9.models.zalbaNaOdluku.ZalbaNaOdluku;
import projectXML.team9.services.ZalbaNaOdlukuService;

@RestController
@RequestMapping(value = "/api/zalba-na-odluku")
public class ZalbaNaOdlukuController {

	@Autowired
	private ZalbaNaOdlukuService zalbaNaOdlukuService;

	@GetMapping(value = "/{naziv}")
	public ResponseEntity<String> getDocument(@PathVariable String naziv) {
		String document;
		try {
			document = zalbaNaOdlukuService.getDocument(naziv);
		} catch (SAXException e) {
			return new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (JAXBException e) {
			return new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<String>(document, HttpStatus.OK);
	}
	
	@PutMapping(value = "/{naziv}")
	public ResponseEntity<Void> changeDrugiPodaciZaKontaktZalioca(@PathVariable String naziv, @RequestBody String broj){
		try {
			zalbaNaOdlukuService.changeDrugiPodaciZaKontaktZalioca(naziv, broj);
		} catch (JAXBException e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (SAXException e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (IOException e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> createZalbaNaOdluku(@RequestBody ZalbaNaOdluku zalba){
		try {
			zalbaNaOdlukuService.createZalbaNaOdluku(zalba);
		} catch (JAXBException e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (SAXException e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (IOException e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
	
}
