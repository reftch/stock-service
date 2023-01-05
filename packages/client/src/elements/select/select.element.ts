import { BaseElement } from "../base.element";
import css from './select.element.css?raw';

export class SelectElement extends BaseElement {

  static get observedAttributes() {
    return ['value', 'options', 'disabled', 'width'];
  }

  private disabled = false;
  private options = [];

  connectedCallback() {
    super.connectedCallback();
    this.getElement('.select')?.addEventListener('click', this.activate);
  }

  disconnectedCallback() {
    this.getElement('.select')?.removeEventListener('click', this.activate);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'value': {
        (this.getElement('.value') as HTMLElement).innerHTML = newValue;
        this.dispatchEvent(new CustomEvent("change", {
          detail: { id: this.id, value: newValue }
        }));
        break;
      }

      case 'width': {
        (this.getElement('.select') as HTMLElement).style.width = `${newValue}px`;
        break;
      }

      case 'options': {
        this.options = JSON.parse(newValue);
        this.renderOptions();
        break;
      }

      case 'disabled': {
        this.disabled = newValue === 'true' || newValue === '';
        if (this.disabled) {
          this.getElement('.select')?.classList.add('disabled');
        }
        break;
      }

      default:
        break;
    }
  }

  renderOptions() {
    const el = this.getElement('.options');
    if (el && this.options && this.options.length > 0) {
      let html = `<div style="padding-top: 5px">`;
      html += this.options.map((o: string) => /*html*/`<div class="option" data-value="${o}">${o}</div>`).join('');
      html += `</div>`;
      el.innerHTML = html;
    }

    this.getAllElements('.option')?.forEach((el: Element) => el.addEventListener('click', this.setValue));
  }

  setValue = (e: Event) => {
    const value = (e.target as Element).getAttribute('data-value');
    (this.getElement('.value') as HTMLElement).textContent = value;
    this.dispatchEvent(new CustomEvent("change", {
      detail: { id: this.id, value: value }
    }));
  }

  activate = (e: Event) => {
    if (this.disabled || this.options.length === 0) {
      return;
    }

    const el = this.getElement('.select');
    if (el) {
      if (el.classList.contains('open')) {
        el.classList.remove('open');
      } else {
        el.classList.add('open');
      }
    }
  }

  get html(): string {
    return /*html*/`
      <div class="wrapper">
        <div class="select">
          <div class="select-trigger">
            <span class="value"></span>
            <span class="arrow open"></span>
            <div class="options"></div>
          </div>
        </div>
      </div>
    `;
  }

  get css(): string {
    return css;
  }
}

customElements.define('select-element', SelectElement);