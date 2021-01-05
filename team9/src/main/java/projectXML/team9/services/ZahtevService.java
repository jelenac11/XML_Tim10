package projectXML.team9.services;

import java.time.ZoneId;
import java.util.Date;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import projectXML.team9.models.zahtev.ZahtevGradjana;
import projectXML.team9.repositories.ZahtevRepository;

@Service
public class ZahtevService {

	@Autowired
	private ZahtevRepository zahtevRepository;
	
	public ZahtevGradjana getZahtev(String id) throws Exception {
		ZahtevGradjana zahtev = zahtevRepository.getById(id);
		return zahtev;
	}
	public ZahtevGradjana create(ZahtevGradjana zahtevGradjana) throws Exception {
		String id = UUID.randomUUID().toString();
		zahtevGradjana.setId(id);
		zahtevGradjana.setBrojZahteva(id.split("-")[4]+"-"+new Date().toInstant().atZone(ZoneId.systemDefault()).getMonthValue()+"/2020");
		zahtevRepository.save(zahtevGradjana);
		return zahtevGradjana;
	}
}
