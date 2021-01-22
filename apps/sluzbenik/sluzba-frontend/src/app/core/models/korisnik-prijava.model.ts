export interface KorisnikPrijava {
    "_declaration": {
        "_attributes": {
            "version": "1.0",
            "encoding": "utf-8"
        }
    },
    "korisnik_prijava": {
        "_attributes": {
            "xmlns": "http://www.projekat.org/korisnik_portal_sluzbenik",
            "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
            "xsi:schemaLocation": "http://www.projekat.org/korisnik_portal_sluzbenik"
        },
        "email": {
            "_text": string
        },
        "lozinka": {
            "_text": string
        }
    }
}
