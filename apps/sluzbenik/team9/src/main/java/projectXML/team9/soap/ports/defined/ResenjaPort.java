package projectXML.team9.soap.ports.defined;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;

@WebService(targetNamespace = "http://www.projekat.org/ws/resenja", name = "ResenjaPort")
@SOAPBinding(style = SOAPBinding.Style.RPC)
public interface ResenjaPort {
	
	@WebMethod
    public void storeOdlukaPoverioca(
        @WebParam(partName = "resenje", name = "resenje")
        String resenje
    );

}
