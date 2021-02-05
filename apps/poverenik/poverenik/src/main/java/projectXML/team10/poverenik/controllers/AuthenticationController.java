package projectXML.team10.poverenik.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import projectXML.team10.poverenik.models.korisnik.Korisnik;
import projectXML.team10.poverenik.models.korisnik.KorisnikPrijava;
import projectXML.team10.poverenik.models.korisnik.KorisnikToken;
import projectXML.team10.poverenik.security.TokenUtils;
import projectXML.team10.poverenik.services.KorisnikService;

@RestController
@CrossOrigin(origins = "http://localhost:4201", maxAge = 3600, allowedHeaders = "*")
@RequestMapping(value = "/auth", produces = MediaType.APPLICATION_XML_VALUE)
public class AuthenticationController {
	
	@Autowired
	private TokenUtils tokenUtils;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private KorisnikService userDetailsService;
	
	@PostMapping(value = "/prijava", consumes = MediaType.APPLICATION_XML_VALUE)
	public ResponseEntity<?> createAuthenticationToken(@Valid @RequestBody KorisnikPrijava authenticationRequest) {
		Authentication authentication = null;
		try {
			authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					authenticationRequest.getEmail(), authenticationRequest.getLozinka()));
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>("Pogrešan e-mail ili lozinka.", HttpStatus.UNAUTHORIZED);
		}

		// Kreiraj token za tog korisnika
		Korisnik user = (Korisnik) authentication.getPrincipal();

		// Ubaci korisnika u trenutni security kontekst
		SecurityContextHolder.getContext().setAuthentication(authentication);
 
		String jwt = tokenUtils.generateToken(user.getEmail(), user.getUloga()); // prijavljujemo se na sistem sa
																						// email adresom
		int expiresIn = tokenUtils.getExpiredIn();

		// Vrati token kao odgovor na uspesnu autentifikaciju
		return ResponseEntity.ok(new KorisnikToken(jwt, (long) expiresIn));
	}

	@PostMapping(value = "/registracija", consumes = MediaType.APPLICATION_XML_VALUE)
	public ResponseEntity<?> addUser(@Valid @RequestBody Korisnik userRequest) throws Exception {
		Korisnik existEmail = this.userDetailsService.findByEmail(userRequest.getEmail());
		if (existEmail != null) {
			return new ResponseEntity<>("Već postoji korisnik sa unetim e-mailom.", HttpStatus.CONFLICT);
		}
		Korisnik newUser = null;
		try {
			newUser = userDetailsService.create(userRequest);
		} catch (Exception e) {
			return new ResponseEntity<>(e.toString(), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(newUser, HttpStatus.CREATED);
	}
	
	@GetMapping(value = "/trenutno-ulogovan")
	public ResponseEntity<Korisnik> currentUser() {
		Korisnik current = null;
		try {
			current = (Korisnik) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		} catch (Exception e) {
			
		}
		return new ResponseEntity<>(current, HttpStatus.OK);
	}
}
