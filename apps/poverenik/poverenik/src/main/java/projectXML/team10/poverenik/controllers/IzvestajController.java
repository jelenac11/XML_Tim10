package projectXML.team10.poverenik.controllers;

import java.io.File;
import java.io.FileInputStream;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import projectXML.team10.poverenik.dto.XSLTDocumentDTO;
import projectXML.team10.poverenik.models.izvestaj.Izvestaj;
import projectXML.team10.poverenik.services.IzvestajService;

@RestController
@RequestMapping(value = "/api/izvestaj", produces = MediaType.APPLICATION_XML_VALUE)
public class IzvestajController {

	@Autowired
	public IzvestajService izvestajService;
	
	@GetMapping(value = "/generate-pdf/{id}")
	@CrossOrigin
	public byte[] generatePDFIzvestaj(@PathVariable String id) {
		try {
			String path = izvestajService.generatePDFIzvestaj(id);
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
	public byte[] generateXHTMLIzvestaj(@PathVariable String id) {
		try {
			String path = izvestajService.generateHTMLIzvestaj(id);
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
	public ResponseEntity<?> getIzvestaj(@PathVariable String id) {
		Izvestaj izvestaj;
		try {
			izvestaj = izvestajService.getIzvestaj(id);
			return ResponseEntity.ok(izvestaj);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@GetMapping(value = "XSLTDocument/{id}")
	@CrossOrigin
	public ResponseEntity<?> getXSLTIzvestaj(@PathVariable String id) {
		String izvestajXSLT;
		try {
			izvestajXSLT = izvestajService.getXSLTIzvestaj(id);
			XSLTDocumentDTO document = new XSLTDocumentDTO();
			document.setXslt(izvestajXSLT);
			return ResponseEntity.ok(document);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

}
