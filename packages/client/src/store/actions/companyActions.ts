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

  async daily(dispatch: AppDispatch, success: ActionCallback, error: ActionCallback) {
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
    console.log(json);
    // dispatch({ type: 'company/setOverview', overview: json });
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
  }
}

