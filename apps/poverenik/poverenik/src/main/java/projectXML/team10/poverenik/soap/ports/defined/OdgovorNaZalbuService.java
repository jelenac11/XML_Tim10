package projectXML.team10.poverenik.soap.ports.defined;

import java.net.URL;

import javax.xml.namespace.QName;
import javax.xml.ws.Service;
import javax.xml.ws.WebEndpoint;
import javax.xml.ws.WebServiceClient;
import javax.xml.ws.WebServiceFeature;

@WebServiceClient(name = "OdgovorNaZalbuService", 
wsdlLocation = "classpath:wsdl/Odgovor.wsdl",
targetNamespace = "http://www.projekat.org/ws/odgovor")
public class OdgovorNaZalbuService extends Service {

public final static URL WSDL_LOCATION;

public final static QName SERVICE = new QName("http://www.projekat.org/ws/odgovor", "OdgovorNaZalbuService");
public final static QName OdgovorNaZalbuPort = new QName("http://www.projekat.org/ws/odgovor", "OdgovorPort");
static {
    URL url = OdgovorNaZalbuService.class.getClassLoader().getResource("wsdl/Odgovor.wsdl");
    if (url == null) {
        java.util.logging.Logger.getLogger(OdgovorNaZalbuService.class.getName())
            .log(java.util.logging.Level.INFO, 
                 "Can not initialize the default wsdl from {0}", "classpath:wsdl/Odgovor.wsdl");
    }       
    WSDL_LOCATION = url;   
}

public OdgovorNaZalbuService(URL wsdlLocation) {
    super(wsdlLocation, SERVICE);
}

public OdgovorNaZalbuService(URL wsdlLocation, QName serviceName) {
    super(wsdlLocation, serviceName);
}

public OdgovorNaZalbuService() {
    super(WSDL_LOCATION, SERVICE);
}

public OdgovorNaZalbuService(WebServiceFeature ... features) {
    super(WSDL_LOCATION, SERVICE, features);
}

public OdgovorNaZalbuService(URL wsdlLocation, WebServiceFeature ... features) {
    super(wsdlLocation, SERVICE, features);
}

public OdgovorNaZalbuService(URL wsdlLocation, QName serviceName, WebServiceFeature ... features) {
    super(wsdlLocation, serviceName, features);
}    




/**
 *
 * @return
 *     returns Hello
 */
@WebEndpoint(name = "OdgovorPort")
public OdgovorNaZalbuPort getOdgovorNaZalbuPort() {
    return super.getPort(OdgovorNaZalbuPort, OdgovorNaZalbuPort.class);
}

/**
 * 
 * @param features
 *     A list of {@link javax.xml.ws.WebServiceFeature} to configure on the proxy.  Supported features not in the <code>features</code> parameter will have their default values.
 * @return
 *     returns Hello
 */
@WebEndpoint(name = "OdgovorPort")
public OdgovorNaZalbuPort getOdgovorNaZalbuPort(WebServiceFeature... features) {
    return super.getPort(OdgovorNaZalbuPort, OdgovorNaZalbuPort.class, features);
}

}

