export interface Korisnik {
    "_declaration": {
        "_attributes": {
            "version": "1.0",
            "encoding": "utf-8"
        }
    },
    "korisnik": {
        "_attributes": {
            "xmlns": "http://www.projekat.org/korisnik_portal_sluzbenik",
            "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
            "xsi:schemaLocation": "http://www.projekat.org/korisnik_portal_sluzbenik",
            "id": string
        },
        "ime": {
            "_text": string
        },
        "prezime": {
            "_text": string
        },
        "email": {
            "_text": string
        },
        "lozinka": {
            "_text": string
        },
        "uloga": {
            "_text": string
        }
    }
}
