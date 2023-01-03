import { BaseElement } from "../base.element";
import css from './button.element.css?raw';

export class ButtonElement extends BaseElement {

  static get observedAttributes() {
    return ['disabled', 'label', 'type'];
  }

  private disabled = false;

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('click', this.submit);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.submit);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'label': {
        this.getElement('button')!.innerHTML = newValue;
        break;
      }
      case 'type': {
        this.getElement('button')!.setAttribute('type', newValue);
        break;
      }
      case 'disabled': {
        this.disabled = newValue === 'true' || newValue === '';
        if (this.disabled) {
          this.getElement('button')!.classList.add('disabled');
        } else {
          this.getElement('button')!.classList.remove('disabled');
        }
        break;
      }
    }
  }

  submit = (e: Event) => {
    e.preventDefault();
    if (this.disabled) {
      return false;
    }

    this.dispatchEvent(new CustomEvent("action", { detail: { id: this.id, event: 'click' } }));
    return false;
  }

  get html() {
    return /*html*/`<button id="${this.id}"></button>`;
  }

  get css() {
    return css;
  }

}

customElements.define('button-element', ButtonElement);