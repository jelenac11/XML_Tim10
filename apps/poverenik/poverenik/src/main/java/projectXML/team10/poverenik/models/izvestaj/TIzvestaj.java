//
// This file was generated by the Eclipse Implementation of JAXB, v2.3.3 
// See https://eclipse-ee4j.github.io/jaxb-ri 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2021.02.03 at 11:08:50 PM CET 
//


package projectXML.team10.poverenik.models.izvestaj;

import java.math.BigInteger;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlID;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.XmlValue;
import javax.xml.bind.annotation.adapters.CollapsedStringAdapter;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import javax.xml.datatype.XMLGregorianCalendar;


/**
 * &lt;p&gt;Java class for anonymous complex type.
 * 
 * &lt;p&gt;The following schema fragment specifies the expected content contained within this class.
 * 
 * &lt;pre&gt;
 * &amp;lt;complexType&amp;gt;
 *   &amp;lt;complexContent&amp;gt;
 *     &amp;lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&amp;gt;
 *       &amp;lt;sequence&amp;gt;
 *         &amp;lt;element name="podaci_o_zahtevima"&amp;gt;
 *           &amp;lt;complexType&amp;gt;
 *             &amp;lt;complexContent&amp;gt;
 *               &amp;lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&amp;gt;
 *                 &amp;lt;sequence&amp;gt;
 *                   &amp;lt;element name="broj_usvojenih_zahteva" type="{http://www.w3.org/2001/XMLSchema}integer"/&amp;gt;
 *                   &amp;lt;element name="broj_odbijenih_zahteva" type="{http://www.w3.org/2001/XMLSchema}integer"/&amp;gt;
 *                   &amp;lt;element name="broj_zahteva_na_koje_nije_odgovoreno" type="{http://www.w3.org/2001/XMLSchema}integer"/&amp;gt;
 *                 &amp;lt;/sequence&amp;gt;
 *               &amp;lt;/restriction&amp;gt;
 *             &amp;lt;/complexContent&amp;gt;
 *           &amp;lt;/complexType&amp;gt;
 *         &amp;lt;/element&amp;gt;
 *         &amp;lt;element name="podaci_o_zalbama"&amp;gt;
 *           &amp;lt;complexType&amp;gt;
 *             &amp;lt;complexContent&amp;gt;
 *               &amp;lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&amp;gt;
 *                 &amp;lt;sequence&amp;gt;
 *                   &amp;lt;element name="zalbe_na_cutanje"&amp;gt;
 *                     &amp;lt;complexType&amp;gt;
 *                       &amp;lt;complexContent&amp;gt;
 *                         &amp;lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&amp;gt;
 *                           &amp;lt;sequence&amp;gt;
 *                             &amp;lt;element name="nije_postupio" type="{http://www.w3.org/2001/XMLSchema}integer"/&amp;gt;
 *                             &amp;lt;element name="nije_postupio_u_celosti" type="{http://www.w3.org/2001/XMLSchema}integer"/&amp;gt;
 *                             &amp;lt;element name="nije_postupio_u_zakonskom_roku" type="{http://www.w3.org/2001/XMLSchema}integer"/&amp;gt;
 *                           &amp;lt;/sequence&amp;gt;
 *                         &amp;lt;/restriction&amp;gt;
 *                       &amp;lt;/complexContent&amp;gt;
 *                     &amp;lt;/complexType&amp;gt;
 *                   &amp;lt;/element&amp;gt;
 *                   &amp;lt;element name="broj_zalbi_na_odluku" type="{http://www.w3.org/2001/XMLSchema}integer"/&amp;gt;
 *                 &amp;lt;/sequence&amp;gt;
 *               &amp;lt;/restriction&amp;gt;
 *             &amp;lt;/complexContent&amp;gt;
 *           &amp;lt;/complexType&amp;gt;
 *         &amp;lt;/element&amp;gt;
 *         &amp;lt;element name="datum_podnosenja"&amp;gt;
 *           &amp;lt;complexType&amp;gt;
 *             &amp;lt;simpleContent&amp;gt;
 *               &amp;lt;extension base="&amp;lt;http://www.w3.org/2001/XMLSchema&amp;gt;date"&amp;gt;
 *                 &amp;lt;attribute name="property" type="{http://www.w3.org/2001/XMLSchema}string" fixed="pred:datum_kada_je_podnet" /&amp;gt;
 *                 &amp;lt;attribute name="datatype" type="{http://www.w3.org/2001/XMLSchema}string" fixed="xs:date" /&amp;gt;
 *               &amp;lt;/extension&amp;gt;
 *             &amp;lt;/simpleContent&amp;gt;
 *           &amp;lt;/complexType&amp;gt;
 *         &amp;lt;/element&amp;gt;
 *         &amp;lt;element name="kreator"&amp;gt;
 *           &amp;lt;complexType&amp;gt;
 *             &amp;lt;simpleContent&amp;gt;
 *               &amp;lt;extension base="&amp;lt;http://www.w3.org/2001/XMLSchema&amp;gt;string"&amp;gt;
 *                 &amp;lt;attribute name="property" type="{http://www.w3.org/2001/XMLSchema}string" fixed="pred:je_kreirao_izvestaj" /&amp;gt;
 *                 &amp;lt;attribute name="content" type="{http://www.w3.org/2001/XMLSchema}string" /&amp;gt;
 *               &amp;lt;/extension&amp;gt;
 *             &amp;lt;/simpleContent&amp;gt;
 *           &amp;lt;/complexType&amp;gt;
 *         &amp;lt;/element&amp;gt;
 *       &amp;lt;/sequence&amp;gt;
 *       &amp;lt;attribute name="id" type="{http://www.w3.org/2001/XMLSchema}ID" /&amp;gt;
 *       &amp;lt;attribute name="vocab" type="{http://www.w3.org/2001/XMLSchema}string" fixed="http://www.projekat.org/predicate" /&amp;gt;
 *       &amp;lt;attribute name="about" type="{http://www.w3.org/2001/XMLSchema}anyURI" /&amp;gt;
 *     &amp;lt;/restriction&amp;gt;
 *   &amp;lt;/complexContent&amp;gt;
 * &amp;lt;/complexType&amp;gt;
 * &lt;/pre&gt;
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Izvestaj", propOrder = {
    "podaciOZahtevima",
    "podaciOZalbama",
    "datumPodnosenja",
    "kreator"
})
public class TIzvestaj {

    @XmlElement(name = "podaci_o_zahtevima", required = false)
    protected TIzvestaj.PodaciOZahtevima podaciOZahtevima;
    @XmlElement(name = "podaci_o_zalbama", required = false)
    protected TIzvestaj.PodaciOZalbama podaciOZalbama;
    @XmlElement(name = "datum_podnosenja", required = false)
    protected TIzvestaj.DatumPodnosenja datumPodnosenja;
    @XmlElement(required = false)
    protected TIzvestaj.Kreator kreator;
    @XmlAttribute(name = "id")
    @XmlJavaTypeAdapter(CollapsedStringAdapter.class)
    @XmlID
    @XmlSchemaType(name = "ID")
    protected String id;
    @XmlAttribute(name = "vocab")
    protected String vocab;
    @XmlAttribute(name = "about")
    @XmlSchemaType(name = "anyURI")
    protected String about;
    
    public TIzvestaj() {
    	
    }
    
    public TIzvestaj(Izvestaj i) {
    	this.podaciOZahtevima = new TIzvestaj.PodaciOZahtevima();
    	this.podaciOZahtevima.setBrojOdbijenihZahteva(i.getPodaciOZahtevima().getBrojOdbijenihZahteva());
    	this.podaciOZahtevima.setBrojUsvojenihZahteva(i.getPodaciOZahtevima().getBrojUsvojenihZahteva());
    	this.podaciOZahtevima.setBrojZahtevaNaKojeNijeOdgovoreno(i.getPodaciOZahtevima().getBrojZahtevaNaKojeNijeOdgovoreno());
    	
    	this.podaciOZalbama = new TIzvestaj.PodaciOZalbama();
    	this.podaciOZalbama.setBrojZalbiNaOdluku(i.getPodaciOZalbama().getBrojZalbiNaOdluku());
    	this.podaciOZalbama.setZalbeNaCutanje(new TIzvestaj.PodaciOZalbama.ZalbeNaCutanje());
    	this.podaciOZalbama.getZalbeNaCutanje().setNijePostupio(i.getPodaciOZalbama().getZalbeNaCutanje().getNijePostupio());
    	this.podaciOZalbama.getZalbeNaCutanje().setNijePostupioUCelosti(i.getPodaciOZalbama().getZalbeNaCutanje().getNijePostupioUCelosti());
    	this.podaciOZalbama.getZalbeNaCutanje().setNijePostupioUZakonskomRoku(i.getPodaciOZalbama().getZalbeNaCutanje().getNijePostupioUZakonskomRoku());
    	
    	this.datumPodnosenja = new TIzvestaj.DatumPodnosenja();
    	this.datumPodnosenja.setDatatype();
    	this.datumPodnosenja.setProperty();
    	this.datumPodnosenja.setValue(i.getDatumPodnosenja().getValue());
    	
    	this.kreator = new TIzvestaj.Kreator();
    	this.kreator.setContent(i.getKreator().getContent());
    	this.kreator.setProperty();
    	this.kreator.setValue(i.getKreator().getValue());
    	
    	this.id = i.getId();
    	this.about = i.getAbout();
    	this.vocab = i.getVocab();
    }    

    /**
     * Gets the value of the podaciOZahtevima property.
     * 
     * @return
     *     possible object is
     *     {@link TIzvestaj.PodaciOZahtevima }
     *     
     */
    public TIzvestaj.PodaciOZahtevima getPodaciOZahtevima() {
        return podaciOZahtevima;
    }

    /**
     * Sets the value of the podaciOZahtevima property.
     * 
     * @param value
     *     allowed object is
     *     {@link TIzvestaj.PodaciOZahtevima }
     *     
     */
    public void setPodaciOZahtevima(TIzvestaj.PodaciOZahtevima value) {
        this.podaciOZahtevima = value;
    }

    /**
     * Gets the value of the podaciOZalbama property.
     * 
     * @return
     *     possible object is
     *     {@link TIzvestaj.PodaciOZalbama }
     *     
     */
    public TIzvestaj.PodaciOZalbama getPodaciOZalbama() {
        return podaciOZalbama;
    }

    /**
     * Sets the value of the podaciOZalbama property.
     * 
     * @param value
     *     allowed object is
     *     {@link TIzvestaj.PodaciOZalbama }
     *     
     */
    public void setPodaciOZalbama(TIzvestaj.PodaciOZalbama value) {
        this.podaciOZalbama = value;
    }

    /**
     * Gets the value of the datumPodnosenja property.
     * 
     * @return
     *     possible object is
     *     {@link TIzvestaj.DatumPodnosenja }
     *     
     */
    public TIzvestaj.DatumPodnosenja getDatumPodnosenja() {
        return datumPodnosenja;
    }

    /**
     * Sets the value of the datumPodnosenja property.
     * 
     * @param value
     *     allowed object is
     *     {@link TIzvestaj.DatumPodnosenja }
     *     
     */
    public void setDatumPodnosenja(TIzvestaj.DatumPodnosenja value) {
        this.datumPodnosenja = value;
    }

    /**
     * Gets the value of the kreator property.
     * 
     * @return
     *     possible object is
     *     {@link TIzvestaj.Kreator }
     *     
     */
    public TIzvestaj.Kreator getKreator() {
        return kreator;
    }

    /**
     * Sets the value of the kreator property.
     * 
     * @param value
     *     allowed object is
     *     {@link TIzvestaj.Kreator }
     *     
     */
    public void setKreator(TIzvestaj.Kreator value) {
        this.kreator = value;
    }

    /**
     * Gets the value of the id property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getId() {
        return id;
    }

    /**
     * Sets the value of the id property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setId(String value) {
        this.id = value;
    }

    /**
     * Gets the value of the vocab property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVocab() {
        if (vocab == null) {
            return "http://www.projekat.org/predicate";
        } else {
            return vocab;
        }
    }

    /**
     * Sets the value of the vocab property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVocab() {
        this.vocab = "http://www.projekat.org/predicate";
    }

    /**
     * Gets the value of the about property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAbout() {
        return about;
    }

    /**
     * Sets the value of the about property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAbout(String value) {
        this.about = value;
    }


    /**
     * &lt;p&gt;Java class for anonymous complex type.
     * 
     * &lt;p&gt;The following schema fragment specifies the expected content contained within this class.
     * 
     * &lt;pre&gt;
     * &amp;lt;complexType&amp;gt;
     *   &amp;lt;simpleContent&amp;gt;
     *     &amp;lt;extension base="&amp;lt;http://www.w3.org/2001/XMLSchema&amp;gt;date"&amp;gt;
     *       &amp;lt;attribute name="property" type="{http://www.w3.org/2001/XMLSchema}string" fixed="pred:datum_kada_je_podnet" /&amp;gt;
     *       &amp;lt;attribute name="datatype" type="{http://www.w3.org/2001/XMLSchema}string" fixed="xs:date" /&amp;gt;
     *     &amp;lt;/extension&amp;gt;
     *   &amp;lt;/simpleContent&amp;gt;
     * &amp;lt;/complexType&amp;gt;
     * &lt;/pre&gt;
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "value"
    })
    public static class DatumPodnosenja {

        @XmlValue
        @XmlSchemaType(name = "date")
        protected XMLGregorianCalendar value;
        @XmlAttribute(name = "property")
        protected String property;
        @XmlAttribute(name = "datatype")
        protected String datatype;

        /**
         * Gets the value of the value property.
         * 
         * @return
         *     possible object is
         *     {@link XMLGregorianCalendar }
         *     
         */
        public XMLGregorianCalendar getValue() {
            return value;
        }

        /**
         * Sets the value of the value property.
         * 
         * @param value
         *     allowed object is
         *     {@link XMLGregorianCalendar }
         *     
         */
        public void setValue(XMLGregorianCalendar value) {
            this.value = value;
        }

        /**
         * Gets the value of the property property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getProperty() {
            if (property == null) {
                return "pred:datum_kada_je_podnet";
            } else {
                return property;
            }
        }

        /**
         * Sets the value of the property property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setProperty() {
            this.property = "pred:datum_kada_je_podnet";
        }

        /**
         * Gets the value of the datatype property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getDatatype() {
            if (datatype == null) {
                return "xs:date";
            } else {
                return datatype;
            }
        }

        /**
         * Sets the value of the datatype property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setDatatype() {
            this.datatype = "xs:date";
        }

    }


    /**
     * &lt;p&gt;Java class for anonymous complex type.
     * 
     * &lt;p&gt;The following schema fragment specifies the expected content contained within this class.
     * 
     * &lt;pre&gt;
     * &amp;lt;complexType&amp;gt;
     *   &amp;lt;simpleContent&amp;gt;
     *     &amp;lt;extension base="&amp;lt;http://www.w3.org/2001/XMLSchema&amp;gt;string"&amp;gt;
     *       &amp;lt;attribute name="property" type="{http://www.w3.org/2001/XMLSchema}string" fixed="pred:je_kreirao_izvestaj" /&amp;gt;
     *       &amp;lt;attribute name="content" type="{http://www.w3.org/2001/XMLSchema}string" /&amp;gt;
     *     &amp;lt;/extension&amp;gt;
     *   &amp;lt;/simpleContent&amp;gt;
     * &amp;lt;/complexType&amp;gt;
     * &lt;/pre&gt;
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "value"
    })
    public static class Kreator {

        @XmlValue
        protected String value;
        @XmlAttribute(name = "property")
        protected String property;
        @XmlAttribute(name = "content")
        protected String content;

        /**
         * Gets the value of the value property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getValue() {
            return value;
        }

        /**
         * Sets the value of the value property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setValue(String value) {
            this.value = value;
        }

        /**
         * Gets the value of the property property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getProperty() {
            if (property == null) {
                return "pred:je_kreirao_izvestaj";
            } else {
                return property;
            }
        }

        /**
         * Sets the value of the property property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setProperty() {
            this.property = "pred:je_kreirao_izvestaj";
        }

        /**
         * Gets the value of the content property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getContent() {
            return content;
        }

        /**
         * Sets the value of the content property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setContent(String value) {
            this.content = value;
        }

    }


    /**
     * &lt;p&gt;Java class for anonymous complex type.
     * 
     * &lt;p&gt;The following schema fragment specifies the expected content contained within this class.
     * 
     * &lt;pre&gt;
     * &amp;lt;complexType&amp;gt;
     *   &amp;lt;complexContent&amp;gt;
     *     &amp;lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&amp;gt;
     *       &amp;lt;sequence&amp;gt;
     *         &amp;lt;element name="broj_usvojenih_zahteva" type="{http://www.w3.org/2001/XMLSchema}integer"/&amp;gt;
     *         &amp;lt;element name="broj_odbijenih_zahteva" type="{http://www.w3.org/2001/XMLSchema}integer"/&amp;gt;
     *         &amp;lt;element name="broj_zahteva_na_koje_nije_odgovoreno" type="{http://www.w3.org/2001/XMLSchema}integer"/&amp;gt;
     *       &amp;lt;/sequence&amp;gt;
     *     &amp;lt;/restriction&amp;gt;
     *   &amp;lt;/complexContent&amp;gt;
     * &amp;lt;/complexType&amp;gt;
     * &lt;/pre&gt;
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "brojUsvojenihZahteva",
        "brojOdbijenihZahteva",
        "brojZahtevaNaKojeNijeOdgovoreno"
    })
    public static class PodaciOZahtevima {

        @XmlElement(name = "broj_usvojenih_zahteva", required = false)
        protected BigInteger brojUsvojenihZahteva;
        @XmlElement(name = "broj_odbijenih_zahteva", required = false)
        protected BigInteger brojOdbijenihZahteva;
        @XmlElement(name = "broj_zahteva_na_koje_nije_odgovoreno", required = false)
        protected BigInteger brojZahtevaNaKojeNijeOdgovoreno;

        /**
         * Gets the value of the brojUsvojenihZahteva property.
         * 
         * @return
         *     possible object is
         *     {@link BigInteger }
         *     
         */
        public BigInteger getBrojUsvojenihZahteva() {
            return brojUsvojenihZahteva;
        }

        /**
         * Sets the value of the brojUsvojenihZahteva property.
         * 
         * @param value
         *     allowed object is
         *     {@link BigInteger }
         *     
         */
        public void setBrojUsvojenihZahteva(BigInteger value) {
            this.brojUsvojenihZahteva = value;
        }

        /**
         * Gets the value of the brojOdbijenihZahteva property.
         * 
         * @return
         *     possible object is
         *     {@link BigInteger }
         *     
         */
        public BigInteger getBrojOdbijenihZahteva() {
            return brojOdbijenihZahteva;
        }

        /**
         * Sets the value of the brojOdbijenihZahteva property.
         * 
         * @param value
         *     allowed object is
         *     {@link BigInteger }
         *     
         */
        public void setBrojOdbijenihZahteva(BigInteger value) {
            this.brojOdbijenihZahteva = value;
        }

        /**
         * Gets the value of the brojZahtevaNaKojeNijeOdgovoreno property.
         * 
         * @return
         *     possible object is
         *     {@link BigInteger }
         *     
         */
        public BigInteger getBrojZahtevaNaKojeNijeOdgovoreno() {
            return brojZahtevaNaKojeNijeOdgovoreno;
        }

        /**
         * Sets the value of the brojZahtevaNaKojeNijeOdgovoreno property.
         * 
         * @param value
         *     allowed object is
         *     {@link BigInteger }
         *     
         */
        public void setBrojZahtevaNaKojeNijeOdgovoreno(BigInteger value) {
            this.brojZahtevaNaKojeNijeOdgovoreno = value;
        }

    }


    /**
     * &lt;p&gt;Java class for anonymous complex type.
     * 
     * &lt;p&gt;The following schema fragment specifies the expected content contained within this class.
     * 
     * &lt;pre&gt;
     * &amp;lt;complexType&amp;gt;
     *   &amp;lt;complexContent&amp;gt;
     *     &amp;lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&amp;gt;
     *       &amp;lt;sequence&amp;gt;
     *         &amp;lt;element name="zalbe_na_cutanje"&amp;gt;
     *           &amp;lt;complexType&amp;gt;
     *             &amp;lt;complexContent&amp;gt;
     *               &amp;lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&amp;gt;
     *                 &amp;lt;sequence&amp;gt;
     *                   &amp;lt;element name="nije_postupio" type="{http://www.w3.org/2001/XMLSchema}integer"/&amp;gt;
     *                   &amp;lt;element name="nije_postupio_u_celosti" type="{http://www.w3.org/2001/XMLSchema}integer"/&amp;gt;
     *                   &amp;lt;element name="nije_postupio_u_zakonskom_roku" type="{http://www.w3.org/2001/XMLSchema}integer"/&amp;gt;
     *                 &amp;lt;/sequence&amp;gt;
     *               &amp;lt;/restriction&amp;gt;
     *             &amp;lt;/complexContent&amp;gt;
     *           &amp;lt;/complexType&amp;gt;
     *         &amp;lt;/element&amp;gt;
     *         &amp;lt;element name="broj_zalbi_na_odluku" type="{http://www.w3.org/2001/XMLSchema}integer"/&amp;gt;
     *       &amp;lt;/sequence&amp;gt;
     *     &amp;lt;/restriction&amp;gt;
     *   &amp;lt;/complexContent&amp;gt;
     * &amp;lt;/complexType&amp;gt;
     * &lt;/pre&gt;
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "zalbeNaCutanje",
        "brojZalbiNaOdluku"
    })
    public static class PodaciOZalbama {

        @XmlElement(name = "zalbe_na_cutanje", required = false)
        protected TIzvestaj.PodaciOZalbama.ZalbeNaCutanje zalbeNaCutanje;
        @XmlElement(name = "broj_zalbi_na_odluku", required = false)
        protected BigInteger brojZalbiNaOdluku;

        /**
         * Gets the value of the zalbeNaCutanje property.
         * 
         * @return
         *     possible object is
         *     {@link TIzvestaj.PodaciOZalbama.ZalbeNaCutanje }
         *     
         */
        public TIzvestaj.PodaciOZalbama.ZalbeNaCutanje getZalbeNaCutanje() {
            return zalbeNaCutanje;
        }

        /**
         * Sets the value of the zalbeNaCutanje property.
         * 
         * @param value
         *     allowed object is
         *     {@link TIzvestaj.PodaciOZalbama.ZalbeNaCutanje }
         *     
         */
        public void setZalbeNaCutanje(TIzvestaj.PodaciOZalbama.ZalbeNaCutanje value) {
            this.zalbeNaCutanje = value;
        }

        /**
         * Gets the value of the brojZalbiNaOdluku property.
         * 
         * @return
         *     possible object is
         *     {@link BigInteger }
         *     
         */
        public BigInteger getBrojZalbiNaOdluku() {
            return brojZalbiNaOdluku;
        }

        /**
         * Sets the value of the brojZalbiNaOdluku property.
         * 
         * @param value
         *     allowed object is
         *     {@link BigInteger }
         *     
         */
        public void setBrojZalbiNaOdluku(BigInteger value) {
            this.brojZalbiNaOdluku = value;
        }


        /**
         * &lt;p&gt;Java class for anonymous complex type.
         * 
         * &lt;p&gt;The following schema fragment specifies the expected content contained within this class.
         * 
         * &lt;pre&gt;
         * &amp;lt;complexType&amp;gt;
         *   &amp;lt;complexContent&amp;gt;
         *     &amp;lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&amp;gt;
         *       &amp;lt;sequence&amp;gt;
         *         &amp;lt;element name="nije_postupio" type="{http://www.w3.org/2001/XMLSchema}integer"/&amp;gt;
         *         &amp;lt;element name="nije_postupio_u_celosti" type="{http://www.w3.org/2001/XMLSchema}integer"/&amp;gt;
         *         &amp;lt;element name="nije_postupio_u_zakonskom_roku" type="{http://www.w3.org/2001/XMLSchema}integer"/&amp;gt;
         *       &amp;lt;/sequence&amp;gt;
         *     &amp;lt;/restriction&amp;gt;
         *   &amp;lt;/complexContent&amp;gt;
         * &amp;lt;/complexType&amp;gt;
         * &lt;/pre&gt;
         * 
         * 
         */
        @XmlAccessorType(XmlAccessType.FIELD)
        @XmlType(name = "", propOrder = {
            "nijePostupio",
            "nijePostupioUCelosti",
            "nijePostupioUZakonskomRoku"
        })
        public static class ZalbeNaCutanje {

            @XmlElement(name = "nije_postupio", required = false)
            protected BigInteger nijePostupio;
            @XmlElement(name = "nije_postupio_u_celosti", required = false)
            protected BigInteger nijePostupioUCelosti;
            @XmlElement(name = "nije_postupio_u_zakonskom_roku", required = false)
            protected BigInteger nijePostupioUZakonskomRoku;

            /**
             * Gets the value of the nijePostupio property.
             * 
             * @return
             *     possible object is
             *     {@link BigInteger }
             *     
             */
            public BigInteger getNijePostupio() {
                return nijePostupio;
            }

            /**
             * Sets the value of the nijePostupio property.
             * 
             * @param value
             *     allowed object is
             *     {@link BigInteger }
             *     
             */
            public void setNijePostupio(BigInteger value) {
                this.nijePostupio = value;
            }

            /**
             * Gets the value of the nijePostupioUCelosti property.
             * 
             * @return
             *     possible object is
             *     {@link BigInteger }
             *     
             */
            public BigInteger getNijePostupioUCelosti() {
                return nijePostupioUCelosti;
            }

            /**
             * Sets the value of the nijePostupioUCelosti property.
             * 
             * @param value
             *     allowed object is
             *     {@link BigInteger }
             *     
             */
            public void setNijePostupioUCelosti(BigInteger value) {
                this.nijePostupioUCelosti = value;
            }

            /**
             * Gets the value of the nijePostupioUZakonskomRoku property.
             * 
             * @return
             *     possible object is
             *     {@link BigInteger }
             *     
             */
            public BigInteger getNijePostupioUZakonskomRoku() {
                return nijePostupioUZakonskomRoku;
            }

            /**
             * Sets the value of the nijePostupioUZakonskomRoku property.
             * 
             * @param value
             *     allowed object is
             *     {@link BigInteger }
             *     
             */
            public void setNijePostupioUZakonskomRoku(BigInteger value) {
                this.nijePostupioUZakonskomRoku = value;
            }

        }

    }

}
