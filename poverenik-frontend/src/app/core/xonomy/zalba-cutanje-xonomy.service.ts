import { Injectable } from '@angular/core';

declare const Xonomy: any;

const zc = `xmlns:zc="http://www.projekat.org/zalba_cutanja"`;
const common = `xmlns:common="http://www.projekat.org/common"`;

@Injectable({
  providedIn: 'root'
})
export class ZalbaCutanjeXonomyService {

  public zalbaCutanjeSpecification = {
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
      "zc:zalba_na_cutanje": {
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

      "zc:adresa_poverenika": {
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
        mustBeBefore: ["zc:organ_protiv_kojeg_je_zalba", "zc:podaci_o_zahtevu", "zc:podaci_o_zalbi"],
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

      "zc:mesto": {
        validate: function (jsElement) {
          if (jsElement.getText() == "") {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
        },
        mustBeBefore: ["zc:razlog_zalbe"],
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

      "zc:organ_protiv_kojeg_je_zalba": {
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
              text: "This element needs to have element <common:adresa>."
            }
            );
          }
          if (!jsElement.hasChildElement("common:naziv")) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element needs to have element <common:naziv>."
            }
            );
          }
        },
        menu: [
          {
            caption: "Append an <common:naziv>",
            action: Xonomy.newElementChild,
            actionParameter: `<common:naziv ${common}/>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("common:naziv");
            }
          }
        ],
        mustBeBefore: ["zc:podaci_o_zahtevu", "zc:podaci_o_zalbi"]
      },

      "zc:podaci_o_zahtevu": {
        validate: function (jsElement) {
          if (!jsElement.hasElements()) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
          if (!jsElement.hasChildElement("zc:informacije")) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element needs to have element <zc:informacije>."
            }
            );
          }
          if (!jsElement.hasChildElement("zc:datum")) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element needs to have element <zc:datum>."
            }
            );
          }
          if (!jsElement.hasChildElement("zc:zahtevi")) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element needs to have element <zc:zahtevi>."
            }
            );
          }
        },
        menu: [],
        mustBeBefore: ["zc:podaci_o_zalbi"],
      },

      "zc:informacije": {
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

      "zc:datum": {
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
        mustBeBefore: ["zc:zahtevi"]
      },

      "zc:zahtevi": {
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
            caption: "Append an <zc:uvid>",
            action: Xonomy.newElementChild,
            actionParameter: `<zc:uvid ${zc}/>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("zc:uvid");
            }
          },
          {
            caption: "Append an <zc:kopija>",
            action: Xonomy.newElementChild,
            actionParameter: `<zc:kopija ${zc}/>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("zc:kopija");
            }
          },
          {
            caption: "Append an <zc:dostava>",
            action: Xonomy.newElementChild,
            actionParameter: `<zc:dostava ${zc}/>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("zc:dostava");
            }
          },
          {
            caption: "Append an <zc:posedovanje>",
            action: Xonomy.newElementChild,
            actionParameter: `<zc:posedovanje ${zc}/>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement("zc:posedovanje");
            }
          },
        ]
      },

      "zc:uvid": {
        menu: [{
          caption: "Delete this <item>",
          action: Xonomy.deleteElement
        }
        ],
        mustBeBefore: ["zc:kopija", "zc:dostava", "zc:posedovanje"]
      },

      "zc:kopija": {
        menu: [{
          caption: "Delete this <item>",
          action: Xonomy.deleteElement
        }
        ],
        mustBeBefore: ["zc:dostava", "zc:posedovanje"]
      },

      "zc:dostava": {
        menu: [{
          caption: "Delete this <item>",
          action: Xonomy.deleteElement
        }
        ],
        mustBeBefore: ["zc:posedovanje"]
      },

      "zc:posedovanje": {
        menu: [{
          caption: "Delete this <item>",
          action: Xonomy.deleteElement
        }
        ],
      },

      "zc:podaci_o_zalbi": {
        validate: function (jsElement) {
          if (!jsElement.hasElements()) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
          if (!jsElement.hasChildElement("zc:podnosilac_zalbe")) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element needs to have element <zc:podnosilac_zalbe>."
            }
            );
          }
          if (!jsElement.hasChildElement("zc:datum_podnosenja")) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element needs to have element <zc:datum_podnosenja>."
            }
            );
          }
          if (!jsElement.hasChildElement("zc:mesto")) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element needs to have element <zc:mesto>."
            }
            );
          }
          if (!jsElement.hasChildElement("zc:razlog_zalbe")) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element needs to have element <zc:razlog_zalbe>."
            }
            );
          }
        },
        menu: []
      },

      "zc:podnosilac_zalbe": {
        validate: function (jsElement) {
          if (!jsElement.hasElements()) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element must not be empty."
            }
            );
          }
          if (!jsElement.hasChildElement("zc:lice")) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element needs to have element <zc:lice>."
            }
            );
          }
          if (!jsElement.hasChildElement("zc:drugi_podaci_za_kontakt")) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: "This element needs to have element <zc:drugi_podaci_za_kontakt>."
            }
            );
          }
        },
        menu: [],
        mustBeBefore: ["zc:datum_podnosenja", "zc:mesto", "zc:razlog_zalbe"]
      },

      "zc:lice": {
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
        mustBeBefore: ["zc:drugi_podatak_za_kontakt"],
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

      "zc:drugi_podaci_za_kontakt": {
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

      "zc:datum_podnosenja": {
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
        mustBeBefore: ["zc:mesto", "zc:razlog_zalbe"]
      },

      "zc:razlog_zalbe": {
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
