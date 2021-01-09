package projectXML.team10.poverenik.services;

import java.time.ZoneId;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import projectXML.team10.poverenik.models.zalbaNaOdluku.ZalbaNaOdluku;
import projectXML.team10.poverenik.repositories.ZalbaNaOdlukuRepository;

@Service
public class ZalbaNaOdlukuService {

	@Autowired
	private ZalbaNaOdlukuRepository zalbaNaOdlukuRepository;

	public ZalbaNaOdluku getZalba(String id) throws Exception {
		ZalbaNaOdluku zalba = zalbaNaOdlukuRepository.getById(id);
		return zalba;
	}

	public ZalbaNaOdluku create(ZalbaNaOdluku zalba) throws Exception {
		String id = UUID.randomUUID().toString();
		zalba.setId(id);
		zalba.setBrojZalbe(id.split("-")[4] + "-" + new Date().toInstant().atZone(ZoneId.systemDefault()).getMonthValue() + "/2020");
		zalbaNaOdlukuRepository.save(zalba);
		return zalba;
	}
	
}
