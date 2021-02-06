package projectXML.team9.controllers;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import projectXML.team9.soap.StringArray;
import projectXML.team9.soap.XSLTDocumentDTO;
import projectXML.team9.dto.DocumentsIDDTO;
import projectXML.team9.dto.SearchDTO;
import projectXML.team9.services.ResenjeService;

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
	
	@GetMapping(value = "references-on/{id}")
	@CrossOrigin
	public ResponseEntity<?> getDocumentIdThatIsReferencedByDocumentWithThisId(@PathVariable String id) {
		try {
			ArrayList<String> item = resenjeService.getDocumentIdThatIsReferencedByDocumentWithThisId(id);
			return ResponseEntity.ok(new projectXML.team9.soap.data.StringArray(item));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
	
	
	@GetMapping(value = "extract-metadata/json/{id}")
	@CrossOrigin
	public byte[] extractMetadataAsJSONById(@PathVariable String id) {
		try {
			String path = resenjeService.getDocumentMetaDataByIdAsJSON(id);
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
			String path = resenjeService.getDocumentMetaDataByIdAsXML(id);
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
			String path = resenjeService.getDocumentMetaDataByIdAsRDF(id);
			File file = new File(path);
			FileInputStream fileInputStream = new FileInputStream(file);
			return IOUtils.toByteArray(fileInputStream);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@GetMapping(value = "all")
	@CrossOrigin
	public ResponseEntity<?> getAllResenja() {
		DocumentsIDDTO iddto = new DocumentsIDDTO();
		try {
			iddto.setZahtev(resenjeService.getAllResenja());
			return ResponseEntity.ok(iddto);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
	
	@PutMapping(value = "/search")
	@CrossOrigin
	public ResponseEntity<?> search(@RequestBody SearchDTO searchDTO) {
		try {
			DocumentsIDDTO iddto = new DocumentsIDDTO();
			iddto.setZahtev(new ArrayList<String>());
			iddto.getZahtev().addAll(resenjeService.search(searchDTO));

			return ResponseEntity.ok(iddto);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
	
}
