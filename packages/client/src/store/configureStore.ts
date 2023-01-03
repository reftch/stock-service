import { createStore, combineReducers, Store } from 'redux';
import { applicationActions } from './actions/applicationActions';
import { companyActions } from './actions/companyActions';
import { applicationReducer } from './reducers/applicationReducer.';
import { companyReducer } from './reducers/companyReducer';

export const store: Store = createStore(
  combineReducers({
    application: applicationReducer,
    company: companyReducer,
  })
);

export const actions = {
  application: applicationActions,
  company: companyActions
};