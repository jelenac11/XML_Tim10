package projectXML.team9.soap.ports;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.xml.bind.annotation.XmlSeeAlso;

import projectXML.team9.dto.StringArray;
import projectXML.team9.dto.TXSLTDocumentDTO;
import projectXML.team9.models.zahtev.TZahtevGradjana;

@WebService(targetNamespace = "http://www.projekat.org/ws/zahtevi", name = "ZahteviPort")
@XmlSeeAlso({projectXML.team9.dto.ObjectFactory.class})
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
    public TXSLTDocumentDTO getZahtevById(
        @WebParam(partName = "id", name = "id")
        String id
    );
	
	@WebMethod
    @WebResult(name = "return", targetNamespace = "http://www.projekat.org/ws/zahtevi", partName = "return")
    public TZahtevGradjana getZahtev(
        @WebParam(partName = "id", name = "id")
        String id
    );
	
}
