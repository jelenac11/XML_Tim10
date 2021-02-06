package projectXML.team10.poverenik.dto;

import java.util.ArrayList;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "item"
})
@Getter
@Setter
@NoArgsConstructor
@XmlRootElement(name = "item")
public class DocumentsIDDTO {

	@XmlElement(required = true)
	ArrayList<String> item = new ArrayList<String>();
}
