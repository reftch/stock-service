import { DynamicObject } from "../../model";
import { BaseElement } from "../base.element";
import css from './table.element.css?raw';

export class TableElement extends BaseElement {

  item: DynamicObject | undefined;

  get html(): string {
    return /*html*/`
      <div class="table">
        <div class="cell header">
          <div class="title">Parameter</div>
        </div>
        <div class="cell header">
          <div class="title">Value</div>
        </div>
      </div>
      <div id="body"></div>
    `;
  }

  get css(): string {
    return css;
  }

  requestUpdate() {
    if (this.item) {
      let html = Object.keys(this.item).map((key: string) => /*html*/`
        <div class="row">
          <div class="cell">
            ${key}
          </div>
          <div class="cell">
            ${(this.item as DynamicObject)[key]}
          </div>
        </div>
      `).join('');
      (this.getElement('#body') as HTMLElement).innerHTML = html;
    }
  }

}

customElements.define('table-element', TableElement);