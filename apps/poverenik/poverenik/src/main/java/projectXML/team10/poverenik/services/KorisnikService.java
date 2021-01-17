package projectXML.team10.poverenik.services;

import java.util.UUID;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import projectXML.team10.poverenik.models.korisnik.Korisnik;
import projectXML.team10.poverenik.repositories.KorisnikRepository;


@Service
public class KorisnikService implements UserDetailsService{

//	private static String schemaPath = "src/main/resources/static/schemas/korisnik.xsd";
	//private static String contextPath = "projectXML.team10.poverenik.models.korisnik";
	
	@Autowired
	public KorisnikRepository korisnikRepository;
	
	@Autowired
    private PasswordEncoder passwordEncoder;

	public Korisnik findByEmail(String email) throws Exception {
		return korisnikRepository.findByEmail(email);
	}

	public Korisnik create(@Valid Korisnik userRequest) throws Exception {
		Korisnik emailUser = korisnikRepository.findByEmail(userRequest.getEmail());
		if (emailUser != null) {
			throw new IllegalArgumentException("User with this email already exists.");
		}
		userRequest.setId(UUID.randomUUID().toString());
		userRequest.setLozinka(passwordEncoder.encode(userRequest.getLozinka()));
		korisnikRepository.save(userRequest);
		return userRequest;
	}

	@Override
	public UserDetails loadUserByUsername(String email) {
		try {
			return findByEmail(email);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
