package projectXML.team9.dto;

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
    "zahtev"
})
@Getter
@Setter
@NoArgsConstructor
@XmlRootElement(name = "zahtevi")
public class ZahteviDTO {

	@XmlElement(required = true)
	ArrayList<String> zahtev = new ArrayList<String>();
}
