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

import projectXML.team10.poverenik.models.zalbaNaOdluku.ZalbaNaOdluku;
import projectXML.team10.poverenik.services.ZalbaNaOdlukuService;

@RestController
@RequestMapping(value = "/api/zalba-na-odluku")
public class ZalbaNaOdlukuController {

	@Autowired
	private ZalbaNaOdlukuService zalbaNaOdlukuService;

	@GetMapping(value = "/{id}")
	@CrossOrigin
	public ResponseEntity getZalba(@PathVariable String id) {
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
	public ResponseEntity createZalbaCutanje(@RequestBody ZalbaNaOdluku zalba){
		try {
			zalbaNaOdlukuService.create(zalba);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		return ResponseEntity.ok(zalba);
	}
	
}
