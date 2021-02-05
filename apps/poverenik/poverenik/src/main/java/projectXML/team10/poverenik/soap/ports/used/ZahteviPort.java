package projectXML.team10.poverenik.soap.ports.used;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.xml.bind.annotation.XmlSeeAlso;

import projectXML.team10.poverenik.soap.StringArray;
import projectXML.team10.poverenik.dto.XSLTDocumentDTO;
import projectXML.team10.poverenik.models.zahtev.ZahtevGradjana;

@WebService(targetNamespace = "http://www.projekat.org/ws/zahtevi", name = "Zahtevi")
@XmlSeeAlso({projectXML.team10.poverenik.soap.ObjectFactory.class})
@SOAPBinding(style = SOAPBinding.Style.RPC)
public interface ZahteviPort {

	@WebMethod
    @WebResult(name = "return", targetNamespace = "http://www.projekat.org/ws/zahtevi", partName = "return")
    public StringArray getOdbijeniZahtevi(
        @WebParam(partName = "email", name = "email")
        String email
    );
	
	@WebMethod
    @WebResult(name = "return", targetNamespace = "http://www.projekat.org/ws/zahtevi", partName = "return")
    public StringArray getIstekliZahtevi(
        @WebParam(partName = "email", name = "email")
        String email
    );
	
	@WebMethod
    @WebResult(name = "return", targetNamespace = "http://www.projekat.org/ws/zahtevi", partName = "return")
    public XSLTDocumentDTO getZahtevById(
        @WebParam(partName = "id", name = "id")
        String id
    );
	
	@WebMethod
    @WebResult(name = "return", targetNamespace = "http://www.projekat.org/ws/zahtevi", partName = "return")
    public ZahtevGradjana getZahtev(
        @WebParam(partName = "id", name = "id")
        String id
    );
	
}
