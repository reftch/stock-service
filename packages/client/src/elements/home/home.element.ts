import { Company, DynamicObject, PriceState } from "../../model";
import { actions, store } from "../../store";
import { BaseElement } from "../base.element";
import css from './home.element.css?raw';

export class HomeElement extends BaseElement {

  private item: Company | undefined;

  connectedCallback() {
    super.connectedCallback();

    store.dispatch({ type: 'application/restoreCredentials' });
    actions.application.info(store.dispatch, this.onInfo, this.error);

    store.subscribe(this.storeUpdate);
  }

  storeUpdate = () => {
    const company = store.getState().company.item;

    if (company && this.item?.symbol != company.symbol) {
      this.item = company;
      this.requestRender();
    }
  }

  onInfo = () => {
    const company = localStorage.getItem('company');
    if (company) {
      this.item = JSON.parse(company);
      store.dispatch({ type: 'company/setItem', item: this.item });
      this.requestRender();
    }
  }

  onOverview = () => {
    const overview = store.getState().company.overview;

    (this.getElement('table-element') as DynamicObject).item = overview;
    (this.getElement('table-element') as DynamicObject).requestUpdate();

    actions.company.prices(store.dispatch, this.onPrices, this.error);
    (this.getElement('chart-element') as DynamicObject).requestUpdate();
  }

  onPrices = () => {
    const dates = store.getState().company.prices.map((p: PriceState) => p.date);
    this.getElement('select-element')?.setAttribute('options', JSON.stringify(dates));
  }

  requestUpdate() {
    (this.getElement('#title') as HTMLElement).innerHTML = `${this.item?.name}`;
    actions.company.overview(store.dispatch, this.onOverview, this.error);
  }

  get html() {
    return /*html*/`
      <div class="page">
          <header-element></header-element>
        <div class="title">
          <h2 id="title"></h2>
        </div>
        <div class="content">
          <div class="chart-content">
            <div class="select">
              <select-element value="Daily prices..." width="200"></select-element>
            </div>
            <chart-element></chart-element>
          </div>
          <div class="table-content">
            <table-element></table-element>
          </div>
        </div>
      </div>
    `;
  }

  get css() {
    return css;
  }
}

customElements.define('home-element', HomeElement);