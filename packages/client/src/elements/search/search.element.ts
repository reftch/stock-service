import { actions, store } from "../../store";
import { BaseElement } from "../base.element";
import css from './search.element.css?raw';

export class SearchElement extends BaseElement {

  private field: HTMLInputElement | undefined;

  connectedCallback(): void {
    super.connectedCallback();
    this.field = this.getElement('#search-field') as HTMLInputElement;
    this.field?.addEventListener('keyup', this.change);
    this.field?.focus();
  }

  change = async () => {
    const value = this.field?.value;
    if (value) {
      await actions.company.fetch(store.dispatch, value, this.success, this.error);
    } else {
      store.dispatch({ type: 'company/setItems', items: [] });
      this.collapse();
    }
  }

  success = () => {
    const companies = store.getState().company.items;
    const options = this.getElement('#options');
    if (options) {
      if (Array.isArray(companies) && companies.length > 0) {
        options.classList.add('visible');
        const html = companies.map((c: any) => /*html*/`
            <div class="item">
              <span class="symbol">${c['1. symbol']}</span>
            </div>
            `).join('');
        options.innerHTML = html;
        this.getAllElements('.item')?.forEach((el: Element) => el.addEventListener('click', this.selectItem));
      } else {
        this.collapse();
      }
    }
  }

  collapse() {
    const options = this.getElement('#options');
    if (options) {
      options.classList.remove('visible');
      options.innerHTML = '';
    }
  }

  selectItem = (e: Event) => {
    const item = (e.target as HTMLElement).firstElementChild?.innerHTML;
    store.dispatch({ type: 'company/setItem', item: item });
    if (this.field) {
      this.field.value = item ?? '';
    }
    this.collapse();
  }

  get html(): string {
    return /*html*/`
      <div class="input-field">
        <input id="search-field" type="text" placeholder="Select a Company..." />
        <div id="options" class="options"></div>
      </div>
    `;
  }

  get css(): string {
    return css;
  }
}

customElements.define('search-element', SearchElement);