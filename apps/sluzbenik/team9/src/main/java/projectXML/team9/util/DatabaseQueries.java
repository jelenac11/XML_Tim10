package projectXML.team9.util;

public class DatabaseQueries {

	/** 
	 * KORISNICI
	 * **/
	public static final String X_QUERY_FIND_ALL_KORISNICI = "xquery version \"3.1\";\n" +
            "declare default element namespace \"http://www.projekat.org/korisnik_portal_sluzbenik\";\n" +
            "for $x in collection(\"/db/sample/korisnici\")\n" +
            "return $x";
	
	public static final String X_QUERY_FIND_BY_EMAIL_KORISNICI = "xquery version \"3.1\";\n" +
            "declare default element namespace \"http://www.projekat.org/korisnik_portal_sluzbenik\";\n" +
            "for $x in collection(\"/db/sample/korisnici\")/korisnik\n" +
            "where $x/email/text()=\"%s\"\n" +
            "return $x";
	
	
}
