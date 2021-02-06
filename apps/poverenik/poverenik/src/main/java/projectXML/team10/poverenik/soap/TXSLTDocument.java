package projectXML.team10.poverenik.soap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "xsltTemplate", propOrder = { "xslt" })
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TXSLTDocument {

	@XmlElement(required = true)
	String xslt;
}
