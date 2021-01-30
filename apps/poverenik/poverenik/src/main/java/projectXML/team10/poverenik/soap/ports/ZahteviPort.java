package projectXML.team10.poverenik.soap.ports;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.xml.bind.annotation.XmlSeeAlso;

import net.java.dev.jaxb.array.TStringArray;
import projectXML.team10.poverenik.dto.TXSLTDocumentDTO;

@WebService(targetNamespace = "http://www.projekat.org/ws/zahtevi", name = "Zahtevi")
@XmlSeeAlso({net.java.dev.jaxb.array.ObjectFactory.class})
@SOAPBinding(style = SOAPBinding.Style.RPC)
public interface ZahteviPort {

	@WebMethod
    @WebResult(name = "return", targetNamespace = "http://www.projekat.org/ws/zahtevi", partName = "return")
    public TStringArray getOdbijeniZahtevi(
        @WebParam(partName = "email", name = "email")
        String email
    );
	
	@WebMethod
    @WebResult(name = "return", targetNamespace = "http://www.projekat.org/ws/zahtevi", partName = "return")
    public TXSLTDocumentDTO getZahtevById(
        @WebParam(partName = "id", name = "id")
        String id
    );
	
}
