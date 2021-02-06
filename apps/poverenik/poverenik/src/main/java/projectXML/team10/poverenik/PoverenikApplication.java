package projectXML.team10.poverenik;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.xmldb.api.base.XMLDBException;

import projectXML.team10.poverenik.models.korisnik.Korisnik;
import projectXML.team10.poverenik.services.KorisnikService;
import projectXML.team10.poverenik.util.DatabaseConnector;

@SpringBootApplication
public class PoverenikApplication {

	public static void main(String[] args) {
		//System.setProperty("javax.xml.bind.JAXBContext", "com.sun.xml.internal.bind.v2.ContextFactory");
		ConfigurableApplicationContext appContext = SpringApplication.run(PoverenikApplication.class, args);
	    
		DatabaseConnector connector = appContext.getBean(DatabaseConnector.class);
		try {
			connector.getOrCreateCollection("/db/sample/izvestaji", 0);
			connector.getOrCreateCollection("/db/sample/korisnici", 0);
			connector.getOrCreateCollection("/db/sample/odlukePoverioca", 0);
			connector.getOrCreateCollection("/db/sample/zalbeCutanje", 0);
			connector.getOrCreateCollection("/db/sample/zalbeNaOdluku", 0);
		} catch (ClassNotFoundException | InstantiationException | IllegalAccessException | XMLDBException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		KorisnikService service = appContext.getBean(KorisnikService.class);
	    Korisnik k = new Korisnik("Milan", "Marinović", "poverenik@gmail.com", "sifra123", "poverenik", "");
	    try {
	    	if (service.findByEmail("poverenik@gmail.com") == null)
	    		service.create(k);
		} catch (Exception e) {
			e.printStackTrace();
		}
	    Korisnik k2 = new Korisnik("Mico", "Micic", "milanm2998@gmail.com", "sifra123", "gradjanin", "");
		try {
			if (service.findByEmail("milanm2998@gmail.com") == null)
				service.create(k2);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
