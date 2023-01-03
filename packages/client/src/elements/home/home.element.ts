import { actions, store } from "../../store";
import { BaseElement } from "../base.element";

export class HomeElement extends BaseElement {

  connectedCallback(): void {
    super.connectedCallback();

    store.dispatch({ type: 'application/restoreCredentials' });

    actions.application.info(store.dispatch, this.success, this.requireLogin);
    this.getElement('#logout-btn')?.addEventListener('click', this.requireLogin);
    (this.getElement('.message') as HTMLElement).innerHTML = `Username: ${store.getState().application.username}`
  }

  success(): void { }

  requireLogin = () => {
    store.dispatch({ type: 'application/resetCredentials' });
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = '<login-element></login-element>';
  }

  get html() {
    return /*html*/`
      <div class="page">
        <header-element></header-element>
        <h2>Home page</h2>
        <div class="message"></div>
        <button id="logout-btn">Logout</button>
      </div>
    `;
  }

  get css() {
    return /*css*/`
      .page {
      }
      .message {
        margin-bottom: 20px;
      }
      button {
        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        background-color: var(--background-button-primary);
        cursor: pointer;
        transition: border-color 0.15s;
        box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.2);
      }
      button:hover {
        border-color: var(--border-color);
      }
      button:focus,
      button:focus-visible {
        outline: 4px auto -webkit-focus-ring-color;
      }
    `;
  }
}

customElements.define('home-element', HomeElement);