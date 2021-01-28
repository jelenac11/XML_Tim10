package projectXML.emailService.dto;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = { "recipient", "mime" })
@Getter
@Setter
@NoArgsConstructor
@XmlRootElement(name = "email")
public class EmailDTO {

	@XmlElement(required = true)
	private String recipient;
	@XmlElement(required = true)
	private byte[] mime;
}
