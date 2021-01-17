package projectXML.team10.poverenik.models.korisnik;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "email",
    "lozinka"
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@XmlRootElement(name = "korisnik_prijava")
public class KorisnikPrijava {
	
	@XmlElement(required = true)
	@NotEmpty(message = "Email cannot be null or empty.")
    @Email(message = "Email format is not valid.")
    protected String email;
	
    @XmlElement(required = true)
    @NotEmpty(message = "Lozinka cannot be null or empty.")
    protected String lozinka;

}
