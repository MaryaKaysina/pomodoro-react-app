import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducer";

// AUTH_REQUEST
export const AUTH_REQUEST = 'AUTH_REQUEST';

export type AuthRequestAction = {
  type: typeof AUTH_REQUEST;
}

export const authRequest: ActionCreator<AuthRequestAction> = () => ({
  type: AUTH_REQUEST,
});

// AUTH_REQUEST_SUCCESS
export const AUTH_REQUEST_SUCCESS = 'AUTH_REQUEST_SUCCESS';

export type AuthRequestSuccessAction = {
  type: typeof AUTH_REQUEST_SUCCESS;
  auth: string;
}

export const authRequestSuccess: ActionCreator<AuthRequestSuccessAction> = (auth: string) => ({
  type: AUTH_REQUEST_SUCCESS,
  auth,
});

// AUTH_REQUEST_ERROR
export const AUTH_REQUEST_ERROR = 'AUTH_REQUEST_ERROR';

export type AuthRequestErrorAction = {
  type: typeof AUTH_REQUEST_ERROR;
  error: string;
}

export const authRequestError: ActionCreator<AuthRequestErrorAction> = (error: string) => ({
  type: AUTH_REQUEST_ERROR,
  error,
});

export const authRequestAsync =
  (auth: string): ThunkAction<void, RootState, unknown, Action<string>> =>
  (dispatch, getState) => {
    dispatch(authRequest());

    if (auth.length !== 0) {
      const data = `{ auth: ${auth}, tasks: [] }`;
      localStorage.setItem('token-pomodoro', data);
      dispatch(authRequestSuccess(auth));
    } else {
      dispatch(authRequestError('Our e-mail is empty(:'));
    }
  }
