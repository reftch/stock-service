import { ActionCallback, AppDispatch } from '../index';

export const companyActions = {

  async fetch(dispatch: AppDispatch, keyword: string, success: ActionCallback, error: ActionCallback) {
    const response = await fetch(`/stock-service/api/v1/companies?keyword=${keyword}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (response.status !== 200) {
      error(response);
      return;
    }

    const json = await response.json();
    dispatch({ type: 'company/setItems', items: json.bestMatches });
    success(response);
  },

  getHeaders() {
    const headers = new Headers();
    const token = sessionStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

}