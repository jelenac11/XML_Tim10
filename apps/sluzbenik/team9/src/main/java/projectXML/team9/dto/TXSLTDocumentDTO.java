package projectXML.team9.dto;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "xsltRoot", propOrder = { "xslt" })
@Getter
@Setter
@NoArgsConstructor
public class TXSLTDocumentDTO {

	@XmlElement(required = true)
	String xslt;
}
