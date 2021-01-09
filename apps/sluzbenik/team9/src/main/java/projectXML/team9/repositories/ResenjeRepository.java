package projectXML.team9.repositories;

import org.springframework.stereotype.Repository;

import projectXML.team9.models.resenje.OdlukaPoverioca.OpisŽalbe.Organ;
import projectXML.team9.parser.DOMParser;
import projectXML.team9.parser.DOMWriter;

@Repository
public class ResenjeRepository {
	
	
	public String loadDocument(String naziv, String elementName) {
		return DOMParser.ucitaj(naziv,elementName);
	}

	public String putOrgan(String naziv, Organ organ) {
		DOMWriter.putOrgan(naziv, organ);
		return null;
	}
	
}
