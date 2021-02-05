package projectXML.team10.poverenik.soap.ports.defined;

import java.net.URL;

import javax.xml.namespace.QName;
import javax.xml.ws.Service;
import javax.xml.ws.WebEndpoint;
import javax.xml.ws.WebServiceClient;
import javax.xml.ws.WebServiceFeature;

@WebServiceClient(name = "IzvestajiService", 
wsdlLocation = "classpath:wsdl/Izvestaj.wsdl",
targetNamespace = "http://www.projekat.org/ws/izvestaji")
public class IzvestajiService extends Service {

public final static URL WSDL_LOCATION;

public final static QName SERVICE = new QName("http://www.projekat.org/ws/izvestaji", "IzvestajiService");
public final static QName IzvestajPort = new QName("http://www.projekat.org/ws/izvestaji", "IzvestajPort");
static {
    URL url = IzvestajiService.class.getClassLoader().getResource("wsdl/Izvestaj.wsdl");
    if (url == null) {
        java.util.logging.Logger.getLogger(IzvestajiService.class.getName())
            .log(java.util.logging.Level.INFO, 
                 "Can not initialize the default wsdl from {0}", "classpath:wsdl/Izvestaj.wsdl");
    }       
    WSDL_LOCATION = url;   
}

public IzvestajiService(URL wsdlLocation) {
    super(wsdlLocation, SERVICE);
}

public IzvestajiService(URL wsdlLocation, QName serviceName) {
    super(wsdlLocation, serviceName);
}

public IzvestajiService() {
    super(WSDL_LOCATION, SERVICE);
}

public IzvestajiService(WebServiceFeature ... features) {
    super(WSDL_LOCATION, SERVICE, features);
}

public IzvestajiService(URL wsdlLocation, WebServiceFeature ... features) {
    super(wsdlLocation, SERVICE, features);
}

public IzvestajiService(URL wsdlLocation, QName serviceName, WebServiceFeature ... features) {
    super(wsdlLocation, serviceName, features);
}    




/**
 *
 * @return
 *     returns Hello
 */
@WebEndpoint(name = "IzvestajPort")
public IzvestajiPort getIzvestajPort() {
    return super.getPort(IzvestajPort, IzvestajiPort.class);
}

/**
 * 
 * @param features
 *     A list of {@link javax.xml.ws.WebServiceFeature} to configure on the proxy.  Supported features not in the <code>features</code> parameter will have their default values.
 * @return
 *     returns Hello
 */
@WebEndpoint(name = "IzvestajPort")
public IzvestajiPort getIzvestajPort(WebServiceFeature... features) {
    return super.getPort(IzvestajPort, IzvestajiPort.class, features);
}

}

