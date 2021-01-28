package projectXML.team9.controllers;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;

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
import projectXML.team9.dto.XSLTDocumentDTO;
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
	public ResponseEntity getZahtev(@PathVariable String id) {
		ZahtevGradjana zahtev;
		try {
			zahtev = zahtevService.getZahtev(id);
			return ResponseEntity.ok(zahtev);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@GetMapping(value = "XSLTDocument/{id}")
	@CrossOrigin
	public ResponseEntity getXSLTZahtev(@PathVariable String id) {
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
	public ResponseEntity getZahtevi() {
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
	public ResponseEntity getUnansweredZahtevi() {
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
	public ResponseEntity createZahtev(@RequestBody ZahtevGradjana zahtevGradjana) {
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
}
