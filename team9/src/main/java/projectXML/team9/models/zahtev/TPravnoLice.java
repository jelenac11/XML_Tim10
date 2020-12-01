//
// This file was generated by the Eclipse Implementation of JAXB, v2.3.3 
// See https://eclipse-ee4j.github.io/jaxb-ri 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2020.12.01 at 02:49:33 PM CET 
//

package projectXML.team9.models.zahtev;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

/**
 * &lt;p&gt;Java class for TPravno_lice complex type.
 * 
 * &lt;p&gt;The following schema fragment specifies the expected content
 * contained within this class.
 * 
 * &lt;pre&gt; &amp;lt;complexType name="TPravno_lice"&amp;gt;
 * &amp;lt;complexContent&amp;gt; &amp;lt;extension
 * base="{http://www.projekat.org/zahtev}TLice"&amp;gt; &amp;lt;sequence&amp;gt;
 * &amp;lt;element name="naziv"&amp;gt; &amp;lt;simpleType&amp;gt;
 * &amp;lt;restriction base="{http://www.w3.org/2001/XMLSchema}string"&amp;gt;
 * &amp;lt;minLength value="1"/&amp;gt; &amp;lt;/restriction&amp;gt;
 * &amp;lt;/simpleType&amp;gt; &amp;lt;/element&amp;gt;
 * &amp;lt;/sequence&amp;gt; &amp;lt;/extension&amp;gt;
 * &amp;lt;/complexContent&amp;gt; &amp;lt;/complexType&amp;gt; &lt;/pre&gt;
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TPravno_lice", propOrder = { "naziv" })
public class TPravnoLice extends TLice {

	public TPravnoLice(TAdresa adresa, String naziv) {
		super(adresa);
		this.naziv = naziv;
	}

	public TPravnoLice() {
		super();
	}

	@Override
	public String toString() {
		return String.format("Naziv: %s.\n", naziv) + super.toString();
	}

	@XmlElement(required = true)
	protected String naziv;

	/**
	 * Gets the value of the naziv property.
	 * 
	 * @return possible object is {@link String }
	 * 
	 */
	public String getNaziv() {
		return naziv;
	}

	/**
	 * Sets the value of the naziv property.
	 * 
	 * @param value allowed object is {@link String }
	 * 
	 */
	public void setNaziv(String value) {
		this.naziv = value;
	}

}
