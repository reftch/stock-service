import { store } from "../../store";
import { BaseElement } from "../base.element";
import css from './header.element.css?raw';

export class HeaderElement extends BaseElement {

  private username = '';

  connectedCallback(): void {
    super.connectedCallback();
    this.getElement('#logout-btn')?.addEventListener('click', this.logout);

    store.subscribe(() => {
      if (this.username !== store.getState().application.username) {
        this.username = store.getState().application.username;
        (this.getElement('.username') as HTMLElement).innerHTML = this.username;
      }
    });
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
          <div class="username"></div>
          <button id="logout-btn">Logout</button>
        </div>
      </div>
    `;
  }

  get css(): string {
    return css;
  }

}

customElements.define('header-element', HeaderElement);