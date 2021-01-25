package projectXML.team9.controllers;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.net.URLConnection;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import projectXML.team9.dto.ZahteviDTO;
import projectXML.team9.models.korisnik.Korisnik;
import projectXML.team9.models.obavestenje.Obavestenje;
import projectXML.team9.services.ObavestenjeService;

@RestController
@RequestMapping(value = "/api/obavestenja", produces = MediaType.APPLICATION_XML_VALUE)
public class ObavestenjeController {

	@Autowired
	private ObavestenjeService obavestenjeService;

	@GetMapping(value = "/generate-pdf/{id}")
	@CrossOrigin
	public byte[] generatePDFZahtev(@PathVariable String id) {
		try {
			String path = obavestenjeService.generatePDFZahtev(id);
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
			String path = obavestenjeService.generateHTMLZahtev(id);
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
	
	@GetMapping
	@CrossOrigin
	public ResponseEntity getObavestenja() {
		ZahteviDTO zahtevi = new ZahteviDTO();
		try {
			Korisnik user = (Korisnik) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			ArrayList<String> idsZahteva = obavestenjeService.getZahtevi(user.getEmail());
			zahtevi.setZahtev(idsZahteva);
			return ResponseEntity.ok(zahtevi);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
}
