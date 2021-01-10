package projectXML.team9.parser;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.OutputStream;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.TransformerFactoryConfigurationError;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

import projectXML.team9.models.resenje.OdlukaPoverioca.OpisŽalbe.Organ;

/**
 * 
 * Primer demonstrira metode API-ja za potrebe programskog kreiranja DOM stabla. 
 * Pored programskog kreiranja DOM stabla, primer demonstrira i serijalizaciju
 * DOM stabla na proizvoljan stream (npr. FileOutputStream, System.out, itd.).
 *
 */
public class DOMWriter {

	private static String TARGET_NAMESPACE = "http://www.ftn.uns.ac.rs/zavrsni_rad";

	private static String XSI_NAMESPACE = "http://www.w3.org/2001/XMLSchema-instance";
	
	private static DocumentBuilderFactory factory;
	
	private static TransformerFactory transformerFactory;
	
	private Document document;
	
	/*
	 * Factory initialization static-block
	 */
	static {
		factory = DocumentBuilderFactory.newInstance();
		
		transformerFactory = TransformerFactory.newInstance();
	}
	
	/**
	 * Generates document object model for a given XML file.
	 */
	public void updateDocument(String filePath) {

		try {
			
			DocumentBuilder builder = factory.newDocumentBuilder();
			// Kreiranje novog dokumenta 
			document = builder.parse(new File(filePath)); 
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * Generates sample document object model 
	 * programmatically using DOM API methods. 
	 */
	public void generateDOM() {
		
		// Kreiranje i postavljanje korenskog elementa
		Element rad = document.createElementNS(TARGET_NAMESPACE, "rad");
		document.appendChild(rad);
		
		rad.setAttributeNS(XSI_NAMESPACE, "xsi:schemaLocation", "http://www.ftn.uns.ac.rs/zavrsni_rad ../xsd/zavrsni_rad.xsd");
		rad.setAttribute("vrsta_rada", "Diplomski rad");		
		
		Element naslovnaStrana = document.createElementNS(TARGET_NAMESPACE, "naslovna_strana");
		rad.appendChild(naslovnaStrana);
		
		Element institucija = document.createElementNS(TARGET_NAMESPACE, "institucija");
		naslovnaStrana.appendChild(institucija);
		
		Element univerzitet = document.createElementNS(TARGET_NAMESPACE, "univerzitet");
		univerzitet.appendChild(document.createTextNode("Univerzitet u Novom Sadu"));
		institucija.appendChild(univerzitet);

		Element fakultet = document.createElementNS(TARGET_NAMESPACE, "fakultet");
		fakultet.appendChild(document.createTextNode("Fakultet tehničkih nauka"));
		institucija.appendChild(fakultet);
		
		Element departman = document.createElementNS(TARGET_NAMESPACE, "departman");
		departman.appendChild(document.createTextNode("Računarstvo i automatika"));
		institucija.appendChild(departman);

		Element katedra = document.createElementNS(TARGET_NAMESPACE, "katedra");
		katedra.appendChild(document.createTextNode("Katedra za informatiku"));
		institucija.appendChild(katedra);
		
		Element autor = document.createElementNS(TARGET_NAMESPACE, "autor");
		naslovnaStrana.appendChild(autor);
		
		Element ime = document.createElementNS(TARGET_NAMESPACE, "ime");
		ime.appendChild(document.createTextNode("Petar"));
		autor.appendChild(ime);
		
		Element prezime = document.createElementNS(TARGET_NAMESPACE, "prezime");
		prezime.appendChild(document.createTextNode("Petrović"));
		autor.appendChild(prezime);
		
		Element broj_indeksa = document.createElementNS(TARGET_NAMESPACE, "broj_indeksa");
		broj_indeksa.appendChild(document.createTextNode("RA 1/2012"));
		autor.appendChild(broj_indeksa);
		
		Element temaSrpski = document.createElementNS(TARGET_NAMESPACE, "tema_rada");
		temaSrpski.setAttribute("jezik", "srpski");
		temaSrpski.appendChild(document.createTextNode("Implementacija podsistema banke u okviru sistema platnog prometa."));
		naslovnaStrana.appendChild(temaSrpski);

		Element temaEngleski = document.createElementNS(TARGET_NAMESPACE, "tema_rada");
		temaEngleski.setAttribute("jezik", "engleski");
		temaEngleski.appendChild(document.createTextNode("Implementation of banking subsystem in an electronic payment system."));
		naslovnaStrana.appendChild(temaEngleski);
		
		Element nivoStudija = document.createElementNS(TARGET_NAMESPACE, "nivo_studija");
		nivoStudija.appendChild(document.createTextNode("OAS"));
		naslovnaStrana.appendChild(nivoStudija);
		
		Element sadrzaj = document.createElementNS(TARGET_NAMESPACE, "sadrzaj");
		sadrzaj.appendChild(document.createComment("Generisati \"sadrzaj\" analogno."));
		rad.appendChild(sadrzaj);
		
		Element poglavlja = document.createElementNS(TARGET_NAMESPACE, "poglavlja");
		poglavlja.appendChild(document.createComment("Generisati \"poglavlja\" analogno."));
		rad.appendChild(poglavlja);
		
	}
	
	/**
	 * Serializes DOM tree to an arbitrary OutputStream.
	 */
	public void transform(OutputStream out) {
		try {

			// Kreiranje instance objekta zaduzenog za serijalizaciju DOM modela
			Transformer transformer = transformerFactory.newTransformer();

			// Indentacija serijalizovanog izlaza
			transformer.setOutputProperty("{http://xml.apache.org/xalan}indent-amount", "2");
			transformer.setOutputProperty(OutputKeys.INDENT, "yes");

			// Nad "source" objektom (DOM stablo) vrši se transformacija
			DOMSource source = new DOMSource(document);

			// Rezultujući stream (argument metode) 
			StreamResult result = new StreamResult(out);

			// Poziv metode koja vrši opisanu transformaciju
			transformer.transform(source, result);

		} catch (TransformerConfigurationException e) {
			e.printStackTrace();
		} catch (TransformerFactoryConfigurationError e) {
			e.printStackTrace();
		} catch (TransformerException e) {
			e.printStackTrace();
		}
	}
	
	public static void putOrgan(String filePath, Organ organ) {


		System.out.println("[INFO] DOM Parser");

		String filePathDestination = "src/main/resources/static/XMLDocuments/Resenja/" + filePath + "Update.xml";
		filePath = "src/main/resources/static/XMLDocuments/Resenja/" + filePath + ".xml";
		
		DOMWriter handler = new DOMWriter();
		
		
		
		// Kreiranje Document čvora
		handler.updateDocument(filePath);
		handler.updateOrgan(organ);
		try {
			handler.transform(new FileOutputStream(new File(filePathDestination)));
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		
	}

	private void updateOrgan(Organ organ) {
		Element organElem;
		NodeList nodes = document.getElementsByTagName("organ");
		
		organElem = (Element) nodes.item(0);
		

		Element naziv = (Element) organElem.getElementsByTagName("naziv").item(0);
		naziv.getChildNodes().item(0).setNodeValue(organ.getNaziv());
		
		Element adresa = (Element) organElem.getElementsByTagName("adresa").item(0);
		
		
		Element mesto = (Element) adresa.getElementsByTagName("mesto").item(0);
		mesto.getChildNodes().item(0).setNodeValue(organ.getAdresa().getMesto());
		
		Element ulica = (Element) adresa.getElementsByTagName("ulica").item(0);
		ulica.getFirstChild().setNodeValue(organ.getAdresa().getUlica());
		
		Element broj = (Element) adresa.getElementsByTagName("broj").item(0);
		broj.getFirstChild().setNodeValue(organ.getAdresa().getBroj() + "");
		
	}
}