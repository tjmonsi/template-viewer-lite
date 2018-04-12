/**
 * # template-viwer-lite
 *
 * `<template-container-lite>`: A template container device
 *
 * @extends {HTMLElement}
 * @customElement
*/

class TemplateContainerLite extends window.HTMLElement {
  static get is () {
    return 'template-container-lite';
  }
  
  constructor () {
    super();
    this.attachShadow({mode: 'open'}).appendChild(document.createElement('slot'));
  }
  
  setContent (content) {
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }
    this.appendChild(content);
  }
}

if (!window.customElements.get(TemplateContainerLite.is)) {
  window.customElements.define(TemplateContainerLite.is, TemplateContainerLite);
} else {
  console.warn(`${TemplateContainerLite.is} is already defined somewhere. Please check your code.`);
}