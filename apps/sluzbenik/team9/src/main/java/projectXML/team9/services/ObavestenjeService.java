package projectXML.team9.services;

import java.time.ZoneId;
import java.util.Date;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import projectXML.team9.models.obavestenje.Obavestenje;
import projectXML.team9.repositories.ObavestenjeRepository;

@Service
public class ObavestenjeService {

	@Autowired
	private ObavestenjeRepository obavestenjeRepository;
	
	public Obavestenje getObavestenje(String id) throws Exception {
		Obavestenje obavestenje = obavestenjeRepository.getById(id);
		return obavestenje;
	}

	public Obavestenje create(Obavestenje obavestenje) throws Exception {
		String id = UUID.randomUUID().toString();
		obavestenje.setId(id);
		obavestenje.setBrojObavestenja(id.split("-")[4]+"-"+new Date().toInstant().atZone(ZoneId.systemDefault()).getMonthValue()+"/2020");
		obavestenjeRepository.save(obavestenje);
		return obavestenje;
	}
}
