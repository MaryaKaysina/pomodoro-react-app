import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducer";

// ME_REQUEST
export const ME_REQUEST = 'ME_REQUEST';

export type MeRequestAction = {
  type: typeof ME_REQUEST;
}

export const meRequest: ActionCreator<MeRequestAction> = () => ({
  type: ME_REQUEST,
});

// ME_REQUEST_SUCCESS
export interface IUserData {
  name?: string;
  iconImg?: string;
}

export const ME_REQUEST_SUCCESS = 'ME_REQUEST_SUCCESS';

export type MeRequestSuccessAction = {
  type: typeof ME_REQUEST_SUCCESS;
  data: IUserData;
}

export const meRequestSuccess: ActionCreator<MeRequestSuccessAction> = (data: IUserData) => ({
  type: ME_REQUEST_SUCCESS,
  data,
});

// ME_REQUEST_ERROR
export const ME_REQUEST_ERROR = 'ME_REQUEST_ERROR';

export type MeRequestErrorAction = {
  type: typeof ME_REQUEST_ERROR;
  error: string;
}

export const meRequestError: ActionCreator<MeRequestErrorAction> = (error: string) => ({
  type: ME_REQUEST_ERROR,
  error,
});

export const meRequestAsync =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  (dispatch, getState) => {
  }

