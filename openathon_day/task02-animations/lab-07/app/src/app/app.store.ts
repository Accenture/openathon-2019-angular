import { ActionReducerMap } from '@ngrx/store';

import * as loginReducer from './store/login/login.redux';
import * as layoutReducer from './store/layout/layout.redux';


export interface State {
  login: loginReducer.State;
  layout: layoutReducer.State;
}

export const reducers: ActionReducerMap<State> = {
  login: loginReducer.reducer,
  layout: layoutReducer.reducer
}
