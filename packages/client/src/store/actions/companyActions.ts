import { Company, DynamicObject } from '../../model';
import { ActionCallback, AppDispatch, store } from '../index';

export const companyActions = {

  async search(dispatch: AppDispatch, success: ActionCallback, error: ActionCallback) {
    const keyword = store.getState().company.keyword;
    const response = await fetch(`/stock-service/api/v1/search?keyword=${keyword}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (response.status !== 200) {
      error(response);
      return;
    }

    const json = await response.json();
    const items = json.bestMatches.map((i: DynamicObject) => this.getItem(i));
    dispatch({ type: 'company/setItems', items: items });
    success(response);
  },

  async overview(dispatch: AppDispatch, success: ActionCallback, error: ActionCallback) {
    const symbol = store.getState().company.item.symbol;
    const response = await fetch(`/stock-service/api/v1/overview?symbol=${symbol}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (response.status !== 200) {
      error(response);
      return;
    }

    const json = await response.json();
    dispatch({ type: 'company/setOverview', overview: json });
    success(response);
  },

  async prices(dispatch: AppDispatch, success: ActionCallback, error: ActionCallback) {
    const symbol = store.getState().company.item.symbol;
    const response = await fetch(`/stock-service/api/v1/daily?symbol=${symbol}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (response.status !== 200) {
      error(response);
      return;
    }

    const json = await response.json();
    const jsonPrices = json["Time Series (Daily)"];
    const prices = Object.keys(jsonPrices).map(p => this.getPrice(p, jsonPrices[p]));
    dispatch({ type: 'company/setPrices', prices: prices });
    success(response);
  },

  getHeaders() {
    const headers = new Headers();
    const token = sessionStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },

  getItem(item: DynamicObject): Company {
    return {
      symbol: item['1. symbol'],
      name: item['2. name'],
      type: item['3. type'],
      region: item['4. region'],
      marketOpen: item['5. marketOpen'],
      marketClose: item['6. marketClose'],
      timezone: item['7. timezone'],
      currency: item['8. currency'],
      matchScore: item['9. matchScore'],
    }
  },

  getPrice(date: string, item: DynamicObject) {
    return {
      date: date,
      open: item['1. open'],
      high: item['2. high'],
      low: item['3. low'],
      close: item['4. close'],
      volume: item['5. volume'],
      // date: item['1. symbol'],
      // name: item['2. name'],
      // type: item['3. type'],
      // region: item['4. region'],
      // marketOpen: item['5. marketOpen'],
      // marketClose: item['6. marketClose'],
      // timezone: item['7. timezone'],
      // currency: item['8. currency'],
      // matchScore: item['9. matchScore'],
    }
  }
}

