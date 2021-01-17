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
import projectXML.team9.models.obavestenje.Obavestenje;
import projectXML.team9.services.ObavestenjeService;

@RestController
@RequestMapping(value = "/api/obavestenja", produces = MediaType.APPLICATION_XML_VALUE)
public class ObavestenjeController {

	@Autowired
	private ObavestenjeService obavestenjeService;

	@GetMapping(value = "/generate-pdf-html/{id}")
	@CrossOrigin
	public ResponseEntity<Void> generatePDFAndHTMLZahtev(@PathVariable String id) {
		try {
			obavestenjeService.generatePDFAndHTMLZahtev(id);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	@GetMapping(value = "/{id}")
	@CrossOrigin
	public ResponseEntity getObavestenje(@PathVariable String id) {
		Obavestenje obavestenje;

		try {
			obavestenje = obavestenjeService.getObavestenje(id);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		return ResponseEntity.ok(obavestenje);
	}

	@PostMapping(consumes = MediaType.APPLICATION_XML_VALUE)
	@CrossOrigin
	public ResponseEntity createObavestenje(@RequestBody Obavestenje obavestenje) {
		try {
			obavestenje = obavestenjeService.create(obavestenje);
			return ResponseEntity.ok(obavestenje);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
}
