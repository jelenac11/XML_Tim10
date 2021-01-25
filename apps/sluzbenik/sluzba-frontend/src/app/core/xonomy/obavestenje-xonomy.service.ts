import { Injectable } from '@angular/core';
import { obavestenjeXSLT } from './xslt/obavestenje-xslt';

declare const Xonomy: any;
const xsltProcessor = new XSLTProcessor();
const domParser = new DOMParser();
const xmlSerializer = new XMLSerializer();

const ob = `xmlns:ob="http://www.projekat.org/obavestenje"`;
const common = `xmlns:common="http://www.projekat.org/common"`;

@Injectable({
  providedIn: 'root'
})
export class ObavestenjeXonomyService {

  public convertObavestenjeXSLT(obavestenjeXML: string): string {
    xsltProcessor.reset();
    xsltProcessor.importStylesheet(domParser.parseFromString(obavestenjeXSLT, 'text/xml'));
    let result = xsltProcessor.transformToDocument(domParser.parseFromString(obavestenjeXML, 'text/xml'));
    return xmlSerializer.serializeToString(result);
  }

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
      "ob:obavestenje": {
        menu: [
          {
            caption: "Append an <informacije_o_obavestenju>",
            action: Xonomy.newElementChild,
            actionParameter: `<ob:informacije_o_obavestenju ${ob}></ob:informacije_o_obavestenju>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("ob:informacije_o_obavestenju");
            }
          },
          {
            caption: "Append an <zahtev>",
            action: Xonomy.newElementChild,
            actionParameter: `<ob:zahtev ${ob}></ob:zahtev>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("ob:zahtev");
            }
          },
          {
            caption: "Append an <odgovor_na_zahtev>",
            action: Xonomy.newElementChild,
            actionParameter: `<ob:odgovor_na_zahtev ${ob}></ob:odgovor_na_zahtev>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("ob:odgovor_na_zahtev");
            }
          },
          {
            caption: "Append an <dostavljeno>",
            action: Xonomy.newElementChild,
            actionParameter: `<ob:dostavljeno ${ob}></ob:dostavljeno>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("ob:dostavljeno");
            }
          },
        ],
        attributes: {
          "id_zahteva": {
            isInvisible: true,
          }
        },
      },
      "ob:informacije_o_obavestenju": {
        menu: [
          {
            caption: "Append an <organ>",
            action: Xonomy.newElementChild,
            actionParameter: `<ob:organ ${ob}></ob:organ>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("ob:organ");
            }
          },
          {
            caption: "Append an <trazilac>",
            action: Xonomy.newElementChild,
            actionParameter: `<ob:trazilac ${ob}></ob:trazilac>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("ob:trazilac");
            }
          },
          {
            caption: "Append an <datum_obavestenja>",
            action: Xonomy.newElementChild,
            actionParameter: `<ob:datum_obavestenja ${ob}>${new Date().toISOString().slice(0, 10)}</ob:datum_obavestenja>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("ob:datum_obavestenja");
            }
          },
        ],
        mustBeBefore: ["ob:zahtev", "ob:odgovor_na_zahtev", "ob:dostavljeno"]
      },
      "ob:organ": {
        validate: function (jsElement) {
          if (!jsElement.hasElements()) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
          if (!jsElement.hasChildElement("common:adresa")) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element needs to have element adresa."
            }
            );
          }
        },
        mustBeBefore: ["ob:trazilac", "ob:datum_obavestenja"],
        menu: [
          {
            caption: "Append an <adresa>",
            action: Xonomy.newElementChild,
            actionParameter: `<common:adresa ${common}></common:adresa>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("common:adresa");
            }
          },
          {
            caption: "Append an <naziv>",
            action: Xonomy.newElementChild,
            actionParameter: `<common:naziv ${common}></common:naziv>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("common:naziv");
            }
          }
        ],
        attributes: {
          "property": {
            isInvisible: true,
          },
          "content": {
            isInvisible: true,
          }
        },
        isReadOnly: true
      },
      "common:adresa": {
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
            actionParameter: `<common:mesto ${common}></common:mesto>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("common:mesto");
            }
          },
          {
            caption: "Append an <ulica>",
            action: Xonomy.newElementChild,
            actionParameter: `<common:ulica ${common}></common:ulica>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("common:ulica");
            }
          },
          {
            caption: "Append an <broj>",
            action: Xonomy.newElementChild,
            actionParameter: `<common:broj ${common}></common:broj>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("common:broj");
            }
          },
        ],
        mustBeBefore: ["common:naziv", "common:ime", "common:prezime"],
      },
      "common:mesto": {
        validate: function (jsElement) {
          if (jsElement.getText() == "") {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        mustBeBefore: ["common:ulica", "common:broj", "ob:datum", "ob:kancelarija"],
        hasText: true
      },
      "common:ulica": {
        validate: function (jsElement) {
          if (jsElement.getText() == "") {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        mustBeBefore: ["common:broj", "ob:kancelarija"],
        hasText: true
      },
      "common:broj": {
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
        mustBeBefore: ["ob:kancelarija"]
      },
      "common:naziv": {
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
      "ob:trazilac": {
        attributes: {
          "property": {
            isInvisible: true,
          },
          "content": {
            isInvisible: true,
          }
        },
        isReadOnly: true
      },
      "ob:lice": {
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
          if (jsElement.getAttributeValue("xsi:type", null) == "common:TFizicko_lice" && (!jsElement.hasChildElement("common:ime") || !jsElement.hasChildElement("common:prezime"))) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element needs to have elements ime and prezime with attribute xsi:type value TFizicko_lice."
            }
            );
          }
          if (jsElement.getAttributeValue("xsi:type", null) == "common:TPravno_lice" && !jsElement.hasChildElement("common:naziv")) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element needs to have elements naziv with attribute xsi:type value TPravno_lice."
            }
            );
          }
          if (!jsElement.hasChildElement("common:adresa")) {
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
            actionParameter: `<common:adresa ${common}><common:mesto ${common}></common:mesto><common:ulica ${common}/><common:broj ${common}></common:adresa>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("common:adresa") || !jsElement.getAttributeValue("xsi:type", null);
            }
          },
          {
            caption: "Append an <naziv>",
            action: Xonomy.newElementChild,
            actionParameter: `<common:naziv ${common}></common:naziv>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("common:naziv") || jsElement.hasChildElement("common:ime") || jsElement.hasChildElement("common:prezime")
                || !jsElement.getAttributeValue("xsi:type", null) || jsElement.getAttributeValue("xsi:type", null) == "common:TFizicko_lice";
            }
          },
          {
            caption: "Append an <ime>",
            action: Xonomy.newElementChild,
            actionParameter: `<common:ime ${common}></common:ime>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("common:naziv") || jsElement.hasChildElement("common:ime") || !jsElement.getAttributeValue("xsi:type", null)
                || jsElement.getAttributeValue("xsi:type", null) == "common:TPravno_lice";
            }
          },
          {
            caption: "Append an <prezime>",
            action: Xonomy.newElementChild,
            actionParameter: `<common:prezime ${common}></common:prezime>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("common:naziv") || jsElement.hasChildElement("common:prezime") || !jsElement.getAttributeValue("xsi:type", null)
                || jsElement.getAttributeValue("xsi:type", null) == "common:TPravno_lice";
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
        mustBeBefore: ["ob:datum_obavestenja"],
        attributes: {
          "xsi:type": {
            isInvisible: true
          }
        },
        isReadOnly: true
      },
      "common:ime": {
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
        mustBeBefore: ["ob:prezime"],
        menu: [
          {
            caption: "Delete this <item>",
            action: Xonomy.deleteElement
          }
        ]
      },
      "common:prezime": {
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
      "ob:datum_obavestenja": {
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
      "ob:zahtev": {
        mustBeBefore: ["ob:odgovor_na_zahtev", "ob:dostavljeno"],
        menu: [
          {
            caption: "Append an <datum_trazenja_informacija>",
            action: Xonomy.newElementChild,
            actionParameter: `<ob:datum_trazenja_informacija ${ob}></ob:datum_trazenja_informacija>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("ob:datum_trazenja_informacija");
            }
          },
          {
            caption: "Append an <opis_trazene_informacije>",
            action: Xonomy.newElementChild,
            actionParameter: `<ob:opis_trazene_informacije ${ob}></ob:opis_trazene_informacije>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("ob:opis_trazene_informacije");
            }
          },
        ]
      },
      "ob:datum_trazenja_informacija":
      {
        isReadOnly: true
      },
      "ob:opis_trazene_informacije":
      {
        isReadOnly: true
      },
      "ob:odgovor_na_zahtev":
      {
        menu: [
          {
            caption: "Append an <uplata_troskova>",
            action: Xonomy.newElementChild,
            actionParameter: `<ob:uplata_troskova ${ob}><ob:uplatnica ${ob}><ob:primalac ${ob}></ob:primalac><ob:racun ${ob}></ob:racun><ob:iznos ${ob}></ob:iznos><ob:poziv_na_broj ${ob}></ob:poziv_na_broj></ob:uplatnica><ob:troskovi ${ob}><ob:trosak ${ob}><ob:stavka ${ob}></ob:stavka><ob:kolicina ${ob}></ob:kolicina><ob:jedinicna_cijena ${ob}></ob:jedinicna_cijena></ob:trosak></ob:troskovi></ob:uplata_troskova>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("ob:uplata_troskova");
            }
          },
          {
            caption: "Append an <zahtevi>",
            action: Xonomy.newElementChild,
            actionParameter: `<ob:zahtevi ${ob}></ob:zahtevi>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("ob:zahtevi");
            }
          },
        ],
        mustBeBefore: ["ob:dostavljeno"]
      },
      "ob:uplata_troskova":
      {
        menu: [
          {
            caption: "Append an <uplatnica>",
            action: Xonomy.newElementChild,
            actionParameter: `<ob:uplatnica ${ob}></ob:uplatnica>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("ob:uplatnica");
            }
          },
          {
            caption: "Append an <troskovi>",
            action: Xonomy.newElementChild,
            actionParameter: `<ob:troskovi ${ob}></ob:troskovi>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("ob:troskovi");
            }
          },
        ],
        mustBeBefore: ["ob:zahtevi"]
      },
      "ob:uplatnica":
      {
        menu: [
          {
            caption: "Append an <primalac>",
            action: Xonomy.newElementChild,
            actionParameter: `<ob:primalac ${ob}></ob:primalac>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("ob:primalac");
            }
          },
          {
            caption: "Append an <racun>",
            action: Xonomy.newElementChild,
            actionParameter: `<ob:racun ${ob}></ob:racun>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("ob:racun");
            }
          },
          {
            caption: "Append an <iznos>",
            action: Xonomy.newElementChild,
            actionParameter: `<ob:iznos ${ob}></ob:iznos>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("ob:iznos");
            }
          },
          {
            caption: "Append an <poziv_na_broj>",
            action: Xonomy.newElementChild,
            actionParameter: `<ob:poziv_na_broj ${ob}></ob:poziv_na_broj>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("ob:poziv_na_broj");
            }
          },
        ],
        mustBeBefore: ["ob:troskovi"]
      },
      "ob:primalac":
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
        mustBeBefore: ["ob:racun", "ob:iznos", "ob:poziv_na_broj"]
      },
      "ob:racun":
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
        mustBeBefore: ["ob:iznos", "ob:poziv_na_broj"]
      },
      "ob:iznos":
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
        mustBeBefore: ["ob:poziv_na_broj"]
      },
      "ob:poziv_na_broj":
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
        mustBeBefore: ["ob:troskovi"]
      },
      "ob:troskovi":
      {
        menu: [
          {
            caption: "Append an <trosak>",
            action: Xonomy.newElementChild,
            actionParameter: `<ob:trosak ${ob}><ob:stavka ${ob}></ob:stavka><ob:kolicina ${ob}></ob:kolicina><ob:jedinicna_cijena ${ob}></ob:jedinicna_cijena></ob:trosak>`
          },
        ]
      },
      "ob:trosak":
      {
        menu: [
          {
            caption: "Append an <stavka>",
            action: Xonomy.newElementChild,
            actionParameter: `<ob:stavka ${ob}></ob:stavka>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("ob:stavka");
            }
          },
          {
            caption: "Append an <kolicina>",
            action: Xonomy.newElementChild,
            actionParameter: `<ob:kolicina ${ob}></ob:kolicina>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("ob:kolicina");
            }
          },
          {
            caption: "Append an <jedinicna_cijena>",
            action: Xonomy.newElementChild,
            actionParameter: `<ob:jedinicna_cijena ${ob}></ob:jedinicna_cijena>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("ob:jedinicna_cijena");
            }
          },
        ]
      },
      "ob:stavka": {
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
        mustBeBefore: ["ob:kolicina", "ob:jedinicna_cijena"],
        asker: Xonomy.askPicklist,
        askerParameter: ["CD", "A4 papir", "A5 papir", "USB", "Skeniranje", "Dostava"],
      },
      "ob:kolicina": {
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
        mustBeBefore: ["ob:jedinicna_cijena"]
      },
      "ob:jedinicna_cijena": {
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
      "ob:zahtevi":
      {
      },
      "ob:informacije_o_uvidu":
      {
        validate: function (jsElement) {
          if (jsElement.getAttributeValue("status", null) == "true" && !jsElement.hasElements()) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty when @status is 'true'."
            }
            );
          }
          if (jsElement.getAttributeValue("status", null) == "true" && !(jsElement.hasChildElement("ob:datum_uvida") && jsElement.hasChildElement("ob:vreme_uvida") && jsElement.hasChildElement("ob:mesto_uvida"))) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must have <mesto_uvida>, <vreme_uvida> and <datum_uvida> when @status is 'true'."
            }
            );
          }
          if (jsElement.getAttributeValue("status", null) == "false" && (jsElement.hasChildElement("ob:datum_uvida") || jsElement.hasChildElement("ob:vreme_uvida") || jsElement.hasChildElement("ob:mesto_uvida"))) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must be empty when @status is 'false'."
            }
            );
          }
        },
        menu: [
          {
            caption: "Append an <datum_uvida>",
            action: Xonomy.newElementChild,
            actionParameter: `<ob:datum_uvida ${ob}></ob:datum_uvida>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("ob:datum_uvida") || jsElement.getAttributeValue("status", null) == "false";
            }
          },
          {
            caption: "Append an <vreme_uvida>",
            action: Xonomy.newElementChild,
            actionParameter: `<ob:vreme_uvida ${ob}></ob:vreme_uvida>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("ob:vreme_uvida") || jsElement.getAttributeValue("status", null) == "false";
            }
          },
          {
            caption: "Append an <mesto_uvida>",
            action: Xonomy.newElementChild,
            actionParameter: `<ob:mesto_uvida ${ob}><common:mesto ${common}/><common:ulica ${common}/><common:broj ${common}/><ob:kancelarija ${ob}/></ob:mesto_uvida>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("ob:mesto_uvida") || jsElement.getAttributeValue("status", null) == "false";
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
      "ob:datum_uvida":
      {
        menu: [
          {
            caption: "Delete this <item>",
            action: Xonomy.deleteElement
          },
        ],
        validate: function (jsElement) {
          if (jsElement.getText() == "") {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        mustBeBefore: ["ob:vreme_uvida", "ob:mesto_uvida"],
        hasText: true,
      },
      "ob:vreme_uvida":
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
            caption: "Delete this <item>",
            action: Xonomy.deleteElement
          },
          {
            caption: "Append an <interval_uvida>",
            action: Xonomy.newElementChild,
            actionParameter: `<ob:interval_uvida ${ob}><ob:od ${ob}/><ob:do ${ob}/></ob:interval_uvida>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("ob:interval_uvida") || jsElement.hasChildElement("ob:tacno_vreme_uvida");
            }
          },
          {
            caption: "Append an <tacno_vreme_uvida>",
            action: Xonomy.newElementChild,
            actionParameter: `<ob:tacno_vreme_uvida ${ob}></ob:tacno_vreme_uvida>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("ob:tacno_vreme_uvida") || jsElement.hasChildElement("ob:interval_uvida");
            }
          },
        ],
        mustBeBefore: ["ob:mesto_uvida"],
      },
      "ob:interval_uvida":
      {
        menu: [
          {
            caption: "Append an <od>",
            action: Xonomy.newElementChild,
            actionParameter: `<ob:od ${ob}></ob:od>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("ob:od");
            }
          },
          {
            caption: "Append an <do>",
            action: Xonomy.newElementChild,
            actionParameter: `<ob:do ${ob}></ob:do>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("ob:do");
            }
          },
          {
            caption: "Delete this <item>",
            action: Xonomy.deleteElement
          }
        ]
      },
      "ob:od":
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
        mustBeBefore: ["ob:do"],
        hasText: true,
      },
      "ob:do":
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
      "ob:tacno_vreme_uvida":
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
      "ob:mesto_uvida":
      {
        menu: [
          {
            caption: "Delete this <item>",
            action: Xonomy.deleteElement
          },
          {
            caption: "Append an <mesto>",
            action: Xonomy.newElementChild,
            actionParameter: `<common:mesto ${common}></common:mesto>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("common:mesto");
            }
          },
          {
            caption: "Append an <ulica>",
            action: Xonomy.newElementChild,
            actionParameter: `<common:ulica ${common}></common:ulica>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("common:ulica");
            }
          },
          {
            caption: "Append an <broj>",
            action: Xonomy.newElementChild,
            actionParameter: `<common:broj ${common}></common:broj>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("common:broj");
            }
          },
          {
            caption: "Append an <kancelarija>",
            action: Xonomy.newElementChild,
            actionParameter: `<ob:kancelarija ${ob}></ob:kancelarija>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("ob:kancelarija");
            }
          },
        ]
      },
      "ob:kancelarija":
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
      "ob:informacije_o_posedovanju":
      {
        validate: function (jsElement) {
          if (jsElement.getAttributeValue("status", null) == "true" && !jsElement.hasAttribute("poseduje")) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must have attribute @poseduje when @status is 'true'."
            }
            );
          }
          if (jsElement.getAttributeValue("status", null) == "false" && jsElement.hasAttribute("poseduje")) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not have attribute @poseduje when @status is 'false'."
            }
            );
          }
        },
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
              return jsElement.hasAttribute("poseduje") || jsElement.getAttributeValue("status", null) == "false";
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
            menu: [{
              caption: "Delete attribute @poseduje",
              action: Xonomy.deleteAttribute
            }],
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
      "ob:informacije_o_izradi_kopije":
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
      "ob:informacije_o_dostavljanju_dokumenta":
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
      "ob:dostavljeno":
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
            actionParameter: `<ob:imenovanom ${ob}>Imenovanom</ob:imenovanom>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("ob:imenovanom");
            }
          },
          {
            caption: "Append an <arhivi>",
            action: Xonomy.newElementChild,
            actionParameter: `<ob:arhivi ${ob}>Arhivi</ob:arhivi>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("ob:arhivi");
            }
          },
        ]
      },
      "ob:imenovanom":
      {
        mustBeBefore: ["ob:arhivi"],
        isReadOnly: true
      },
      "ob:arhivi":
      {
        isReadOnly: true
      },
    }
  }

  constructor() { }
}
