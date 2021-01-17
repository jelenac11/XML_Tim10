package projectXML.team10.poverenik.util;

public class DatabaseQueries {

	/** 
	 * ZALBE NA ODLUKU 
	 * **/
	public static final String X_QUERY_FIND_ALL_ZALBE_NA_ODLUKU = "xquery version \"3.1\";\n" +
            "declare default element namespace \"http://www.projekat.org/zalba_na_odluku\";\n" +
            "for $x in collection(\"/db/sample/zalbeNaOdluku\")\n" +
            "return $x";
	
	/** 
	 * ZALBE NA CUTANJE 
	 * **/
	public static final String X_QUERY_FIND_ALL_ZALBE_NA_CUTANJE = "xquery version \"3.1\";\n" +
            "declare default element namespace \"http://www.projekat.org/zalba_cutanje\";\n" +
            "for $x in collection(\"/db/sample/zalbeCutanje\")\n" +
            "return $x";
	
	/** 
	 * KORISNICI
	 * **/
	public static final String X_QUERY_FIND_ALL_KORISNICI = "xquery version \"3.1\";\n" +
            "declare default element namespace \"http://www.projekat.org/korisnik_portal_poverenik\";\n" +
            "for $x in collection(\"/db/sample/korisnici\")\n" +
            "return $x";
	
	public static final String X_QUERY_FIND_BY_EMAIL_KORISNICI = "xquery version \"3.1\";\n" +
            "declare default element namespace \"http://www.projekat.org/korisnik_portal_poverenik\";\n" +
            "for $x in collection(\"/db/sample/korisnici\")/korisnik\n" +
            "where $x/email/text()=\"%s\"\n" +
            "return $x";
	
	
}
