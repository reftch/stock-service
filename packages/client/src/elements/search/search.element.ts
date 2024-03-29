import { Company } from "../../model";
import { actions, store } from "../../store";
import { BaseElement } from "../base.element";
import css from './search.element.css?raw';

export class SearchElement extends BaseElement {

  static get observedAttributes() {
    return ['keyword'];
  }

  private field: HTMLInputElement | undefined;
  private isFilterDone = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.field = this.getElement('#search-field') as HTMLInputElement;
    this.field?.addEventListener('keyup', this.change);
    this.field?.focus();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'keyword' && this.field) {
      this.field.value = newValue;
    }
  }

  change = async (e: Event) => {
    const value = this.field?.value;
    if (value) {
      store.dispatch({ type: 'company/setKeyword', keyword: value });
      this.triggerFiltering();
    } else {
      store.dispatch({ type: 'company/setItems', items: [] });
      this.collapse();
    }

    // TODO: Enter, Escape handlers
    if ((e as KeyboardEvent).key === 'Enter') {

    }
  }

  protected async triggerFiltering() {
    if (!this.isFilterDone) {
      this.isFilterDone = true;
      setTimeout(() => {
        actions.company.search(store.dispatch, this.onSearch, this.error);
        this.isFilterDone = false;
      }, 800);
    }
  }

  onSearch = () => {
    const companies = store.getState().company.items;
    const options = this.getElement('#options');
    if (options) {
      if (Array.isArray(companies) && companies.length > 0) {
        options.classList.add('visible');
        const html = companies.map((c: Company) => /*html*/`
            <div class="item">
              <span class="symbol">${c.symbol}</span>
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
    const symbol = (e.target as HTMLElement).firstElementChild?.innerHTML;
    const item: Company = store.getState().company.items.find((c: Company) => c.symbol === symbol);
    if (item) {
      store.dispatch({ type: 'company/setItem', item: item });
      if (this.field) {
        this.field.value = item.symbol ?? '';
      }
      this.collapse();
    }
  }

  get html(): string {
    return /*html*/`
      <div class="input-field">
        <input id="search-field" type="text" placeholder="Search a Company..." />
        <div id="options" class="options"></div>
      </div>
    `;
  }

  get css(): string {
    return css;
  }
}

customElements.define('search-element', SearchElement);