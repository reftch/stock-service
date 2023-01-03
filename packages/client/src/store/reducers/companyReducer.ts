import { AnyAction } from 'redux';

const initialState = {
  items: [],
  item: '',
  keyword: '',
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
      state.item = action.item;
      return state;
    }

    default:
      return state;
  }
};