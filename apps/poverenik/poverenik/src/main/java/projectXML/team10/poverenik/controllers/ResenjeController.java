package projectXML.team10.poverenik.controllers;

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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import projectXML.team10.poverenik.soap.StringArray;
import projectXML.team10.poverenik.dto.XSLTDocumentDTO;
import projectXML.team10.poverenik.models.korisnik.Korisnik;
import projectXML.team10.poverenik.services.ResenjeService;

@RestController
@RequestMapping(value = "/api/resenje", produces = MediaType.APPLICATION_XML_VALUE)
public class ResenjeController {

	@Autowired
	private ResenjeService resenjeService;
	
	@GetMapping(value = "/generate-pdf/{id}")
	@CrossOrigin
	public byte[] generatePDFResenje(@PathVariable String id) {
		try {
			String path = resenjeService.generatePDFResenje(id);
			File file = new File(path);
			FileInputStream fileInputStream = new FileInputStream(file);
			return IOUtils.toByteArray(fileInputStream);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@GetMapping
	@CrossOrigin
	public ResponseEntity<?> getResenjaByCurrentUser() {
		StringArray resenja = new StringArray();
		try {
			Korisnik user = (Korisnik) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			ArrayList<String> idsResenja = resenjeService.getResenjaByCurrentUser(user.getEmail());
			resenja.setItem(idsResenja);
			return ResponseEntity.ok(resenja);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
	
	@GetMapping(value = "/poverenik")
	@CrossOrigin
	public ResponseEntity<?> getAll() {
		StringArray resenja = new StringArray();
		try {
			ArrayList<String> idsResenja = resenjeService.getAll();
			resenja.setItem(idsResenja);
			return ResponseEntity.ok(resenja);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@GetMapping(value = "/generate-html/{id}")
	@CrossOrigin
	public byte[] generateXHTMLResenje(@PathVariable String id) {
		try {
			String path = resenjeService.generateHTMLResenje(id);
			File file = new File(path);
			FileInputStream fileInputStream = new FileInputStream(file);
			return IOUtils.toByteArray(fileInputStream);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@GetMapping(value = "XSLTDocument/{id}")
	@CrossOrigin
	public ResponseEntity<?> getXSLTresenje(@PathVariable String id) {
		String resenjeXSLT;
		try {
			resenjeXSLT = resenjeService.getXSLTResenje(id);
			XSLTDocumentDTO document = new XSLTDocumentDTO();
			document.setXslt(resenjeXSLT);
			return ResponseEntity.ok(document);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
	
	@PostMapping(value = "transform")
	@CrossOrigin
	public ResponseEntity<?> transform(@RequestBody String xml) {
		String resenjeXSLT;
		try {
			resenjeXSLT = resenjeService.generateHTML(xml);
			XSLTDocumentDTO document = new XSLTDocumentDTO();
			document.setXslt(resenjeXSLT);
			return ResponseEntity.ok(document);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

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
			return ResponseEntity.ok(resenjeService.create(odluka));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
	
}
