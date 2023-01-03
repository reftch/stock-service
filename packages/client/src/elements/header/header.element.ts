import { BaseElement } from "../base.element";
import css from './header.element.css?raw';

export class HeaderElement extends BaseElement {

  get html(): string {
    return /*html*/`
      <div class="header">
        <div class="header-input">
          <search-element></search-element>
        </div>
      </div>
    `;
  }

  get css(): string {
    return css;
  }
}

customElements.define('header-element', HeaderElement);