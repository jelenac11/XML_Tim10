package projectXML.team10.poverenik.dto;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = { "keyWord", "metadata", "operator" })
@Getter
@Setter
@NoArgsConstructor
@XmlRootElement(name = "form")
public class SearchDTO {

	@XmlElement(name = "key_word", required = true)
	private String keyWord;
	@XmlElement(required = true)
	private String metadata;
	@XmlElement(required = true)
	private String operator;
}
