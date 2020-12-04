package projectXML.team9.controllers;


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

import projectXML.team9.models.resenje.OdlukaPoverioca.OpisŽalbe.Organ;
import projectXML.team9.services.ResenjeService;

@RestController
@RequestMapping(value = "/api/resenje")
public class ResenjeController {
	
	@Autowired
	private ResenjeService resenjeService;

	@GetMapping(value = "/{naziv}/{element}",produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> getElement(@PathVariable String naziv, @PathVariable String element) {
		String document = resenjeService.getDocument(naziv, element);
		return new ResponseEntity<String>(document, HttpStatus.OK);
	}
	
	@PutMapping(value = "/{naziv}",
			consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> putOrgan(@PathVariable String naziv, @RequestBody Organ organ){
		
		String elementNovi = resenjeService.putOrgan(naziv,organ);
		
		return new ResponseEntity<String>(elementNovi,HttpStatus.OK);
	}
}
