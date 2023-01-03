import { AnyAction } from 'redux';

const initialState = {
  username: '',
  info: {
    server: '',
    version: ''
  },
};

export const applicationReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'application/restoreCredentials': {
      state.username = sessionStorage.getItem('username') ?? '';
      return state;
    }


    case 'application/setCredentials': {
      sessionStorage.setItem('token', action.token);
      sessionStorage.setItem('username', action.username);
      sessionStorage.setItem('expires', action.expires);
      state.username = action.username;
      return state;
    }

    case 'application/resetCredentials': {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('uxperies');
      state.username = '';
      return state;
    }

    case 'application/setInfo': {
      state.info = action.info;
      return state;
    }

    default:
      return state;
  }
};