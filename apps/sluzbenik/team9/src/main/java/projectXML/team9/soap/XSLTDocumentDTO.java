package projectXML.team9.soap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = { "xslt" })
@Getter
@Setter
@NoArgsConstructor
@XmlRootElement(name = "xsltRoot")
public class XSLTDocumentDTO {

	@XmlElement(required = true)
	String xslt;
}
