import { ChangePasswordActions, changePasswordActions } from '../actions';

export interface ChangePasswordState {
  loading: boolean;
  loaded: boolean;
  errorMessage: string | null;
}

export const initialState: ChangePasswordState = {
  loading: false,
  loaded: false,
  errorMessage: null,
};

export function changePasswordReducer(
  state: ChangePasswordState = initialState,
  action: ChangePasswordActions
): ChangePasswordState {
  switch (action.type) {
    case changePasswordActions.CHANGE_PASSWORD:
      return {
        ...state,
        loading: true,
        loaded: false,
        errorMessage: null,
      };
    case changePasswordActions.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        errorMessage: null,
      };
    case changePasswordActions.CHANGE_PASSWORD_FAIL:
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
