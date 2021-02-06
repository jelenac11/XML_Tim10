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
            "declare default element namespace \"http://www.projekat.org/zalba_cutanja\";\n" +
            "for $x in collection(\"/db/sample/zalbeCutanje\")\n" +
            "return $x";
	
	public static final String X_QUERY_FIND_ZALBE_CUTANJE_BY_RAZLOG_ZALBE = "xquery version \"3.1\";\n" +
            "declare default element namespace \"http://www.projekat.org/zalba_cutanja\";\n" +
            "for $x in collection(\"/db/sample/zalbeCutanje\")/zalba_na_cutanje\n" +
            "where $x//razlog_zalbe/text()=\"%s\" and (xs:date($x//datum_podnosenja/text()) > xs:date(\"%s\"))\n" +
            "return $x/@id";
	
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
	
	public static final String SEARCH_ZALBA_CUTANJE = "xquery version \"3.1\";\n"
			+ "declare default element namespace \"http://www.projekat.org/zalba_cutanja\";\n"
			+ "for $x in collection(\"/db/sample/zalbeCutanje\")\n"
			+ "where $x//*/text()[contains(lower-case(.) ,%s)]\n" + "return data($x/*/@id)";
	
	public static final String SEARCH_ZALBA_NA_ODLUKU = "xquery version \"3.1\";\n"
			+ "declare default element namespace \"http://www.projekat.org/zalba_na_odluku\";\n"
			+ "for $x in collection(\"/db/sample/zalbeNaOdluku\")\n"
			+ "where $x//*/text()[contains(lower-case(.) ,%s)]\n" + "return data($x/*/@id)";
	
	public static final String SEARCH_RESENJA = "xquery version \"3.1\";\n"
			+ "declare default element namespace \"http://www.projekat.org/resenje\";\n"
			+ "for $x in collection(\"/db/sample/odlukePoverioca\")\n"
			+ "where $x//*/text()[contains(lower-case(.) ,%s)]\n" + "return data($x/*/@broj_rešenja)";
	
	public static final String SEARCH_IZVESTAJI = "xquery version \"3.1\";\n"
			+ "declare default element namespace \"http://www.projekat.org/izvestaj\";\n"
			+ "for $x in collection(\"/db/sample/izvestaji\")\n"
			+ "where $x//*/text()[contains(lower-case(.) ,%s)]\n" + "return data($x/*/@id)";
}
