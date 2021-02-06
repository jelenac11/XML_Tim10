package projectXML.team9.soap.ports.defined;

import java.net.URL;

import javax.xml.namespace.QName;
import javax.xml.ws.Service;
import javax.xml.ws.WebEndpoint;
import javax.xml.ws.WebServiceClient;
import javax.xml.ws.WebServiceFeature;

@WebServiceClient(name = "ResenjaService", 
wsdlLocation = "classpath:wsdl/Resenje.wsdl",
targetNamespace = "http://www.projekat.org/ws/resenja")
public class ResenjaService extends Service {
	
	public final static URL WSDL_LOCATION;

    public final static QName SERVICE = new QName("http://www.projekat.org/ws/resenja", "ResenjaService");
    public final static QName ResenjePort = new QName("http://www.projekat.org/ws/resenja", "ResenjePort");
    static {
        URL url = ResenjaService.class.getClassLoader().getResource("wsdl/Resenje.wsdl");
        if (url == null) {
            java.util.logging.Logger.getLogger(ResenjaService.class.getName())
                .log(java.util.logging.Level.INFO, 
                     "Can not initialize the default wsdl from {0}", "classpath:wsdl/Resenje.wsdl");
        }       
        WSDL_LOCATION = url;   
    }

    public ResenjaService(URL wsdlLocation) {
        super(wsdlLocation, SERVICE);
    }

    public ResenjaService(URL wsdlLocation, QName serviceName) {
        super(wsdlLocation, serviceName);
    }

    public ResenjaService() {
        super(WSDL_LOCATION, SERVICE);
    }
    
    public ResenjaService(WebServiceFeature ... features) {
        super(WSDL_LOCATION, SERVICE, features);
    }

    public ResenjaService(URL wsdlLocation, WebServiceFeature ... features) {
        super(wsdlLocation, SERVICE, features);
    }

    public ResenjaService(URL wsdlLocation, QName serviceName, WebServiceFeature ... features) {
        super(wsdlLocation, serviceName, features);
    }    




    /**
     *
     * @return
     *     returns Hello
     */
    @WebEndpoint(name = "ResenjePort")
    public ResenjaPort getResenjePort() {
        return super.getPort(ResenjePort, ResenjaPort.class);
    }

    /**
     * 
     * @param features
     *     A list of {@link javax.xml.ws.WebServiceFeature} to configure on the proxy.  Supported features not in the <code>features</code> parameter will have their default values.
     * @return
     *     returns Hello
     */
    @WebEndpoint(name = "ResenjePort")
    public ResenjaPort getResenjePort(WebServiceFeature... features) {
        return super.getPort(ResenjePort, ResenjaPort.class, features);
    }

}
