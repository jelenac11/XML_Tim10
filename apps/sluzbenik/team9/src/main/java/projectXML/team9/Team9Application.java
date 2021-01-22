package projectXML.team9;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import projectXML.team9.models.korisnik.Korisnik;
import projectXML.team9.services.KorisnikService;

@SpringBootApplication
public class Team9Application {

	public static void main(String[] args) {
		ConfigurableApplicationContext appContext = SpringApplication.run(Team9Application.class, args);
	    KorisnikService service = appContext.getBean(KorisnikService.class);
	    Korisnik k = new Korisnik("Marko", "Marković", "sluzbenik@gmail.com", "sifra123", "sluzbenik", "");
	    try {
	    	if (service.findByEmail("sluzbenik@gmail.com") == null)
	    		service.create(k);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}
