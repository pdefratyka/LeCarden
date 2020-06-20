import { LoginActions, loginActions } from '../actions/login.action';

export interface LoginState {
  token: string | null;
  loading: boolean;
  loaded: boolean;
}

export const initialState: LoginState = {
  token: null,
  loading: false,
  loaded: false,
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
      };
    case loginActions.AUTHENTICATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        token: 'some token',
      };
    case loginActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    default:
      return state;
  }
}

export const getLoginState = (state: LoginState) => state.token;
