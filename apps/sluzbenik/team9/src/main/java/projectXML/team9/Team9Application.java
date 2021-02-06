package projectXML.team9;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.xmldb.api.base.XMLDBException;

import projectXML.team9.models.korisnik.Korisnik;
import projectXML.team9.services.KorisnikService;
import projectXML.team9.util.DatabaseConnector;

@SpringBootApplication
public class Team9Application {

	public static void main(String[] args) {

		ConfigurableApplicationContext appContext = SpringApplication.run(Team9Application.class, args);
		KorisnikService service = appContext.getBean(KorisnikService.class);

		DatabaseConnector connector = appContext.getBean(DatabaseConnector.class);
		try {
			connector.getOrCreateCollection("/db/sample/zahtevi", 0);
			connector.getOrCreateCollection("/db/sample/korisnici", 0);
			connector.getOrCreateCollection("/db/sample/obavestenja", 0);
			connector.getOrCreateCollection("/db/sample/izvestaji", 0);
		} catch (ClassNotFoundException | InstantiationException | IllegalAccessException | XMLDBException e1) {
			e1.printStackTrace();
		}

		Korisnik k = new Korisnik("Marko", "Marković", "noreply.kts.l9@gmail.com", "sifra123", "sluzbenik", "");
		try {
			if (service.findByEmail("noreply.kts.l9@gmail.com") == null)
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
