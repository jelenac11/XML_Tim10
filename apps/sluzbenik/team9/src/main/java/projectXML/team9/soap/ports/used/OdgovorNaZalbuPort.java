package projectXML.team9.soap.ports.used;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.xml.bind.annotation.XmlSeeAlso;

@WebService(targetNamespace = "http://www.projekat.org/ws/odgovor", name = "Odgovori")
@XmlSeeAlso({projectXML.team9.soap.data.ObjectFactory.class})
@SOAPBinding(style = SOAPBinding.Style.RPC)
public interface OdgovorNaZalbuPort {

	@WebMethod
	@WebResult(name = "return", targetNamespace = "http://www.projekat.org/ws/odgovor", partName = "return")
    public projectXML.team9.soap.data.StringArray getZalbeNaKojeTrebaOdgovoriti();
	
	@WebMethod
	public void prihvatiZalbu(
		@WebParam(partName = "id", name = "id")
        java.lang.String id,
        @WebParam(partName = "tip", name = "tip")
        java.lang.String tip
    );
	
	@WebMethod
	public void odbiZalbu(
		@WebParam(partName = "id", name = "id")
        java.lang.String id,
        @WebParam(partName = "tip", name = "tip")
        java.lang.String tip
    );
}
