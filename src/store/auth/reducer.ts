import { Reducer } from "redux";
import
{
  AuthRequestAction,
  AuthRequestErrorAction,
  AuthRequestSuccessAction,
  AUTH_REQUEST,
  AUTH_REQUEST_ERROR,
  AUTH_REQUEST_SUCCESS
} from "./actions";

export type AuthState = {
  loading: boolean;
  error: string;
  auth: string;
}

export const initialAuthState: AuthState = {
  loading: false,
  error: '',
  auth: '',
}

type AuthActions = AuthRequestAction
  | AuthRequestSuccessAction
  | AuthRequestErrorAction;

export const authReducer: Reducer<AuthState, AuthActions> = (state = initialAuthState, action) => {
    switch(action.type) {
      case AUTH_REQUEST:
        return {
          ...state,
          loading: true,
        }
      case AUTH_REQUEST_ERROR:
        return {
          ...state,
          error: action.error,
          loading: false,
        }
      case AUTH_REQUEST_SUCCESS:
        return {
          ...state,
          auth: action.auth,
          loading: false,
        }
      default:
        return state;
    }
  }
