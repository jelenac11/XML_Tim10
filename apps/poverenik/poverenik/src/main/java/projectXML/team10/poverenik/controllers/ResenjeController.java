package projectXML.team10.poverenik.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import projectXML.team10.poverenik.services.ResenjeService;

@RestController
@RequestMapping(value = "/api/resenje", produces = MediaType.APPLICATION_XML_VALUE)
public class ResenjeController {

	@Autowired
	private ResenjeService resenjeService;

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
			resenjeService.create(odluka);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		return ResponseEntity.ok(odluka);
	}
	
}
