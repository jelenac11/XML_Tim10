package projectXML.team10.poverenik.soap.ports.defined;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import projectXML.team10.poverenik.services.ZalbaCutanjeService;
import projectXML.team10.poverenik.services.ZalbaNaOdlukuService;
import projectXML.team10.poverenik.soap.TStringArray;
import projectXML.team10.poverenik.soap.TXSLTDocument;

@javax.jws.WebService(
        serviceName = "ZalbeService",
        portName = "ZalbaPort",
        targetNamespace = "http://www.projekat.org/ws/zalbe",
       // wsdlLocation = "classpath:wsdl/Zalba.wsdl",
        endpointInterface = "projectXML.team10.poverenik.soap.ports.defined.ZalbePort")
@Service
public class ZalbePortImpl implements ZalbePort {
	
	@Autowired
	private ZalbaCutanjeService zalbaCutanjeService;
	
	@Autowired
	private ZalbaNaOdlukuService zalbaNaOdlukuService;

	@Override
	public TStringArray getReferenciraneZalbeCutanje(String id) {
		ArrayList<String> referencirane = zalbaCutanjeService.readAllZalbaCutanjeReferencedByZahtev(id);
		return new TStringArray(referencirane);
	}

	@Override
	public TXSLTDocument getXSLTZalbeCutanje(String id) {
		try {
			String zalbaXSLT = zalbaCutanjeService.getXSLTZalba(id);
			TXSLTDocument document = new TXSLTDocument();
			document.setXslt(zalbaXSLT);
			return document;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public TStringArray getReferenciraneZalbeNaOdluku(String id) {
		ArrayList<String> referencirane = zalbaNaOdlukuService.readAllZalbaNaOdlukuReferencedByZahtev(id);
		System.out.println(referencirane.size());
		return new TStringArray(referencirane);
	}

	@Override
	public TXSLTDocument getXSLTZalbeNaOdluku(String id) {
		try {
			String zalbaXSLT = zalbaNaOdlukuService.getXSLTZalba(id);
			TXSLTDocument document = new TXSLTDocument();
			document.setXslt(zalbaXSLT);
			return document;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

}
