import {
  LogoutActions,
  logoutActions,
  LogoutSuccess,
} from '../actions/logout.action';

export interface LogoutState {
  logout: boolean;
}

export const initialState: LogoutState = {
  logout: false,
};

export function logoutReducer(
  state: LogoutState = initialState,
  action: LogoutActions
): LogoutState {
  switch (action.type) {
    case logoutActions.LOGOUT:
      return {
        ...state,
        logout: false,
      };
    case logoutActions.LOGOUT_SUCCESS:
      return {
        ...state,
        logout: true,
      };
    default:
      return state;
  }
}

export const getLogoutState = (state: LogoutState) => state.logout;


