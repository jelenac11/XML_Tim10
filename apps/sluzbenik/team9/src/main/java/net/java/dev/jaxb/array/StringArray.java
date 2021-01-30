
package net.java.dev.jaxb.array;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "stringArray", propOrder = {
    "item"
})
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StringArray {

    @XmlElement(nillable = true)
    protected List<String> item;

    public List<String> getItem() {
        if (item == null) {
            item = new ArrayList<String>();
        }
        return this.item;
    }
	
}
