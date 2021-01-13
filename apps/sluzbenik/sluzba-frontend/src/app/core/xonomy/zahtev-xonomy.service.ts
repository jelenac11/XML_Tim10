import { Injectable } from '@angular/core';
import { zahtevXSLT } from './xslt/zahtev-xslt';

declare const Xonomy: any;
const xsltProcessor = new XSLTProcessor();
const domParser = new DOMParser();
const xmlSerializer = new XMLSerializer();

const za = `xmlns:za="http://www.projekat.org/zahtev"`;
const common = `xmlns:common="http://www.projekat.org/common"`;

@Injectable({
  providedIn: 'root'
})
export class ZahtevXonomyService {

  public convertZahtevXSLT(zahtevXML: string): string {
    xsltProcessor.reset();
    xsltProcessor.importStylesheet(domParser.parseFromString(zahtevXSLT, 'text/xml'));
    let result = xsltProcessor.transformToDocument(domParser.parseFromString(zahtevXML, 'text/xml'));
    return xmlSerializer.serializeToString(result);
  }

  public zahtevGradjanaSpecification = {
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
      "za:zahtev_gradjana": {
        validate: function (jsElement) {
          if (!jsElement.hasElements()) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        menu: [{
          caption: "Append an <organ>",
          action: Xonomy.newElementChild,
          actionParameter: `<za:organ ${za}/>`,
          hideIf: function (jsElement) {
            return jsElement.hasChildElement("za:organ");
          }
        },
        {
          caption: "Append an <trazilac>",
          action: Xonomy.newElementChild,
          actionParameter: `<za:trazilac ${za}/>`,
          hideIf: function (jsElement) {
            return jsElement.hasChildElement("za:trazilac");
          }
        },
        {
          caption: "Append an <informacije_vezane_za_zahtev>",
          action: Xonomy.newElementChild,
          actionParameter: `<za:informacije_vezane_za_zahtev ${za}/>`,
          hideIf: function (jsElement) {
            return jsElement.hasChildElement("za:informacije_vezane_za_zahtev");
          }
        }
        ],
        attributes: {
        }
      },
      "za:organ": {
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
          if (!jsElement.hasChildElement("common:naziv")) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element needs to have element naziv."
            }
            );
          }
        },
        mustBeBefore: ["za:trazilac", "za:informacije_vezane_za_zahtev"],
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
        ]
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
        mustBeBefore: ["common:ulica", "common:broj", "za:datum"],
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
        menu: [
        ],
        mustBeBefore: ["common:broj"],
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
        menu: [
        ],
        hasText: true
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
      "za:trazilac": {
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
            caption: "Append an <za:lice>",
            action: Xonomy.newElementChild,
            actionParameter: `<za:lice ${za}/>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("za:lice");
            }
          },
          {
            caption: "Append an <drugi_podatak_za_kontakt>",
            action: Xonomy.newElementChild,
            actionParameter: `<za:drugi_podatak_za_kontakt ${za}/>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("za:drugi_podatak_za_kontakt");
            }
          }
        ],
        mustBeBefore: ["za:informacije_vezane_za_zahtev"],
      },
      "za:lice": {
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
            actionParameter: `<common:adresa ${common}><common:mesto ${common}/><common:ulica ${common}/><common:broj ${common}/></common:adresa>`,
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
        mustBeBefore: ["za:drugi_podatak_za_kontakt"],
        attributes: {
          "xsi:type": {
            asker: Xonomy.askPicklist,
            askerParameter: [
              { value: "common:TFizicko_lice" },
              { value: "common:TPravno_lice" }
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
      "za:drugi_podatak_za_kontakt": {
        validate: function (jsElement) {
          if (jsElement.getText() == "") {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        hasText: true
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
        mustBeBefore: ["common:prezime"],
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
      "za:informacije_vezane_za_zahtev": {
        validate: function (jsElement) {
          if (!jsElement.hasElements()) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        menu:
          [
            {
              caption: "Append an <za:tip_zahteva>",
              action: Xonomy.newElementChild,
              actionParameter: `<za:tip_zahteva ${za}></za:tip_zahteva>`,
              hideIf: function (jsElement) {
                return jsElement.hasChildElement("za:tip_zahteva");
              }
            },
            {
              caption: "Append an <za:opis_zahteva>",
              action: Xonomy.newElementChild,
              actionParameter: `<za:opis_zahteva ${za}></za:opis_zahteva>`,
              hideIf: function (jsElement) {
                return jsElement.hasChildElement("za:opis_zahteva");
              }
            },
            {
              caption: "Append an <za:mesto>",
              action: Xonomy.newElementChild,
              actionParameter: `<za:mesto ${za}></za:mesto>`,
              hideIf: function (jsElement) {
                return jsElement.hasChildElement("za:mesto");
              }
            },
            {
              caption: "Append an <za:datum>",
              action: Xonomy.newElementChild,
              actionParameter: `<za:datum ${za}>${new Date().toISOString().slice(0, 10)}</za:datum>`,
              hideIf: function (jsElement) {
                return jsElement.hasChildElement("za:datum");
              }
            },
          ]
      },
      "za:opis_zahteva": {
        validate: function (jsElement) {
          if (jsElement.getText() == "") {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        mustBeBefore: ["za:mesto", "za:datum"],
        hasText: true
      },
      "za:datum": {
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
      "za:tip_zahteva": {
        validate: function (jsElement) {
          if (!jsElement.hasElements()) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        mustBeBefore: ["za:opis_zahteva", "za:mesto", "za:datum"],
        menu: [
          {
            caption: "Append an <obavestenje_posedovanja_informacije>",
            action: Xonomy.newElementChild,
            actionParameter: `<za:obavestenje_posedovanja_informacije ${za}></za:obavestenje_posedovanja_informacije>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("za:obavestenje_posedovanja_informacije");
            }
          },
          {
            caption: "Append an <uvid_u_dokument>",
            action: Xonomy.newElementChild,
            actionParameter: `<za:uvid_u_dokument ${za}></za:uvid_u_dokument>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("za:uvid_u_dokument");
            }
          },
          {
            caption: "Append an <kopiju_dokumenta>",
            action: Xonomy.newElementChild,
            actionParameter: `<za:kopiju_dokumenta ${za}></za:kopiju_dokumenta>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("za:kopiju_dokumenta");
            }
          },
          {
            caption: "Append an <dostavljanje_kopije>",
            action: Xonomy.newElementChild,
            actionParameter: `<za:dostavljanje_kopije ${za}></za:dostavljanje_kopije>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("za:dostavljanje_kopije");
            }
          },
        ]
      },
      "za:obavestenje_posedovanja_informacije": {
        mustBeBefore: ["za:uvid_u_dokument", "za:kopiju_dokumenta", "za:dostavljanje_kopije"]
      },
      "za:uvid_u_dokument": {
        mustBeBefore: ["za:kopiju_dokumenta", "za:dostavljanje_kopije"]
      },
      "za:kopiju_dokumenta": {
        mustBeBefore: ["za:dostavljanje_kopije"]
      },
      "za:dostavljanje_kopije": {
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
            caption: "Append an <posta>",
            action: Xonomy.newElementChild,
            actionParameter: `<za:posta ${za}></za:posta>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("za:posta");
            }
          },
          {
            caption: "Append an <za:faks>",
            action: Xonomy.newElementChild,
            actionParameter: `<za:faks ${za}></za:faks>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("za:faks");
            }
          },
          {
            caption: "Append an <za:eposta>",
            action: Xonomy.newElementChild,
            actionParameter: `<za:eposta ${za}></za:eposta>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("za:eposta");
            }
          },
          {
            caption: "Append an <drugi_nacin>",
            action: Xonomy.newElementChild,
            actionParameter: `<za:drugi_nacin ${za}><za:opis_dostave ${za}></za:opis_dostave></za:drugi_nacin>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("za:drugi_nacin");
            }
          },
        ]
      },
      "za:posta": {
        mustBeBefore: ["za:faks", "za:eposta", "za:drugi_nacin"]
      },
      "za:faks": {
        mustBeBefore: ["za:eposta", "za:drugi_nacin"]
      },
      "za:eposta": {
        mustBeBefore: ["za:drugi_nacin"]
      },
      "za:drugi_nacin": {
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
            caption: "Append an <opis_dostave>",
            action: Xonomy.newElementChild,
            actionParameter: `<za:opis_dostave ${za}></za:opis_dostave>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("za:opis_dostave");
            }
          },
        ]
      },
      "za:opis_dostave": {
        validate: function (jsElement) {
          if (jsElement.getText() == "") {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        hasText: true
      },
      "za:mesto":{
        validate: function (jsElement) {
          if (jsElement.getText() == "") {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        hasText: true
      }
    }
  }

  constructor() { }
}
