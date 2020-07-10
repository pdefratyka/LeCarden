import { LoginActions, loginActions } from '../actions/login.action';
import { RemindPasswordActions, remindPasswordActions } from '../actions';

export interface RemindPasswordState {
  loading: boolean;
  loaded: boolean;
  errorMessage: string | null;
}

export const initialState: RemindPasswordState = {
  loading: false,
  loaded: false,
  errorMessage: null,
};

export function remindPasswordReducer(
  state: RemindPasswordState = initialState,
  action: RemindPasswordActions
): RemindPasswordState {
  switch (action.type) {
    case remindPasswordActions.REMIND_PASSWORD:
      return {
        ...state,
        loading: true,
        loaded: false,
        errorMessage: null,
      };
    case remindPasswordActions.REMIND_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        errorMessage: null,
      };
    case remindPasswordActions.REMIND_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        errorMessage: 'some error',
      };
    default:
      return state;
  }
}
