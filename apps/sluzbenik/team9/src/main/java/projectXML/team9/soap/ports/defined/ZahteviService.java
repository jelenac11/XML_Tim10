package projectXML.team9.soap.ports.defined;

import java.net.URL;

import javax.xml.namespace.QName;
import javax.xml.ws.Service;
import javax.xml.ws.WebEndpoint;
import javax.xml.ws.WebServiceClient;
import javax.xml.ws.WebServiceFeature;

@WebServiceClient(name = "ZahteviService", 
	wsdlLocation = "classpath:wsdl/Zahtev.wsdl",
	targetNamespace = "http://www.projekat.org/ws/zahtevi")
public class ZahteviService extends Service {

	public final static URL WSDL_LOCATION;

    public final static QName SERVICE = new QName("http://www.projekat.org/ws/zahtevi", "ZahteviService");
    public final static QName ZahtevPort = new QName("http://www.projekat.org/ws/zahtevi", "ZahtevPort");
    static {
        URL url = ZahteviService.class.getClassLoader().getResource("wsdl/Zahtev.wsdl");
        if (url == null) {
            java.util.logging.Logger.getLogger(ZahteviService.class.getName())
                .log(java.util.logging.Level.INFO, 
                     "Can not initialize the default wsdl from {0}", "classpath:wsdl/Zahtev.wsdl");
        }       
        WSDL_LOCATION = url;   
    }

    public ZahteviService(URL wsdlLocation) {
        super(wsdlLocation, SERVICE);
    }

    public ZahteviService(URL wsdlLocation, QName serviceName) {
        super(wsdlLocation, serviceName);
    }

    public ZahteviService() {
        super(WSDL_LOCATION, SERVICE);
    }
    
    public ZahteviService(WebServiceFeature ... features) {
        super(WSDL_LOCATION, SERVICE, features);
    }

    public ZahteviService(URL wsdlLocation, WebServiceFeature ... features) {
        super(wsdlLocation, SERVICE, features);
    }

    public ZahteviService(URL wsdlLocation, QName serviceName, WebServiceFeature ... features) {
        super(wsdlLocation, serviceName, features);
    }    




    /**
     *
     * @return
     *     returns Hello
     */
    @WebEndpoint(name = "ZahtevPort")
    public ZahteviPort getZahtevPort() {
        return super.getPort(ZahtevPort, ZahteviPort.class);
    }

    /**
     * 
     * @param features
     *     A list of {@link javax.xml.ws.WebServiceFeature} to configure on the proxy.  Supported features not in the <code>features</code> parameter will have their default values.
     * @return
     *     returns Hello
     */
    @WebEndpoint(name = "ZahtevPort")
    public ZahteviPort getZahtevPort(WebServiceFeature... features) {
        return super.getPort(ZahtevPort, ZahteviPort.class, features);
    }
	
}
