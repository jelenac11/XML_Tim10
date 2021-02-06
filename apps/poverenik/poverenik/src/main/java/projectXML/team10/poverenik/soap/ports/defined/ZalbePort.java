package projectXML.team10.poverenik.soap.ports.defined;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.xml.bind.annotation.XmlSeeAlso;

import projectXML.team10.poverenik.soap.StringArray;
import projectXML.team10.poverenik.soap.TXSLTDocument;

@WebService(targetNamespace = "http://www.projekat.org/ws/zalbe", name = "ZalbePort")
@XmlSeeAlso({projectXML.team10.poverenik.soap.ObjectFactory.class})
@SOAPBinding(style = SOAPBinding.Style.RPC)
public interface ZalbePort {

	@WebMethod
    @WebResult(name = "return", targetNamespace = "http://www.projekat.org/ws/zalbe", partName = "return")
    public StringArray getReferenciraneZalbeCutanje(
        @WebParam(partName = "id", name = "id")
        String id
    );
	
	@WebMethod
    @WebResult(name = "return", targetNamespace = "http://www.projekat.org/ws/zalbe", partName = "return")
    public TXSLTDocument getXSLTZalbeCutanje(
        @WebParam(partName = "id", name = "id")
        String id
    );
	
	@WebMethod
    @WebResult(name = "return", targetNamespace = "http://www.projekat.org/ws/zalbe", partName = "return")
    public StringArray getReferenciraneZalbeNaOdluku(
        @WebParam(partName = "id", name = "id")
        String id
    );
	
	@WebMethod
    @WebResult(name = "return", targetNamespace = "http://www.projekat.org/ws/zalbe", partName = "return")
    public TXSLTDocument getXSLTZalbeNaOdluku(
        @WebParam(partName = "id", name = "id")
        String id
    );
	
}
