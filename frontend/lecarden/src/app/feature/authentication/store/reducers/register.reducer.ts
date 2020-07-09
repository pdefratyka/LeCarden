import { RegisterActions, registerActions } from '../actions/register.action';

export interface RegisterState {
  isRegistered: boolean;
  loading: boolean;
  loaded: boolean;
  errorMessage: string | null;
}

export const initialState: RegisterState = {
  isRegistered: false,
  loading: false,
  loaded: false,
  errorMessage: null,
};

export function registerReducer(
  state: RegisterState = initialState,
  action: RegisterActions
): RegisterState {
  switch (action.type) {
    case registerActions.REGISTER:
      return {
        ...state,
        loading: true,
        loaded: false,
        errorMessage: null,
      };
    case registerActions.REGISTER_SUCCESS:
      return {
        ...state,
        isRegistered: true,
        loading: false,
        loaded: true,
        errorMessage: null,
      };
    case registerActions.REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        isRegistered: false,
        errorMessage: 'some error',
      };
    default:
      return state;
  }
}
