package projectXML.team10.poverenik.models.korisnik;

import org.springframework.security.core.GrantedAuthority;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Authority implements GrantedAuthority {

	private static final long serialVersionUID = 1L;

	String name;
	
	@Override
	public String getAuthority() {
		return this.name;
	}

	
}
