package projectXML.team10.poverenik.soap.ports.defined;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.xml.bind.annotation.XmlSeeAlso;

import projectXML.team10.poverenik.models.izvestaj.TIzvestaj;

@WebService(targetNamespace = "http://www.projekat.org/ws/izvestaji", name = "IzvestajiPort")
@XmlSeeAlso({projectXML.team10.poverenik.models.izvestaj.ObjectFactory.class})
@SOAPBinding(style = SOAPBinding.Style.RPC)
public interface IzvestajiPort {

	@WebMethod
	@WebResult(name = "return", targetNamespace = "http://www.projekat.org/ws/izvestaji", partName = "return")
    public TIzvestaj storeIzvestaj(
        @WebParam(partName = "izvestaj", name = "izvestaj")
        TIzvestaj izvestaj
    );
}
