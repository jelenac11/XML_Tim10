import { Injectable } from '@angular/core';

declare const Xonomy: any;

@Injectable({
  providedIn: 'root'
})
export class ZahtevXonomyService {

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
      zahtev_gradjana: {
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
          caption: "Append an <informacije_vezane_za_zahtev>",
          action: Xonomy.newElementChild,
          actionParameter: "<informacije_vezane_za_zahtev></informacije_vezane_za_zahtev>",
          hideIf: function (jsElement) {
            return jsElement.hasChildElement("informacije_vezane_za_zahtev");
          }
        }
        ],
        attributes: {
        }
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
          if (!jsElement.hasChildElement("naziv")) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element needs to have element naziv."
            }
            );
          }
        },
        mustBeBefore: ["trazilac", "informacije_vezane_za_zahtev"],
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
        ]
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
        mustBeBefore: ["ulica", "broj", "datum"],
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
        mustBeBefore: ["broj"],
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
        hasText: true
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
            caption: "Append an <lice>",
            action: Xonomy.newElementChild,
            actionParameter: "<lice></lice>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("lice");
            }
          },
          {
            caption: "Append an <drugi_podatak_za_kontakt>",
            action: Xonomy.newElementChild,
            actionParameter: "<drugi_podatak_za_kontakt></drugi_podatak_za_kontakt>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("drugi_podatak_za_kontakt");
            }
          }
        ],
        mustBeBefore: ["informacije_vezane_za_zahtev"],
      },
      lice: {
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
        mustBeBefore: ["drugi_podatak_za_kontakt"],
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
        }
      },
      drugi_podatak_za_kontakt: {
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
      informacije_vezane_za_zahtev: {
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
              caption: "Append an <tip_zahteva>",
              action: Xonomy.newElementChild,
              actionParameter: "<tip_zahteva></tip_zahteva>",
              hideIf: function (jsElement) {
                return jsElement.hasChildElement("tip_zahteva");
              }
            },
            {
              caption: "Append an <opis_zahteva>",
              action: Xonomy.newElementChild,
              actionParameter: "<opis_zahteva></opis_zahteva>",
              hideIf: function (jsElement) {
                return jsElement.hasChildElement("opis_zahteva");
              }
            },
            {
              caption: "Append an <mesto>",
              action: Xonomy.newElementChild,
              actionParameter: "<mesto></mesto>",
              hideIf: function (jsElement) {
                return jsElement.hasChildElement("mesto");
              }
            },
            {
              caption: "Append an <datum>",
              action: Xonomy.newElementChild,
              actionParameter: `<datum>${new Date().toISOString().slice(0, 10)}</datum>`,
              hideIf: function (jsElement) {
                return jsElement.hasChildElement("datum");
              }
            },
          ]
      },
      opis_zahteva: {
        validate: function (jsElement) {
          if (jsElement.getText() == "") {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        mustBeBefore: ["mesto", "datum"],
        hasText: true
      },
      datum: {
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
      tip_zahteva: {
        validate: function (jsElement) {
          if (!jsElement.hasElements()) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        mustBeBefore: ["opis_zahteva", "mesto", "datum"],
        menu: [
          {
            caption: "Append an <obavestenje_posedovanja_informacije>",
            action: Xonomy.newElementChild,
            actionParameter: "<obavestenje_posedovanja_informacije></obavestenje_posedovanja_informacije>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("obavestenje_posedovanja_informacije");
            }
          },
          {
            caption: "Append an <uvid_u_dokument>",
            action: Xonomy.newElementChild,
            actionParameter: "<uvid_u_dokument></uvid_u_dokument>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("uvid_u_dokument");
            }
          },
          {
            caption: "Append an <kopiju_dokumenta>",
            action: Xonomy.newElementChild,
            actionParameter: "<kopiju_dokumenta></kopiju_dokumenta>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("kopiju_dokumenta");
            }
          },
          {
            caption: "Append an <dostavljanje_kopije>",
            action: Xonomy.newElementChild,
            actionParameter: "<dostavljanje_kopije></dostavljanje_kopije>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("dostavljanje_kopije");
            }
          },
        ]
      },
      obavestenje_posedovanja_informacije: {
        mustBeBefore: ["uvid_u_dokument", "kopiju_dokumenta", "dostavljanje_kopije"]
      },
      uvid_u_dokument: {
        mustBeBefore: ["kopiju_dokumenta", "dostavljanje_kopije"]
      },
      kopiju_dokumenta: {
        mustBeBefore: ["dostavljanje_kopije"]
      },
      dostavljanje_kopije: {
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
            actionParameter: "<posta></posta>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("posta");
            }
          },
          {
            caption: "Append an <faks>",
            action: Xonomy.newElementChild,
            actionParameter: "<faks></faks>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("faks");
            }
          },
          {
            caption: "Append an <eposta>",
            action: Xonomy.newElementChild,
            actionParameter: "<eposta></eposta>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("eposta");
            }
          },
          {
            caption: "Append an <drugi_nacin>",
            action: Xonomy.newElementChild,
            actionParameter: "<drugi_nacin><opis_dostave></opis_dostave></drugi_nacin>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("drugi_nacin");
            }
          },
        ]
      },
      posta: {
        mustBeBefore: ["faks", "eposta", "drugi_nacin"]
      },
      faks: {
        mustBeBefore: ["eposta", "drugi_nacin"]
      },
      eposta: {
        mustBeBefore: ["drugi_nacin"]
      },
      drugi_nacin: {
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
            actionParameter: "<opis_dostave></opis_dostave>",
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("opis_dostave");
            }
          },
        ]
      },
      opis_dostave: {
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
