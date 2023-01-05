import { AnyAction } from 'redux';
import { CompanyState } from '../../model';

const initialState: CompanyState = {
  items: [],
  item: undefined,
  keyword: '',
  overview: undefined,
  prices: [],
};

export const companyReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'company/setKeyword': {
      state.keyword = action.keyword;
      return state;
    }

    case 'company/setItems': {
      state.items = Object.assign([], action.items);
      return state;
    }

    case 'company/setItem': {
      localStorage.setItem('company', JSON.stringify(action.item));
      state.item = Object.assign({}, action.item);
      return state;
    }

    case 'company/setOverview': {
      state.overview = Object.assign({}, action.overview);
      return state;
    }

    case 'company/setPrices': {
      state.prices = Object.assign([], action.prices);
      return state;
    }

    default:
      return state;
  }
};