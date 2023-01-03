import { ActionCallback, AppDispatch } from '../index';

export const applicationActions = {

  async login(dispatch: AppDispatch, token: string, success: ActionCallback, error: ActionCallback) {
    const headers = new Headers();
    headers.set('Authorization', `Basic ${token}`);

    const response = await fetch('/stock-service/api/v1/token', {
      method: 'POST',
      headers: headers,
    });

    if (response.status === 200) {
      const json = await response.json();
      const bearerToken = json.token;

      dispatch({ type: 'application/setCredentials', token: bearerToken, username: json.username, expires: json.expires })
      success(response);
      return;
    }

    error(response);
  },

  async info(dispatch: AppDispatch, success: ActionCallback, error: ActionCallback) {
    const token = sessionStorage.getItem('token');
    if (!token) {
      error();
      return;
    }

    const headers = new Headers();
    headers.set('Authorization', `Bearer ${token}`);

    const response = await fetch('/stock-service/api/v1/info', {
      method: 'GET',
      headers: headers
    });

    if (response.status !== 200) {
      error(response);
      return;
    }

    const json = await response.json();
    dispatch({ type: 'application/setInfo', info: json })
    success(response);
  }

}