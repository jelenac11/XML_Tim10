package projectXML.team10.poverenik.soap.ports.defined;

import java.net.URL;

import javax.xml.namespace.QName;
import javax.xml.ws.Service;
import javax.xml.ws.WebEndpoint;
import javax.xml.ws.WebServiceClient;
import javax.xml.ws.WebServiceFeature;

import projectXML.team10.poverenik.soap.ports.defined.ZalbePort;

@WebServiceClient(name = "ZalbeService", 
wsdlLocation = "classpath:wsdl/Zalba.wsdl",
targetNamespace = "http://www.projekat.org/ws/zalbe")
public class ZalbeService extends Service {
	
	public final static URL WSDL_LOCATION;

    public final static QName SERVICE = new QName("http://www.projekat.org/ws/zalbe", "ZalbeService");
    public final static QName ZalbaPort = new QName("http://www.projekat.org/ws/zalbe", "ZalbaPort");
    static {
        URL url = ZalbeService.class.getClassLoader().getResource("wsdl/Zalba.wsdl");
        if (url == null) {
            java.util.logging.Logger.getLogger(ZalbeService.class.getName())
                .log(java.util.logging.Level.INFO, 
                     "Can not initialize the default wsdl from {0}", "classpath:wsdl/Zalba.wsdl");
        }       
        WSDL_LOCATION = url;   
    }

    public ZalbeService(URL wsdlLocation) {
        super(wsdlLocation, SERVICE);
    }

    public ZalbeService(URL wsdlLocation, QName serviceName) {
        super(wsdlLocation, serviceName);
    }

    public ZalbeService() {
        super(WSDL_LOCATION, SERVICE);
    }
    
    public ZalbeService(WebServiceFeature ... features) {
        super(WSDL_LOCATION, SERVICE, features);
    }

    public ZalbeService(URL wsdlLocation, WebServiceFeature ... features) {
        super(wsdlLocation, SERVICE, features);
    }

    public ZalbeService(URL wsdlLocation, QName serviceName, WebServiceFeature ... features) {
        super(wsdlLocation, serviceName, features);
    }    




    /**
     *
     * @return
     *     returns Hello
     */
    @WebEndpoint(name = "ZalbaPort")
    public ZalbePort getZalbaPort() {
        return super.getPort(ZalbaPort, ZalbePort.class);
    }

    /**
     * 
     * @param features
     *     A list of {@link javax.xml.ws.WebServiceFeature} to configure on the proxy.  Supported features not in the <code>features</code> parameter will have their default values.
     * @return
     *     returns Hello
     */
    @WebEndpoint(name = "ZalbaPort")
    public ZalbePort getZalbaPort(WebServiceFeature... features) {
        return super.getPort(ZalbaPort, ZalbePort.class, features);
    }

}
