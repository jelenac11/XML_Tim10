package projectXML.team9.util;

import java.io.StringReader;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Attr;
import org.w3c.dom.CDATASection;
import org.w3c.dom.Comment;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Entity;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.w3c.dom.ProcessingInstruction;
import org.w3c.dom.Text;
import org.xml.sax.ErrorHandler;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;

import static org.apache.xerces.jaxp.JAXPConstants.*;

/**
 * 
 * Kao rezultat parsiranja generiše se objektni reprezent XML dokumenta u vidu
 * DOM stabla njegovih elemenata. 
 * 
 * Primer demonstrira upotrebu metoda API-ja za potrebe pristupanja pojedinim
 * elementima DOM stabla. 
 * 
 * Primer omogućuje validaciju XML fajla u odnosu na XML šemu, koja se svodi 
 * na postavljanje svojstava factory objekta uz opcionu implementaciju error 
 * handling metoda.
 * 
 * NAPOMENA: za potrebe testiranja validacije dodati nepostojeći element ili 
 * atribut (npr. "test") u XML fajl koji se parsira.
 * 
 */
public class DOMParser implements ErrorHandler {

	private static DocumentBuilderFactory factory;
	/*
	 * Factory initialization static-block
	 */
	static {
		factory = DocumentBuilderFactory.newInstance();
		
		/* Uključuje validaciju. */ 
		factory.setValidating(false);
		
		factory.setNamespaceAware(true);
		factory.setIgnoringComments(true);
		factory.setIgnoringElementContentWhitespace(true);
		/* Validacija u odnosu na XML šemu. */
		factory.setAttribute(JAXP_SCHEMA_LANGUAGE, W3C_XML_SCHEMA);
	}
	
	/**
	 * Generates document object model for a given XML file.
	 * 
	 * @param filePath XML document file path
	 */
	public Document buildDocument(String xmlString) {
		
		Document document = null;
		try {
			
			DocumentBuilder builder = factory.newDocumentBuilder();
			
			/* Postavlja error handler. */
			builder.setErrorHandler(this);
			InputSource is = new InputSource(new StringReader(xmlString));
			
			
			document = builder.parse(is);
			

		} catch (SAXParseException e) {
			
			System.out.println("[ERROR] Parsing error, line: " + e.getLineNumber() + ", uri: " + e.getSystemId());
			System.out.println("[ERROR] " + e.getMessage() );
			System.out.print("[ERROR] Embedded exception: ");
			
			Exception embeddedException = e;
			if (e.getException() != null)
				embeddedException = e.getException();

			// Print stack trace...
			embeddedException.printStackTrace();
			
		} catch (SAXException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return document;
	}
	
	
	public Document buildDocument(Node node) {
		
		Document document = null;
		try {
			
			DocumentBuilder builder = factory.newDocumentBuilder();
			
			/* Postavlja error handler. */

			builder.setErrorHandler(this);
			document = builder.newDocument();
			Node importedNode = document.importNode(node, true);
			document.appendChild(importedNode);
			System.out.println("[INFO] File parsed with no errors.");

		} catch (Exception e) {
			e.printStackTrace();
		}
		return document;
	}

	/**
	 * Ispis pojedinih elemenata i atributa DOM 
	 * stabla upotrebom DOM API-ja.
	 * @param elementName 
	 */
	public String printElement(String elementName,Document document) {
		
		System.out.println("Prikaz sadržaja DOM stabla parsiranog XML dokumenta.");
		
//	    String elementName, attrName, choice = "";
	    Element element;
	    
		NodeList nodes = document.getElementsByTagName(elementName);
    	
    	System.out.println("\nPronađeno " + nodes.getLength() + " elemenata. ");
	
    	element = (Element) nodes.item(0);
    	String elementString = printNode(element);

		System.out.println("[INFO] Kraj.");
		return elementString;
	}
	
	/**
	 * A recursive helper method for iterating 
	 * over the elements of a DOM tree.
	 * 
	 * @param node current node
	 * @return 
	 */
	private String printNode(Node node) {
		
		// Uslov za izlazak iz rekurzije
		if (node == null)
			return "";
		
		// Ako je upitanju dokument čvor (korenski element)
		if (node instanceof Document) {
			String ispis = "";
			ispis += "START_DOCUMENT\n";

			// Rekurzivni poziv za prikaz korenskog elementa
			Document doc = (Document) node;
			return ispis + printNode(doc.getDocumentElement());
		} else if (node instanceof Element) {
			
			Element element = (Element) node;

			String ispis = "";

			// Preuzimanje liste atributa
			NamedNodeMap attributes = element.getAttributes();

			if (attributes.getLength() > 0) {
				
				System.out.print(", ATTRIBUTES: ");
				
				for (int i = 0; i < attributes.getLength(); i++) {
					Node attribute = attributes.item(i);
					printNode(attribute);
					if (i < attributes.getLength()-1)
	        			System.out.print(", ");
				}
			}
			
			//System.out.println();
			
			// Prikaz svakog od child nodova, rekurzivnim pozivom
			NodeList children = element.getChildNodes();

			if (children != null) {
				if(children.getLength() > 1) {
					ispis += "\""+ element.getTagName() + "\" : {";
				}
				else
					ispis += "\""+ element.getTagName() + "\" : ";
				for (int i = 0; i < children.getLength(); i++) {
					Node aChild = children.item(i);
					String childIspis = printNode(aChild);
					if(childIspis.equals(""))
						continue;
					if(children.getLength() > 1)
						ispis += "\n" + String.join("");
					ispis+= printNode(aChild);
					if(i != children.getLength() -1)
						ispis+= ",";
				}
			}
			
			if(children.getLength() > 1)
				ispis += "\n" + String.join("") + "}";
			return ispis;
		} 	
		// Za naredne čvorove nema rekurzivnog poziva jer ne mogu imati podelemente
		else if (node instanceof Attr) {

			Attr attr = (Attr) node;
			return attr.getName() + "=" + attr.getValue();
			
		}
		else if (node instanceof Text) {
			Text text = (Text) node;
			
			if (text.getTextContent().trim().length() > 0)
				return "\"" + text.getTextContent().trim() + "\"";
		}
		else if (node instanceof CDATASection) {
			System.out.println("CDATA: " + node.getNodeValue());
		}
		else if (node instanceof Comment) {
			System.out.println("COMMENT: " + node.getNodeValue());
		}
		else if (node instanceof ProcessingInstruction) {
			System.out.print("PROCESSING INSTRUCTION: ");

			ProcessingInstruction instruction = (ProcessingInstruction) node;
			System.out.print("data: " + instruction.getData());
			System.out.println(", target: " + instruction.getTarget());
		}
		else if (node instanceof Entity) {
			Entity entity = (Entity) node;
			System.out.println("ENTITY: " + entity.getNotationName());
		}
		
		return "";
	}
	
	/*
	 * Error handling methods
	 */

	@Override
	public void error(SAXParseException err) throws SAXParseException {
		// Propagate the exception
		throw err;
	}

	@Override
	public void fatalError(SAXParseException err) throws SAXException {
		// Propagate the exception
		throw err;
	}
	
	@Override
    public void warning(SAXParseException err) throws SAXParseException {
    	System.out.println("[WARN] Warning, line: " + err.getLineNumber() + ", uri: " + err.getSystemId());
        System.out.println("[WARN] " + err.getMessage());
    }

	public static Document parse(String xml) {
		DOMParser handler = new DOMParser();
		// Kreiranje DOM stabla na osnovu XML fajla
		Document document = handler.buildDocument(xml);
		return document;
	}
	
	public static Document parse(Node node) {
		DOMParser handler = new DOMParser();
		
		Document document = handler.buildDocument(node);
		
		return document;
	}
}
