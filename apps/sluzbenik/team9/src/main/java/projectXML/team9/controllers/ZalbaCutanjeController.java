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

import projectXML.team9.models.zalbaCutanje.TAdresa;
import projectXML.team9.models.zalbaCutanje.ZalbaNaCutanje;
import projectXML.team9.services.ZalbaCutanjeService;

@RestController
@RequestMapping(value = "/api/zalba-cutanje")
public class ZalbaCutanjeController {

	@Autowired
	private ZalbaCutanjeService zalbaCutanjeService;

	@GetMapping(value = "/{naziv}")
	public ResponseEntity<String> getElement(@PathVariable String naziv) {
		String document;
		try {
			document = zalbaCutanjeService.getDocument(naziv);
		} catch (SAXException e) {
			return new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (JAXBException e) {
			return new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<String>(document, HttpStatus.OK);
	}
	
	@PutMapping(value = "/{naziv}", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> changeAddress(@PathVariable String naziv, @RequestBody TAdresa adresa){
		try {
			zalbaCutanjeService.changeAddress(naziv, adresa);
		} catch (JAXBException e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (SAXException e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (IOException e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
	@PostMapping(value = "/{naziv}", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> createZalbaCutanje(@PathVariable String naziv, @RequestBody ZalbaNaCutanje zalba){
		try {
			zalbaCutanjeService.createZalbaCutanje(zalba, naziv);
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
