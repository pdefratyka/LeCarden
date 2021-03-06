import { LoginActions, loginActions } from '../actions/login.action';

export interface LoginState {
  token: string | null;
  loading: boolean;
  loaded: boolean;
  errorMessage: string | null;
}

export const initialState: LoginState = {
  token: null,
  loading: false,
  loaded: false,
  errorMessage: null,
};

export function loginReducer(
  state: LoginState = initialState,
  action: LoginActions
): LoginState {
  switch (action.type) {
    case loginActions.AUTHENTICATE:
      return {
        ...state,
        loading: true,
        loaded: false,
        errorMessage: null,
      };
    case loginActions.AUTHENTICATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        token: 'some token',
        errorMessage: null,
      };
    case loginActions.AUTHENTICATE_FAIL:
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

export const getLoginState = (state: LoginState) => state.token;
