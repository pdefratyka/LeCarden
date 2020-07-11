import {
  ConfirmAccountActions,
  confirmAccountActions,
} from '../actions/confim-account.action';

export interface ConfirmAccountState {
  loading: boolean;
  loaded: boolean;
  errorMessage: string | null;
}

export const initialState: ConfirmAccountState = {
  loading: false,
  loaded: false,
  errorMessage: null,
};

export function confirmAccountReducer(
  state: ConfirmAccountState = initialState,
  action: ConfirmAccountActions
): ConfirmAccountState {
  switch (action.type) {
    case confirmAccountActions.CONFIRM_ACCOUNT:
      return {
        ...state,
        loading: true,
        loaded: false,
        errorMessage: null,
      };
    case confirmAccountActions.CONFIRM_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        errorMessage: null,
      };
    case confirmAccountActions.CONFIRM_ACCOUNT_FAIL:
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
