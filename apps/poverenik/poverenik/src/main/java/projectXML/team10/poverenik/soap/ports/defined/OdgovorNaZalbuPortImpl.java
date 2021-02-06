package projectXML.team10.poverenik.soap.ports.defined;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import projectXML.team10.poverenik.services.ZalbaCutanjeService;
import projectXML.team10.poverenik.services.ZalbaNaOdlukuService;
import projectXML.team10.poverenik.soap.StringArray;


@javax.jws.WebService(
        serviceName = "OdgovorNaZalbuService",
        portName = "OdgovorPort",
        targetNamespace = "http://www.projekat.org/ws/odgovor",
        endpointInterface = "projectXML.team10.poverenik.soap.ports.defined.OdgovorNaZalbuPort")
@Service
public class OdgovorNaZalbuPortImpl implements OdgovorNaZalbuPort {

	@Autowired
	private ZalbaCutanjeService zalbaCutanjeService;
	
	@Autowired
	private ZalbaNaOdlukuService zalbaNaOdlukuService;
	
	@Override
	public StringArray getZalbeNaKojeTrebaOdgovoriti() {
		ArrayList<String> item = new ArrayList<String>();
		try {
			for(String id : zalbaCutanjeService.getZalbeNotAnswered()) {
				id = id + "|" + "cutanje";
				item.add(id);
			}
			for(String id : zalbaNaOdlukuService.getZalbeNotAnswered()) {
				id = id + "|" + "odluka";
				item.add(id);
			}
			
		} catch (Exception e) {
			System.out.println(e);
		}
		return new StringArray(item);
	}

	@Override
	public void prihvatiZalbu(String id, String tip) {
		try {			
			if(tip.equals("cutanje")) {
				zalbaCutanjeService.odustaniOdZalbe(id);
			}
			else {
				zalbaNaOdlukuService.odustaniOdZalbe(id);
			}
		} catch (Exception e) {
			System.out.println(e);
		}
	}

	@Override
	public void odbiZalbu(String id, String tip) {
		try {			
			if(tip.equals("cutanje")) {
				zalbaCutanjeService.odbiZalbu(id);
			}
			else {
				zalbaNaOdlukuService.odbiZalbu(id);
			}
		} catch (Exception e) {
			
		}
		
	}

	
}

