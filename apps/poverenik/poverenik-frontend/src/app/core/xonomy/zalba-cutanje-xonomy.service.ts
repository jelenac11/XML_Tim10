import { Injectable } from '@angular/core';
import { zalbaCutanjeXSLT } from './xslt/zalba-na-cutanje-xslt';

declare const Xonomy: any;
const xsltProcessor = new XSLTProcessor();
const domParser = new DOMParser();
const xmlSerializer = new XMLSerializer();

const zc = `xmlns:zc="http://www.projekat.org/zalba_cutanja"`;
const common = `xmlns:common="http://www.projekat.org/common"`;

@Injectable({
  providedIn: 'root'
})
export class ZalbaCutanjeXonomyService {

  public convertZalbaXSLT(zalbaXML: string): string {
    xsltProcessor.reset();
    xsltProcessor.importStylesheet(domParser.parseFromString(zalbaCutanjeXSLT, 'text/xml'));
    let result = xsltProcessor.transformToDocument(domParser.parseFromString(zalbaXML, 'text/xml'));
    return xmlSerializer.serializeToString(result);
  }

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
        attributes: {
          "broj_zahteva": {
            isInvisible: true,
            asker: Xonomy.askString,
            menu: [],
          },
        }
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
        },
        menu: [],
        mustBeBefore: ["zc:organ_protiv_kojeg_je_zalba", "zc:podaci_o_zahtevu", "zc:podaci_o_zalbi"],
        isReadOnly: true,
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
        hasText: true,
        asker: Xonomy.askString,
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
        attributes: {
          "property": {
            isInvisible: true,
          },
          "datatype": {
            isInvisible: true,
          }
        },
        hasText: true,
        asker: Xonomy.askString,
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
        menu: [],
        mustBeBefore: ["common:broj"],
        hasText: true,
        asker: Xonomy.askString,
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
        menu: [],
        hasText: true,
        asker: Xonomy.askString,
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
        menu: [],
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
        attributes: {
          "property": {
            isInvisible: true,
          },
          "content": {
            isInvisible: true,
          }
        },
        isReadOnly: true,
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
        },
        isReadOnly: true,
        hasText: true,
        asker: Xonomy.askString,
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
        },
        menu: [],
        attributes: {
          "property": {
            isInvisible: true,
          },
          "id_podnosioca": {
            isInvisible: true,
          },
          "content": {
            isInvisible: true,
          }
        },
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
        },
        mustBeBefore: ["zc:drugi_podatak_za_kontakt"],
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
        hasText: true,
        asker: Xonomy.askString,
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
        asker: Xonomy.askString,
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
        asker: Xonomy.askString,
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
        hasText: true,
        asker: Xonomy.askString,
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
        attributes: {
          "property": {
            isInvisible: true,
          },
          "datatype": {
            isInvisible: true,
          }
        },
        mustBeBefore: ["zc:mesto", "zc:razlog_zalbe"],
        asker: Xonomy.askString,
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
        asker: Xonomy.askPicklist,
        askerParameter: ["није поступио", "није поступио у целости", "није поступио у законском року"],
        hasText: true,
      }

    }
  }

  constructor() { }
}
