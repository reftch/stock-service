import { Company } from "../../model";
import { actions, store } from "../../store";
import { BaseElement } from "../base.element";
import css from './home.element.css?raw';

export class HomeElement extends BaseElement {

  private item: Company | undefined;

  connectedCallback(): void {
    super.connectedCallback();

    store.dispatch({ type: 'application/restoreCredentials' });
    actions.application.info(store.dispatch, this.success, this.requireLogin);

    store.subscribe(() => {
      if (this.item !== store.getState().company.item) {
        this.item = store.getState().company.item;
        (this.getElement('#title') as HTMLElement).innerHTML = `${this.item?.name}`;
      }
    });
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
        <div class="title">
          <h2 id="title"></h2>
        </div>
      </div>
    `;
  }

  get css() {
    return css;
  }
}

customElements.define('home-element', HomeElement);