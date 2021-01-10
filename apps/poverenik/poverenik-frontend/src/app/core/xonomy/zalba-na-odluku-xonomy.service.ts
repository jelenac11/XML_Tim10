import { Injectable } from '@angular/core';

declare const Xonomy: any;

const zno = `xmlns:zno="http://www.projekat.org/zalba_na_odluku"`;
const common = `xmlns:common="http://www.projekat.org/common"`;

@Injectable({
  providedIn: 'root'
})
export class ZalbaNaOdlukuXonomyService {

  public zalbaNaOdlukuSpecification = {
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
      "zno:zalba_na_odluku": {
        validate: function (jsElement) {
          if (!jsElement.hasElements()) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        menu: [],
        attributes: {}
      },

      "zno:adresa_poverenika": {
        validate: function (jsElement) {
          if (!jsElement.hasElements()) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
          if (!jsElement.hasChildElement("common:mesto")) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element needs to have element mesto."
            }
            );
          }
          if (!jsElement.hasChildElement("common:ulica") && jsElement.hasChildElement("common:mesto") && jsElement.hasChildElement("common:broj")) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element needs to have element ulica if has element broj."
            }
            );
          }
        },
        menu: [
          {
            caption: "Append an <common:mesto>",
            action: Xonomy.newElementChild,
            actionParameter: `<common:mesto ${common}></common:mesto>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("common:mesto");
            }
          },
          {
            caption: "Append an <common:ulica>",
            action: Xonomy.newElementChild,
            actionParameter: `<common:ulica ${common}></common:ulica>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("common:ulica");
            }
          },
          {
            caption: "Append an <common:broj>",
            action: Xonomy.newElementChild,
            actionParameter: `<common:broj ${common}></common:broj>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("common:broj");
            }
          },
        ],
        mustBeBefore: ["zno:zalilac", "zno:podaci_o_resenju", "zno:datum_zahteva", "zno:podaci_o_zalbi"],
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
        mustBeBefore: ["common:ulica", "common:broj"],
        hasText: true
      },

      "zno:mesto": {
        validate: function (jsElement) {
          if (jsElement.getText() == "") {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        mustBeBefore: ["zno:opis"],
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
        menu: [{
          caption: "Delete this <item>",
          action: Xonomy.deleteElement
        }
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
        menu: [{
          caption: "Delete this <item>",
          action: Xonomy.deleteElement
        }
        ],
        hasText: true
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
          if (!jsElement.hasChildElement("common:mesto")) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element needs to have element <common:mesto>."
            }
            );
          }
          if (!jsElement.hasChildElement("common:ulica") && jsElement.hasChildElement("common:mesto") && jsElement.hasChildElement("common:broj")) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element needs to have element <common:ulica> if has element <common:broj>."
            }
            );
          }
        },
        menu: [
          {
            caption: "Append an <common:mesto>",
            action: Xonomy.newElementChild,
            actionParameter: `<common:mesto ${common}></common:mesto>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("common:mesto");
            }
          },
          {
            caption: "Append an <common:ulica>",
            action: Xonomy.newElementChild,
            actionParameter: `<common:ulica ${common}></common:ulica>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("common:ulica");
            }
          },
          {
            caption: "Append an <common:broj>",
            action: Xonomy.newElementChild,
            actionParameter: `<common:broj ${common}></common:broj>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("common:broj");
            }
          },
        ]
      },

      "zno:zalilac": {
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
              text: "This element needs to have elements <common:ime> and <common:prezime> with attribute xsi:type value common:TFizicko_lice."
            }
            );
          }
          if (jsElement.getAttributeValue("xsi:type", null) == "common:TPravno_lice" && !jsElement.hasChildElement("common:naziv")) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element needs to have elements <common:naziv> with attribute xsi:type value common:TPravno_lice."
            }
            );
          }
          if (!jsElement.hasChildElement("common:adresa")) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element needs to have element <common:adresa>."
            }
            );
          }
        },
        menu: [
          {
            caption: "Append an <common:adresa>",
            action: Xonomy.newElementChild,
            actionParameter: `<common:adresa ${common}><common:mesto ${common}></common:mesto></common:adresa>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("common:adresa") || !jsElement.getAttributeValue("xsi:type", null);
            }
          },
          {
            caption: "Append an <common:naziv>",
            action: Xonomy.newElementChild,
            actionParameter: `<common:naziv ${common}></common:naziv>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("common:naziv") || jsElement.hasChildElement("common:ime") || jsElement.hasChildElement("common:prezime")
                || !jsElement.getAttributeValue("xsi:type", null) || jsElement.getAttributeValue("xsi:type", null) == "common:TFizicko_lice";
            }
          },
          {
            caption: "Append an <common:ime>",
            action: Xonomy.newElementChild,
            actionParameter: `<common:ime ${common}></common:ime>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("common:naziv") || jsElement.hasChildElement("common:ime") || !jsElement.getAttributeValue("xsi:type", null)
                || jsElement.getAttributeValue("xsi:type", null) == "common:TPravno_lice";
            }
          },
          {
            caption: "Append an <common:prezime>",
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

      "zno:podaci_o_resenju": {
        validate: function (jsElement) {
          if (!jsElement.hasElements()) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
          if (!jsElement.hasChildElement("zno:godina")) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element needs to have element <zno:godina>."
            }
            );
          }
          if (!jsElement.hasChildElement("zno:naziv_organa")) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element needs to have element <zno:naziv_organa>."
            }
            );
          }
        },
        menu: [],
        mustBeBefore: ["zno:datum_zahteva"],
      },

      "zno:godina": {
        validate: function (jsElement) {
          if (jsElement.getText() == "") {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
          if (isNaN(jsElement.getText())) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must be a number."
            }
            );
          } else {
            if (+jsElement.getText() < 0) {
              Xonomy.warnings.push({
                htmlID: jsElement.htmlID,
                text: "This element must be a positive number."
              }
              );
            }
          }
        },
        hasText: true,
        mustBeBefore: ["zno:naziv_organa"]
      },

      "zno:naziv_organa": {
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

      "zno:datum_zahteva": {
        validate: function (jsElement) {
          if (jsElement.getText() == "") {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }

          // VALIDIRATI DA LI SE OVAJ DATUM POKLAPA SA DATUMOM ZAHTEVA
          // PRE NEGO STO KRENE DA PISE ZALBU, PONUDIMO MU SAMO ZALBE NA KOJE MOZE DA SE ZALI ZBOG CUTANJA, I POPUNIMO DATUM SAMI AUTOMATSKI

        },
        hasText: true,
        mustBeBefore: ["zno:podaci_o_zalbi"]
      },
      
      "zno:podaci_o_zalbi": {
        validate: function (jsElement) {
          if (!jsElement.hasElements()) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
          if (!jsElement.hasChildElement("zno:podnosilac_zalbe")) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element needs to have element <zno:podnosilac_zalbe>."
            }
            );
          }
          if (!jsElement.hasChildElement("zno:datum_podnosenja")) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element needs to have element <zno:datum_podnosenja>."
            }
            );
          }
          if (!jsElement.hasChildElement("zno:mesto")) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element needs to have element <zno:mesto>."
            }
            );
          }
          if (!jsElement.hasChildElement("zno:opis")) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element needs to have element <zno:opis>."
            }
            );
          }
        },
        menu: []
      },

      "zno:podnosilac_zalbe": {
        validate: function (jsElement) {
          if (!jsElement.hasElements()) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
          if (!jsElement.hasChildElement("zno:lice")) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element needs to have element <zno:lice>."
            }
            );
          }
          if (!jsElement.hasChildElement("zno:drugi_podaci_za_kontakt")) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element needs to have element <zno:drugi_podaci_za_kontakt>."
            }
            );
          }
        },
        menu: [],
        mustBeBefore: ["zno:datum_podnosenja", "zno:mesto", "zno:opis"]
      },

      "zno:lice": {
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
              text: "This element needs to have elements <common:ime> and <common:prezime> with attribute xsi:type value common:TFizicko_lice."
            }
            );
          }
          if (jsElement.getAttributeValue("xsi:type", null) == "common:TPravno_lice" && !jsElement.hasChildElement("common:naziv")) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element needs to have elements <common:naziv> with attribute xsi:type value common:TPravno_lice."
            }
            );
          }
          if (!jsElement.hasChildElement("common:adresa")) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element needs to have element <common:adresa>."
            }
            );
          }
        },
        menu: [
          {
            caption: "Append an <common:adresa>",
            action: Xonomy.newElementChild,
            actionParameter: `<common:adresa ${common}><common:mesto ${common}></common:mesto></common:adresa>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("common:adresa") || !jsElement.getAttributeValue("xsi:type", null);
            }
          },
          {
            caption: "Append an <common:naziv>",
            action: Xonomy.newElementChild,
            actionParameter: `<common:naziv ${common}></common:naziv>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("common:naziv") || jsElement.hasChildElement("common:ime") || jsElement.hasChildElement("common:prezime")
                || !jsElement.getAttributeValue("xsi:type", null) || jsElement.getAttributeValue("xsi:type", null) == "common:TFizicko_lice";
            }
          },
          {
            caption: "Append an <common:ime>",
            action: Xonomy.newElementChild,
            actionParameter: `<common:ime ${common}></common:ime>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("common:naziv") || jsElement.hasChildElement("common:ime") || !jsElement.getAttributeValue("xsi:type", null)
                || jsElement.getAttributeValue("xsi:type", null) == "common:TPravno_lice";
            }
          },
          {
            caption: "Append an <common:prezime>",
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
        mustBeBefore: ["zno:drugi_podatak_za_kontakt"],
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

      "zno:drugi_podaci_za_kontakt": {
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
        hasText: true,
        menu: [
          {
            caption: "Delete this <item>",
            action: Xonomy.deleteElement
          }
        ]
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

      "zno:datum_podnosenja": {
        validate: function (jsElement) {
          if (jsElement.getText() == "") {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        isReadOnly: true,
        mustBeBefore: ["zno:mesto", "zno:opis"]
      },

      "zno:opis": {
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
      }

    }
  }

  constructor() { }

}