package projectXML.team9.controllers;

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
import projectXML.team9.models.zahtev.ZahtevGradjana;
import projectXML.team9.services.ZahtevService;

@RestController
@RequestMapping(value = "/api/zahtevi", produces = MediaType.APPLICATION_XML_VALUE)
public class ZahtevController {

	@Autowired
	private ZahtevService zahtevService;

	@GetMapping(value = "/{id}")
	@CrossOrigin
	public ResponseEntity getZahtev(@PathVariable String id) {
		ZahtevGradjana zahtev;
		try {
			zahtev = zahtevService.getZahtev(id);
			return ResponseEntity.ok(zahtev);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@PostMapping(consumes = MediaType.APPLICATION_XML_VALUE)
	@CrossOrigin
	public ResponseEntity createZahtev(@RequestBody ZahtevGradjana zahtevGradjana) {
		try {
			ZahtevGradjana zahtev = zahtevService.create(zahtevGradjana);
			return ResponseEntity.ok(zahtev);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
}