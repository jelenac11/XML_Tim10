package projectXML.team9.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import projectXML.team9.models.resenje.OdlukaPoverioca.OpisŽalbe.Organ;
import projectXML.team9.repositories.ResenjeRepository;

@Service
public class ResenjeService {

	@Autowired
	private ResenjeRepository resenjeRepository;
	
	
	public String getDocument(String naziv, String elementName) {
		return resenjeRepository.loadDocument(naziv, elementName); 
	}


	public String putOrgan(String naziv, Organ organ) {
		
		return resenjeRepository.putOrgan(naziv, organ);
	}

}
