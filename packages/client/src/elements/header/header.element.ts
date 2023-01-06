import { store } from "../../store";
import { BaseElement } from "../base.element";
import css from './header.element.css?raw';

export class HeaderElement extends BaseElement {

  connectedCallback(): void {
    super.connectedCallback();
    this.getElement('#logout-btn')?.addEventListener('click', this.logout);
  }

  disconnectedCallback(): void {
    this.getElement('#logout-btn')?.removeEventListener('click', this.logout);
  }

  logout = () => {
    store.dispatch({ type: 'application/resetCredentials' });
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = '<login-element></login-element>';
  }

  get html(): string {
    return /*html*/`
      <div class="header">
        <div class="header-title">
          Stock Service
        </div>
        <div class="header-input">
          <div>
            <search-element></search-element>
          </div>
        </div>

        <div class="header-right">
          <button id="logout-btn"><span class="logout"></span></button>
        </div>
      </div>
    `;
  }

  get css(): string {
    return css;
  }

}

customElements.define('header-element', HeaderElement);