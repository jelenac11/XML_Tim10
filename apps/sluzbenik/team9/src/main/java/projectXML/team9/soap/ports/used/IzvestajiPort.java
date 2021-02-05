package projectXML.team9.soap.ports.used;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.xml.bind.annotation.XmlSeeAlso;

import projectXML.team9.models.izvestaj.Izvestaj;

@WebService(targetNamespace = "http://www.projekat.org/ws/izvestaji", name = "Izvestaji")
@XmlSeeAlso({projectXML.team9.models.izvestaj.ObjectFactory.class})
@SOAPBinding(style = SOAPBinding.Style.RPC)
public interface IzvestajiPort {

	@WebMethod
	@WebResult(name = "return", targetNamespace = "http://www.projekat.org/ws/izvestaji", partName = "return")
    public Izvestaj storeIzvestaj(
        @WebParam(partName = "izvestaj", name = "izvestaj")
        Izvestaj izvestaj
    );
	
}
