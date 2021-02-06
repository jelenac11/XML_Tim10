package projectXML.team9.util;

public class DatabaseQueries {

	/**
	 * KORISNICI
	 **/
	public static final String X_QUERY_FIND_ALL_KORISNICI = "xquery version \"3.1\";\n"
			+ "declare default element namespace \"http://www.projekat.org/korisnik_portal_sluzbenik\";\n"
			+ "for $x in collection(\"/db/sample/korisnici\")\n" + "return $x";

	public static final String X_QUERY_FIND_BY_EMAIL_KORISNICI = "xquery version \"3.1\";\n"
			+ "declare default element namespace \"http://www.projekat.org/korisnik_portal_sluzbenik\";\n"
			+ "for $x in collection(\"/db/sample/korisnici\")/korisnik\n" + "where $x/email/text()=\"%s\"\n"
			+ "return $x";
	public static final String SEARCH_ZAHTEV = "xquery version \"3.1\";\n"
			+ "declare default element namespace \"http://www.projekat.org/zahtev\";\n"
			+ "for $x in collection(\"/db/sample/zahtevi\")\n" + "where $x//*/text()[contains(lower-case(.) ,%s)]\n"
			+ "return data($x/*/@id)";

	public static final String SEARCH_RESENJA = "xquery version \"3.1\";\n"
			+ "declare default element namespace \"http://www.projekat.org/resenje\";\n"
			+ "for $x in collection(\"/db/sample/odlukePoverioca\")\n"
			+ "where $x//*/text()[contains(lower-case(.) ,%s)]\n" + "return data($x/*/@broj_rešenja)";

	public static final String SEARCH_IZVESTAJI = "xquery version \"3.1\";\n"
			+ "declare default element namespace \"http://www.projekat.org/izvestaj\";\n"
			+ "for $x in collection(\"/db/sample/izvestaji\")\n" + "where $x//*/text()[contains(lower-case(.) ,%s)]\n"
			+ "return data($x/*/@id)";
}
