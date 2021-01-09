import { Injectable } from '@angular/core';

declare const Xonomy: any;

@Injectable({
  providedIn: 'root'
})
export class ObavestenjeXonomyService {

  public obavestenjeSpecification = {
    validate: function (jsElement) {
      //Validate the element:
      let elementSpec = this.elements[jsElement.name];
      if (elementSpec.validate) elementSpec.validate(jsElement);
      //Cycle through the element's attributes:
      for (let i = 0; i < jsElement.attributes.length; i++) {
        let jsAttribute = jsElement.attributes[i];
        let attributeSpec = elementSpec.attributes[jsAttribute.name];
        if (attributeSpec.validate) attributeSpec.validate(jsAttribute);
      };
      //Cycle through the element's children:
      for (let i = 0; i < jsElement.children.length; i++) {
        let jsChild = jsElement.children[i];
        if (jsChild.type == "element") { //if element
          this.validate(jsChild); //recursion
        }
      }
    },
    elements: {
      obavestenje: {
        menu: [
          {
            caption: "Append an <informacije_o_obavestenju>",
            action: Xonomy.newElementChild,
            actionParameter: "<informacije_o_obavestenju></informacije_o_obavestenju>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("informacije_o_obavestenju");
            }
          },
          {
            caption: "Append an <zahtev>",
            action: Xonomy.newElementChild,
            actionParameter: "<zahtev></zahtev>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("zahtev");
            }
          },
          {
            caption: "Append an <odgovor_na_zahtev>",
            action: Xonomy.newElementChild,
            actionParameter: "<odgovor_na_zahtev></odgovor_na_zahtev>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("odgovor_na_zahtev");
            }
          },
          {
            caption: "Append an <dostavljeno>",
            action: Xonomy.newElementChild,
            actionParameter: "<dostavljeno></dostavljeno>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("dostavljeno");
            }
          },
        ]
      },
      informacije_o_obavestenju: {
        menu: [
          {
            caption: "Append an <organ>",
            action: Xonomy.newElementChild,
            actionParameter: "<organ></organ>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("organ");
            }
          },
          {
            caption: "Append an <trazilac>",
            action: Xonomy.newElementChild,
            actionParameter: "<trazilac></trazilac>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("trazilac");
            }
          },
          {
            caption: "Append an <datum_obavestenja>",
            action: Xonomy.newElementChild,
            actionParameter: `<datum_obavestenja>${new Date().toISOString().slice(0, 10)}</datum_obavestenja>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("datum_obavestenja");
            }
          },
        ],
        mustBeBefore: ["zahtev", "odgovor_na_zahtev", "dostavljeno"]
      },
      organ: {
        validate: function (jsElement) {
          if (!jsElement.hasElements()) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
          if (!jsElement.hasChildElement("adresa")) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element needs to have element adresa."
            }
            );
          }
        },
        mustBeBefore: ["trazilac", "datum_obavestenja"],
        menu: [
          {
            caption: "Append an <adresa>",
            action: Xonomy.newElementChild,
            actionParameter: "<adresa></adresa>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("adresa");
            }
          },
          {
            caption: "Append an <naziv>",
            action: Xonomy.newElementChild,
            actionParameter: "<naziv></naziv>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("naziv");
            }
          }
        ],
        isReadOnly: true
      },
      adresa: {
        validate: function (jsElement) {
          if (!jsElement.hasElements()) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        menu: [
          {
            caption: "Append an <mesto>",
            action: Xonomy.newElementChild,
            actionParameter: "<mesto></mesto>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("mesto");
            }
          },
          {
            caption: "Append an <ulica>",
            action: Xonomy.newElementChild,
            actionParameter: "<ulica></ulica>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("ulica");
            }
          },
          {
            caption: "Append an <broj>",
            action: Xonomy.newElementChild,
            actionParameter: "<broj></broj>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("broj");
            }
          },
        ],
        mustBeBefore: ["naziv", "ime", "prezime"],
      },
      mesto: {
        validate: function (jsElement) {
          if (jsElement.getText() == "") {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        mustBeBefore: ["ulica", "broj", "datum", "kancelarija"],
        hasText: true
      },
      ulica: {
        validate: function (jsElement) {
          if (jsElement.getText() == "") {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        menu: [{
          caption: "Delete this <item>",
          action: Xonomy.deleteElement
        }
        ],
        mustBeBefore: ["broj", "kancelarija"],
        hasText: true
      },
      broj: {
        validate: function (jsElement) {
          if (jsElement.getText() == "") {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        menu: [{
          caption: "Delete this <item>",
          action: Xonomy.deleteElement
        }
        ],
        hasText: true,
        mustBeBefore: ["kancelarija"]
      },
      naziv: {
        validate: function (jsElement) {
          if (jsElement.getText() == "") {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        menu: [{
          caption: "Delete this <item>",
          action: Xonomy.deleteElement
        }
        ],
        hasText: true
      },
      trazilac: {
        validate: function (jsElement) {
          if (jsElement.hasAttribute("xsi:type") == "") {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element needs to have attribute xsi:type."
            }
            );
          }
          if (!jsElement.hasElements()) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
          if (jsElement.getAttributeValue("xsi:type", null) == "TFizicko_lice" && (!jsElement.hasChildElement("ime") || !jsElement.hasChildElement("prezime"))) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element needs to have elements ime and prezime with attribute xsi:type value TFizicko_lice."
            }
            );
          }
          if (jsElement.getAttributeValue("xsi:type", null) == "TPravno_lice" && !jsElement.hasChildElement("naziv")) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element needs to have elements naziv with attribute xsi:type value TPravno_lice."
            }
            );
          }
          if (!jsElement.hasChildElement("adresa")) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element needs to have element adresa."
            }
            );
          }
        },
        menu: [
          {
            caption: "Append an <adresa>",
            action: Xonomy.newElementChild,
            actionParameter: "<adresa><mesto></mesto></adresa>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("adresa") || !jsElement.getAttributeValue("xsi:type", null);
            }
          },
          {
            caption: "Append an <naziv>",
            action: Xonomy.newElementChild,
            actionParameter: "<naziv></naziv>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("naziv") || jsElement.hasChildElement("ime") || jsElement.hasChildElement("prezime")
                || !jsElement.getAttributeValue("xsi:type", null) || jsElement.getAttributeValue("xsi:type", null) == "TFizicko_lice";
            }
          },
          {
            caption: "Append an <ime>",
            action: Xonomy.newElementChild,
            actionParameter: "<ime></ime>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("naziv") || jsElement.hasChildElement("ime") || !jsElement.getAttributeValue("xsi:type", null)
                || jsElement.getAttributeValue("xsi:type", null) == "TPravno_lice";
            }
          },
          {
            caption: "Append an <prezime>",
            action: Xonomy.newElementChild,
            actionParameter: "<prezime></prezime>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("naziv") || jsElement.hasChildElement("prezime") || !jsElement.getAttributeValue("xsi:type", null)
                || jsElement.getAttributeValue("xsi:type", null) == "TPravno_lice";
            }
          },
          {
            caption: "Add @xsi:type",
            action: Xonomy.newAttribute,
            actionParameter: { name: "xsi:type", value: "" },
            hideIf: function (jsElement) {
              return jsElement.hasAttribute("xsi:type");
            }
          },
        ],
        mustBeBefore: ["datum_obavestenja"],
        attributes: {
          "xsi:type": {
            asker: Xonomy.askPicklist,
            askerParameter: [
              { value: "TFizicko_lice" },
              { value: "TPravno_lice" }
            ],
            validate: function (jsAttribute) {
              if (jsAttribute.value == "") {
                Xonomy.warnings.push({
                  htmlID: jsAttribute.htmlID,
                  text: "This attribute must not be empty."
                }
                );
              }
            }
          }
        },
        isReadOnly: true
      },
      ime: {
        validate: function (jsElement) {
          if (jsElement.getText() == "") {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        hasText: true,
        mustBeBefore: ["prezime"],
        menu: [
          {
            caption: "Delete this <item>",
            action: Xonomy.deleteElement
          }
        ]
      },
      prezime: {
        validate: function (jsElement) {
          if (jsElement.getText() == "") {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        menu: [
          {
            caption: "Delete this <item>",
            action: Xonomy.deleteElement
          }
        ],
        hasText: true
      },
      datum_obavestenja: {
        validate: function (jsElement) {
          if (jsElement.getText() == "") {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        isReadOnly: true
      },
      zahtev: {
        mustBeBefore: ["odgovor_na_zahtev", "dostavljeno"],
        menu: [
          {
            caption: "Append an <datum_trazenja_informacija>",
            action: Xonomy.newElementChild,
            actionParameter: "<datum_trazenja_informacija></datum_trazenja_informacija>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("datum_trazenja_informacija");
            }
          },
          {
            caption: "Append an <opis_trazene_informacije>",
            action: Xonomy.newElementChild,
            actionParameter: "<opis_trazene_informacije></opis_trazene_informacije>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("opis_trazene_informacije");
            }
          },
        ]
      },
      datum_trazenja_informacija:
      {
        isReadOnly: true
      },
      opis_trazene_informacije:
      {
        isReadOnly: true
      },
      odgovor_na_zahtev:
      {
        menu: [
          {
            caption: "Append an <uplata_troskova>",
            action: Xonomy.newElementChild,
            actionParameter: "<uplata_troskova><uplatnica><primalac></primalac><racun></racun><iznos></iznos><poziv_na_broj></poziv_na_broj></uplatnica><troskovi><trosak><stavka></stavka><kolicina></kolicina><jedinicna_cijena></jedinicna_cijena></trosak></troskovi></uplata_troskova>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("uplata_troskova");
            }
          },
          {
            caption: "Append an <zahtevi>",
            action: Xonomy.newElementChild,
            actionParameter: "<zahtevi></zahtevi>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("zahtevi");
            }
          },
        ],
        mustBeBefore: ["dostavljeno"]
      },
      uplata_troskova:
      {
        menu: [
          {
            caption: "Append an <uplatnica>",
            action: Xonomy.newElementChild,
            actionParameter: "<uplatnica></uplatnica>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("uplatnica");
            }
          },
          {
            caption: "Append an <troskovi>",
            action: Xonomy.newElementChild,
            actionParameter: "<troskovi></troskovi>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("troskovi");
            }
          },
        ],
        mustBeBefore: ["zahtevi"]
      },
      uplatnica:
      {
        menu: [
          {
            caption: "Append an <primalac>",
            action: Xonomy.newElementChild,
            actionParameter: "<primalac></primalac>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("primalac");
            }
          },
          {
            caption: "Append an <racun>",
            action: Xonomy.newElementChild,
            actionParameter: "<racun></racun>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("racun");
            }
          },
          {
            caption: "Append an <iznos>",
            action: Xonomy.newElementChild,
            actionParameter: "<iznos></iznos>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("iznos");
            }
          },
          {
            caption: "Append an <poziv_na_broj>",
            action: Xonomy.newElementChild,
            actionParameter: "<poziv_na_broj></poziv_na_broj>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("poziv_na_broj");
            }
          },
        ],
        mustBeBefore: ["troskovi"]
      },
      primalac:
      {
        validate: function (jsElement) {
          if (jsElement.getText() == "") {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        hasText: true,
        mustBeBefore: ["racun", "iznos", "poziv_na_broj"]
      },
      racun:
      {
        validate: function (jsElement) {
          if (jsElement.getText() == "") {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        hasText: true,
        mustBeBefore: ["iznos", "poziv_na_broj"]
      },
      iznos:
      {
        validate: function (jsElement) {
          if (jsElement.getText() == "") {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        hasText: true,
        mustBeBefore: ["poziv_na_broj"]
      },
      poziv_na_broj:
      {
        validate: function (jsElement) {
          if (jsElement.getText() == "") {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        hasText: true,
        mustBeBefore: ["troskovi"]
      },
      troskovi:
      {
        menu: [
          {
            caption: "Append an <trosak>",
            action: Xonomy.newElementChild,
            actionParameter: "<trosak><stavka></stavka><kolicina></kolicina><jedinicna_cijena></jedinicna_cijena></trosak>"
          },
        ]
      },
      trosak:
      {
        menu: [
          {
            caption: "Append an <stavka>",
            action: Xonomy.newElementChild,
            actionParameter: "<stavka></stavka>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("stavka");
            }
          },
          {
            caption: "Append an <kolicina>",
            action: Xonomy.newElementChild,
            actionParameter: "<kolicina></kolicina>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("kolicina");
            }
          },
          {
            caption: "Append an <jedinicna_cijena>",
            action: Xonomy.newElementChild,
            actionParameter: "<jedinicna_cijena></jedinicna_cijena>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("jedinicna_cijena");
            }
          },
        ]
      },
      stavka: {
        validate: function (jsElement) {
          if (jsElement.getText() == "") {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        hasText: true,
        mustBeBefore: ["kolicina", "jedinicna_cijena"],
        asker: Xonomy.askPicklist,
        askerParameter: ["CD", "A4 papir", "A5 papir", "USB", "Skeniranje", "Dostava"],
      },
      kolicina: {
        validate: function (jsElement) {
          if (jsElement.getText() == "") {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        hasText: true,
        mustBeBefore: ["jedinicna_cijena"]
      },
      jedinicna_cijena: {
        validate: function (jsElement) {
          if (jsElement.getText() == "") {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        hasText: true,
      },
      zahtevi:
      {
      },
      informacije_o_uvidu:
      {
        menu: [
          {
            caption: "Append an <datum_uvida>",
            action: Xonomy.newElementChild,
            actionParameter: "<datum_uvida></datum_uvida>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("datum_uvida");
            }
          },
          {
            caption: "Append an <vreme_uvida>",
            action: Xonomy.newElementChild,
            actionParameter: "<vreme_uvida></vreme_uvida>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("vreme_uvida");
            }
          },
          {
            caption: "Append an <mesto_uvida>",
            action: Xonomy.newElementChild,
            actionParameter: "<mesto_uvida><mesto/><kancelarija/></mesto_uvida>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("mesto_uvida");
            }
          },
          {
            caption: "Add @status",
            action: Xonomy.newAttribute,
            actionParameter: { name: "status", value: "" },
            hideIf: function (jsElement) {
              return jsElement.hasAttribute("status");
            }
          },
        ],
        attributes: {
          "status": {
            asker: Xonomy.askPicklist,
            askerParameter: [
              { value: "true" },
              { value: "false" }
            ],
            validate: function (jsAttribute) {
              if (jsAttribute.value == "") {
                Xonomy.warnings.push({
                  htmlID: jsAttribute.htmlID,
                  text: "This attribute must not be empty."
                }
                );
              }
            }
          }
        }
      },
      datum_uvida:
      {
        validate: function (jsElement) {
          if (jsElement.getText() == "") {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        mustBeBefore: ["vreme_uvida", "mesto_uvida"],
        hasText: true,
      },
      vreme_uvida:
      {
        menu: [
          {
            caption: "Append an <interval_uvida>",
            action: Xonomy.newElementChild,
            actionParameter: "<interval_uvida><od/><do/></interval_uvida>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("interval_uvida") || jsElement.hasChildElement("tacno_vreme_uvida");
            }
          },
          {
            caption: "Append an <tacno_vreme_uvida>",
            action: Xonomy.newElementChild,
            actionParameter: "<tacno_vreme_uvida></tacno_vreme_uvida>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("tacno_vreme_uvida") || jsElement.hasChildElement("interval_uvida");
            }
          },
        ],
        mustBeBefore: ["mesto_uvida"],
      },
      interval_uvida:
      {
        menu: [
          {
            caption: "Append an <od>",
            action: Xonomy.newElementChild,
            actionParameter: "<od></od>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("od");
            }
          },
          {
            caption: "Append an <do>",
            action: Xonomy.newElementChild,
            actionParameter: "<do></do>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("do");
            }
          },
          {
            caption: "Delete this <item>",
            action: Xonomy.deleteElement
          }
        ]
      },
      od:
      {
        validate: function (jsElement) {
          if (jsElement.getText() == "") {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        mustBeBefore: ["do"],
        hasText: true,
      },
      do:
      {
        validate: function (jsElement) {
          if (jsElement.getText() == "") {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        hasText: true,
      },
      tacno_vreme_uvida:
      {
        validate: function (jsElement) {
          if (jsElement.getText() == "") {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        menu: [
          {
            caption: "Delete this <item>",
            action: Xonomy.deleteElement
          },
        ],
        hasText: true,
      },
      mesto_uvida:
      {
        menu: [
          {
            caption: "Append an <mesto>",
            action: Xonomy.newElementChild,
            actionParameter: "<mesto></mesto>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("mesto");
            }
          },
          {
            caption: "Append an <ulica>",
            action: Xonomy.newElementChild,
            actionParameter: "<ulica></ulica>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("ulica");
            }
          },
          {
            caption: "Append an <broj>",
            action: Xonomy.newElementChild,
            actionParameter: "<broj></broj>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("broj");
            }
          },
          {
            caption: "Append an <kancelarija>",
            action: Xonomy.newElementChild,
            actionParameter: "<kancelarija></kancelarija>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("kancelarija");
            }
          },
        ]
      },
      kancelarija:
      {
        validate: function (jsElement) {
          if (jsElement.getText() == "") {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        hasText: true,
      },
      informacije_o_posedovanju:
      {
        menu: [
          {
            caption: "Add @status",
            action: Xonomy.newAttribute,
            actionParameter: { name: "status", value: "" },
            hideIf: function (jsElement) {
              return jsElement.hasAttribute("status");
            }
          },
          {
            caption: "Add @poseduje",
            action: Xonomy.newAttribute,
            actionParameter: { name: "poseduje", value: "" },
            hideIf: function (jsElement) {
              return jsElement.hasAttribute("poseduje");
            }
          },
        ],
        attributes: {
          "status": {
            asker: Xonomy.askPicklist,
            askerParameter: [
              { value: "true" },
              { value: "false" }
            ],
            validate: function (jsAttribute) {
              if (jsAttribute.value == "") {
                Xonomy.warnings.push({
                  htmlID: jsAttribute.htmlID,
                  text: "This attribute must not be empty."
                }
                );
              }
            }
          },
          "poseduje": {
            asker: Xonomy.askPicklist,
            askerParameter: [
              { value: "true" },
              { value: "false" }
            ],
            validate: function (jsAttribute) {
              if (jsAttribute.value == "") {
                Xonomy.warnings.push({
                  htmlID: jsAttribute.htmlID,
                  text: "This attribute must not be empty."
                }
                );
              }
            }
          }
        }
      },
      informacije_o_izradi_kopije:
      {
        menu: [
          {
            caption: "Add @status",
            action: Xonomy.newAttribute,
            actionParameter: { name: "status", value: "" },
            hideIf: function (jsElement) {
              return jsElement.hasAttribute("status");
            }
          },
        ],
        attributes: {
          "status": {
            asker: Xonomy.askPicklist,
            askerParameter: [
              { value: "true" },
              { value: "false" }
            ],
            validate: function (jsAttribute) {
              if (jsAttribute.value == "") {
                Xonomy.warnings.push({
                  htmlID: jsAttribute.htmlID,
                  text: "This attribute must not be empty."
                }
                );
              }
            }
          }
        }
      },
      informacije_o_dostavljanju_dokumenta:
      {
        menu: [
          {
            caption: "Add @status",
            action: Xonomy.newAttribute,
            actionParameter: { name: "status", value: "" },
            hideIf: function (jsElement) {
              return jsElement.hasAttribute("status");
            }
          },
        ],
        attributes: {
          "status": {
            asker: Xonomy.askPicklist,
            askerParameter: [
              { value: "true" },
              { value: "false" }
            ],
            validate: function (jsAttribute) {
              if (jsAttribute.value == "") {
                Xonomy.warnings.push({
                  htmlID: jsAttribute.htmlID,
                  text: "This attribute must not be empty."
                }
                );
              }
            }
          }
        }
      },
      dostavljeno:
      {
        validate: function (jsElement) {
          if (!jsElement.hasElements()) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        menu: [
          {
            caption: "Append an <imenovanom>",
            action: Xonomy.newElementChild,
            actionParameter: "<imenovanom>Imenovanom</imenovanom>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("imenovanom");
            }
          },
          {
            caption: "Append an <arhivi>",
            action: Xonomy.newElementChild,
            actionParameter: "<arhivi>Arhivi</arhivi>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("arhivi");
            }
          },
        ]
      },
      imenovanom:
      {
        mustBeBefore: ["arhivi"],
        isReadOnly: true
      },
      arhivi:
      {
        isReadOnly: true
      },
    }
  }

  constructor() { }
}
