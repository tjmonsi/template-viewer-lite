/**
 * # template-viwer-lite
 *
 * `<template-viewer-lite>`: A template viewer device
 *
 * @extends {HTMLElement}
 * @customElement
*/

class TemplateViewerLite extends window.HTMLElement {
  static get is () {
    return 'template-viewer-lite';
  }
  
  constructor () {
    super();
    this.__data = {};
    this.__templateInitialized = false;
    this.attachShadow({mode: 'open'});
  }
  
  connectedCallback () {
    if (!this.__templateInitialized) {
      this.shadowRoot.appendChild(document.createElement('slot'));
    }
    this.__templateInitialized = true;
    this._templateChanged(this.template || this.getAttribute('template'));
  }
  
  set template (template) {
    this.__data.template = template;
    if (this.__templateInitialized) {
      this._templateChanged(template);
    }
  }

  get template () {
    return this.__data.template;
  }
  
  _closeTemplate (clone) {
    const oldContainer = this.querySelector('template-container-lite[active]');
    if (oldContainer) {
      oldContainer.setAttribute('closing', '');
      setTimeout(() => {
        this.removeChild(oldContainer);
        this._openTemplate(clone);
      }, 200);  
    } else {
      this._openTemplate(clone);
    }
  }
  
  _openTemplate (clone) {
    const container = document.createElement('template-container-lite');
    container.setAttribute('active', '');
    container.setContent(clone);
    this.appendChild(container);
  }
  
  _templateChanged (template) {
    if (!template) return;
    const clone = document.importNode(template.content, true);
    this._closeTemplate(clone);
  }
}

if (!window.customElements.get(TemplateViewerLite.is)) {
  window.customElements.define(TemplateViewerLite.is, TemplateViewerLite);
} else {
  console.warn(`${TemplateViewerLite.is} is already defined somewhere. Please check your code.`);
}