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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import projectXML.team9.dto.DocumentsIDDTO;
import projectXML.team9.dto.XSLTDocumentDTO;
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
	public byte[] generatePDFObavestenje(@PathVariable String id) {
		try {
			String path = obavestenjeService.generatePDFObavestenje(id);
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
	public byte[] generateHTMLObavestenje(@PathVariable String id) {
		try {
			String path = obavestenjeService.generateHTMLObavestenje(id);
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
	public ResponseEntity<?> getObavestenje(@PathVariable String id) {
		Obavestenje obavestenje;
		try {
			obavestenje = obavestenjeService.getObavestenje(id);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		return ResponseEntity.ok(obavestenje);
	}

	@GetMapping(value = "references-on/{id}")
	@CrossOrigin
	public ResponseEntity<?> getreferencesOn(@PathVariable String id) {
		DocumentsIDDTO documentsIDDTO = new DocumentsIDDTO();
		try {
			documentsIDDTO.setZahtev(obavestenjeService.getReferencesOn(id));
			return ResponseEntity.ok(documentsIDDTO);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@GetMapping(value = "XSLTDocument/{id}")
	@CrossOrigin
	public ResponseEntity<?> getXSLTObavestenje(@PathVariable String id) {
		String obavestenjeXSLT;
		try {
			obavestenjeXSLT = obavestenjeService.getXSLTObavestenje(id);
			XSLTDocumentDTO document = new XSLTDocumentDTO();
			document.setXslt(obavestenjeXSLT);
			return ResponseEntity.ok(document);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@PostMapping(consumes = MediaType.APPLICATION_XML_VALUE)
	@CrossOrigin
	public ResponseEntity<?> createObavestenje(@RequestBody Obavestenje obavestenje) {
		try {
			obavestenje = obavestenjeService.create(obavestenje);
			return ResponseEntity.ok(obavestenje);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@GetMapping
	@CrossOrigin
	public ResponseEntity<?> getObavestenjaByCitizenEmail() {
		DocumentsIDDTO documents = new DocumentsIDDTO();
		try {
			Korisnik user = (Korisnik) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			ArrayList<String> documentsID = obavestenjeService.getObavestenjaByCitizenEmail(user.getEmail());
			documents.setZahtev(documentsID);
			return ResponseEntity.ok(documents);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@GetMapping(value = "extract-metadata/json/{id}")
	@CrossOrigin
	public byte[] extractMetadataAsJSONById(@PathVariable String id) {
		try {
			String path = obavestenjeService.getDocumentMetaDataByIdAsJSON(id);
			File file = new File(path);
			FileInputStream fileInputStream = new FileInputStream(file);
			return IOUtils.toByteArray(fileInputStream);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@GetMapping(value = "extract-metadata/xml/{id}")
	@CrossOrigin
	public byte[] extractMetadataAsXMLById(@PathVariable String id) {
		try {
			String path = obavestenjeService.getDocumentMetaDataByIdAsXML(id);
			File file = new File(path);
			FileInputStream fileInputStream = new FileInputStream(file);
			return IOUtils.toByteArray(fileInputStream);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@GetMapping(value = "extract-metadata/rdf/{id}")
	@CrossOrigin
	public byte[] extractMetadataAsRDFById(@PathVariable String id) {
		try {
			String path = obavestenjeService.getDocumentMetaDataByIdAsRDF(id);
			File file = new File(path);
			FileInputStream fileInputStream = new FileInputStream(file);
			return IOUtils.toByteArray(fileInputStream);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
