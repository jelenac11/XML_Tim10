import { Injectable } from '@angular/core';
import { resenjeXSLT } from './xslt/resenje-xslt';

declare const Xonomy: any;
const xsltProcessor = new XSLTProcessor();
const domParser = new DOMParser();
const xmlSerializer = new XMLSerializer();

const res = `xmlns:res='http://www.projekat.org/resenje'`;
const common = `xmlns:common='http://www.projekat.org/common'`;

@Injectable({
  providedIn: 'root'
})
export class ResenjaXonomyService {

  public convertResenjeXSLT(resenjeXML: string): string {
    xsltProcessor.reset();
    xsltProcessor.importStylesheet(domParser.parseFromString(resenjeXSLT, 'text/xml'));
    const result = xsltProcessor.transformToDocument(domParser.parseFromString(resenjeXML, 'text/xml'));
    return xmlSerializer.serializeToString(result);
  }
// tslint:disable
  public resenjeSpecification = {
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
        if (jsChild.type === 'element') { //if element
          this.validate(jsChild); //recursion
        }
      }
    },
    elements: {
      'res:odluka_poverioca': {
        validate: function (jsElement) {
          if (!jsElement.hasElements()) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: 'This element must not be empty.'
            }
            );
          }
        },
        menu: [{
          caption: 'Append an <opis_žalbe>',
          action: Xonomy.newElementChild,
          actionParameter: `<res:opis_žalbe ${res}/>`,
          hideIf: function (jsElement) {
            return jsElement.hasChildElement('res:opis_žalbe');
          }
        },
        {
          caption: 'Append an <rešenja>',
          action: Xonomy.newElementChild,
          actionParameter: `<res:rešenja ${res}/>`,
          hideIf: function (jsElement) {
            return jsElement.hasChildElement('res:rešenja');
          }
        },
        {
          caption: 'Append an <obrazloženje>',
          action: Xonomy.newElementChild,
          actionParameter: `<res:obrazloženje ${res}/>`,
          hideIf: function (jsElement) {
            return jsElement.hasChildElement('res:obrazloženje');
          }
        },
        {
          caption: 'Append an <uputstvo>',
          action: Xonomy.newElementChild,
          actionParameter: `<res:uputstvo ${res}/>`,
          hideIf: function (jsElement) {
            return jsElement.hasChildElement('res:uputstvo');
          }
        },
        {
          caption: 'Append an <datum_rešenja>',
          action: Xonomy.newElementChild,
          actionParameter: `<res:datum_rešenja ${res}/>`,
          hideIf: function (jsElement) {
            return jsElement.hasChildElement('res:datum_rešenja');
          }
        },
        {
          caption: 'Append an <poverenik>',
          action: Xonomy.newElementChild,
          actionParameter: `<res:poverenik ${res}/>`,
          hideIf: function (jsElement) {
            return jsElement.hasChildElement('res:poverenik');
          }
        }
        ],
        attributes: {
        }
      },
      'res:opis_žalbe': {
        validate: function (jsElement) {
          if (!jsElement.hasElements()) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: 'This element must not be empty.'
            }
            );
          }
        },
        menu: [{
          caption: 'Append an <žalioc>',
          action: Xonomy.newElementChild,
          actionParameter: `<res:žalioc ${res}/>`,
          hideIf: function (jsElement) {
            return jsElement.hasChildElement('res:žalioc');
          }
        },
        {
          caption: 'Append an <organ>',
          action: Xonomy.newElementChild,
          actionParameter: `<res:organ ${res}/>`,
          hideIf: function (jsElement) {
            return jsElement.hasChildElement('res:organ');
          }
        },
        {
          caption: "Append an <datum_žalbe>",
          action: Xonomy.newElementChild,
          actionParameter: `<za:datum_žalbe ${res}>${new Date().toISOString().slice(0, 10)}</za:datum_žalbe>`,
          hideIf: function (jsElement) {
            return jsElement.hasChildElement("za:datum_žalbe");
          }
        },
        {
          caption: 'Append an <ceo_opis>',
          action: Xonomy.newElementChild,
          actionParameter: `<res:ceo_opis ${res}/>`,
          hideIf: function (jsElement) {
            return jsElement.hasChildElement('res:ceo_opis');
          }
        }
        ],
        attributes: {
        }
      },
      'res:organ': {
        validate: function (jsElement) {
          if (!jsElement.hasElements()) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: 'This element must not be empty.'
            }
            );
          }
          if (!jsElement.hasChildElement('common:adresa')) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: 'This element needs to have element adresa.'
            }
            );
          }
          if (!jsElement.hasChildElement('common:naziv')) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: 'This element needs to have element naziv.'
            }
            );
          }
        },
        menu: [
          {
            caption: 'Append an <adresa>',
            action: Xonomy.newElementChild,
            actionParameter: `<common:adresa ${common}></common:adresa>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement('common:adresa');
            }
          },
          {
            caption: 'Append an <naziv>',
            action: Xonomy.newElementChild,
            actionParameter: `<common:naziv ${common}></common:naziv>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement('common:naziv');
            }
          }
        ]
      },
      'common:adresa': {
        validate: function (jsElement) {
          if (!jsElement.hasElements()) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: 'This element must not be empty.'
            }
            );
          }
        },
        menu: [
          {
            caption: 'Append an <mesto>',
            action: Xonomy.newElementChild,
            actionParameter: `<common:mesto ${common}></common:mesto>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement('common:mesto');
            }
          },
          {
            caption: 'Append an <ulica>',
            action: Xonomy.newElementChild,
            actionParameter: `<common:ulica ${common}></common:ulica>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement('common:ulica');
            }
          },
          {
            caption: 'Append an <broj>',
            action: Xonomy.newElementChild,
            actionParameter: `<common:broj ${common}></common:broj>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement('common:broj');
            }
          },
        ],
      },
      'common:mesto': {
        validate: function (jsElement) {
          if (jsElement.getText() === '') {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: 'This element must not be empty.'
            }
            );
          }
        },
        hasText: true
      },
      'common:ulica': {
        validate: function (jsElement) {
          if (jsElement.getText() === '') {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: 'This element must not be empty.'
            }
            );
          }
        },
        menu: [
        ],
        mustBeBefore: ['common:broj'],
        hasText: true
      },
      'common:broj': {
        validate: function (jsElement) {
          if (jsElement.getText() === '') {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: 'This element must not be empty.'
            }
            );
          }
        },
        menu: [
        ],
        hasText: true
      },
      'common:naziv': {
        validate: function (jsElement) {
          if (jsElement.getText() === '') {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: 'This element must not be empty.'
            }
            );
          }
        },
        menu: [{
          caption: 'Delete this <item>',
          action: Xonomy.deleteElement
        }
        ],
        hasText: true
      },
      'res:žalioc': {
        validate: function (jsElement) {
          if (!jsElement.hasElements()) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: 'This element must not be empty.'
            }
            );
          }
          if (!jsElement.hasChildElement('common:adresa')) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: 'This element needs to have element adresa.'
            }
            );
          }
        },
        menu: [
          {
            caption: 'Append an <adresa>',
            action: Xonomy.newElementChild,
            actionParameter: `<common:adresa ${common}><common:mesto ${common}/><common:ulica ${common}/><common:broj ${common}/></common:adresa>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement('common:adresa');
            }
          },
          {
            caption: 'Append an <ime>',
            action: Xonomy.newElementChild,
            actionParameter: `<common:ime ${common}></common:ime>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement('common:naziv') || jsElement.hasChildElement('common:ime') || !jsElement.getAttributeValue('xsi:type', null)
                || jsElement.getAttributeValue('xsi:type', null) === 'common:TPravno_lice';
            }
          },
          {
            caption: 'Append an <prezime>',
            action: Xonomy.newElementChild,
            actionParameter: `<common:prezime ${common}></common:prezime>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement('common:naziv');
            }
          },
        ]
      },
      'common:ime': {
        validate: function (jsElement) {
          if (jsElement.getText() === '') {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: 'This element must not be empty.'
            }
            );
          }
        },
        hasText: true,
        mustBeBefore: ['common:prezime'],
        menu: [
          {
            caption: 'Delete this <item>',
            action: Xonomy.deleteElement
          }
        ]
      },
      'common:prezime': {
        validate: function (jsElement) {
          if (jsElement.getText() === '') {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: 'This element must not be empty.'
            }
            );
          }
        },
        menu: [
          {
            caption: 'Delete this <item>',
            action: Xonomy.deleteElement
          }
        ],
        hasText: true
      },
      'res:ceo_opis': {
        validate: function (jsElement) {
          if (!jsElement.hasElements()) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: 'This element must not be empty.'
            }
            );
          }
        },
        menu: [
          {
            caption: 'Append an <paragraf>',
            action: Xonomy.newElementChild,
            actionParameter: `<res:paragraf ${res}/>`,
          }
        ],
      },
      'res:paragraf': {
        validate: function (jsElement) {
          if (jsElement.getText() === '') {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: 'This element must not be empty.'
            }
            );
          }
        },
        menu: [
          {
            caption: 'Append an <datum>',
            action: Xonomy.newElementChild,
            actionParameter: `<res:datum ${res}/>`,
          },
          {
            caption: 'Append an <zakon>',
            action: Xonomy.newElementChild,
            actionParameter: `<res:zakon ${res}/>`,
          },
        ],        
        hasText: true
      },
      'res:datum': {
        validate: function (jsElement) {  

          if (jsElement.getText() === '') {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: 'This element must not be empty.'
            }
            );
          }
        },
        menu: [
          {
            caption: 'Delete this <item>',
            action: Xonomy.deleteElement
          },
        ],
        hasText: true
      },
      'res:zakon': {
        validate: function (jsElement) {
          if (jsElement.getText() === '') {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: 'This element must not be empty.'
            }
            );
          }
        },
        menu: [
          {
            caption: 'Delete this <item>',
            action: Xonomy.deleteElement
          }
        ],
        hasText: true
      },
      'res:rešenja': {
        validate: function (jsElement) {
          if (!jsElement.hasElements()) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: 'This element must not be empty.'
            }
            );
          }
        },
        menu: [
          {
            caption: 'Append an <paragraf>',
            action: Xonomy.newElementChild,
            actionParameter: `<res:paragraf ${res}/>`
          }
        ]
      },
      'res:obrazloženje': {
        validate: function (jsElement) {
          if (!jsElement.hasElements()) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: 'This element must not be empty.'
            }
            );
          }
        },
        menu: [
          {
            caption: 'Append an <opis>',
            action: Xonomy.newElementChild,
            actionParameter: `<res:opis ${res}/>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement('res:opis');
            }
          },
          {
            caption: 'Append an <razlog>',
            action: Xonomy.newElementChild,
            actionParameter: `<res:razlog ${res}/>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement('res:razlog');
            }
          },
          {
            caption: 'Append an <konačno_rešenje>',
            action: Xonomy.newElementChild,
            actionParameter: `<res:konačno_rešenje ${res}/>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement('res:konačno_rešenje');
            }
          }
        ]
      },
      'res:opis': {
        validate: function (jsElement) {
          if (!jsElement.hasElements()) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: 'This element must not be empty.'
            }
            );
          }
        },
        menu: [
          {
            caption: 'Append an <paragraf>',
            action: Xonomy.newElementChild,
            actionParameter: `<res:paragraf ${res}/>`,
          }
        ]
      },
      'res:razlog': {
        validate: function (jsElement) {
          if (!jsElement.hasElements()) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: 'This element must not be empty.'
            }
            );
          }
        },
        menu: [
          {
            caption: 'Append an <paragraf>',
            action: Xonomy.newElementChild,
            actionParameter: `<res:paragraf ${res}/>`
          }
        ]
      },
      'res:konačno_rešenje': {
        validate: function (jsElement) {
          if (!jsElement.hasElements()) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: 'This element must not be empty.'
            }
            );
          }
        },
        menu: [
          {
            caption: 'Append an <paragraf>',
            action: Xonomy.newElementChild,
            actionParameter: `<res:paragraf ${res}/>`
          }
        ]
      },
      'res:uputsvo': {
        validate: function (jsElement) {
          if (jsElement.getText() === '') {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: 'This element must not be empty.'
            }
            );
          }
        },
        menu: [
          {
            caption: 'Delete this <item>',
            action: Xonomy.deleteElement
          }
        ],
        hasText: true
      },
      'res:datum_rešenja': {
        validate: function (jsElement) {
          if (jsElement.getText() === '') {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: 'This element must not be empty.'
            }
            );
          }
        },
        isReadOnly: true
      },
      
      'res:poverenik': {
        validate: function (jsElement) {
          if (!jsElement.hasElements()) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: 'This element must not be empty.'
            }
            );
          }
          if (!jsElement.hasChildElement('common:adresa')) {
            Xonomy.warnings.push({
              htmlID: jsElement.htmlID,
              text: 'This element needs to have element adresa.'
            }
            );
          }
        },
        menu: [
          {
            caption: 'Append an <adresa>',
            action: Xonomy.newElementChild,
            actionParameter: `<common:adresa ${common}><common:mesto ${common}/><common:ulica ${common}/><common:broj ${common}/></common:adresa>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement('common:adresa');
            }
          },
          {
            caption: 'Append an <ime>',
            action: Xonomy.newElementChild,
            actionParameter: `<common:ime ${common}></common:ime>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement('common:ime');
            }
          },
          {
            caption: 'Append an <prezime>',
            action: Xonomy.newElementChild,
            actionParameter: `<common:prezime ${common}></common:prezime>`,
            hideIf: function (jsElement) {
              return jsElement.hasChildElement('common:prezime');
            }
          },
        ]
      },
    }
  }
  
  

  constructor() { }
}
