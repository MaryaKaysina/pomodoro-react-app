import { ActionCreator, Reducer } from "redux";

import {
  MeRequestAction,
  MeRequestErrorAction,
  MeRequestSuccessAction,
  ME_REQUEST,
  ME_REQUEST_ERROR,
  ME_REQUEST_SUCCESS
} from "./me/actions";
import { meReducer, MeState } from "./me/reducer";


export type RootState = {

}

const initialState: RootState = {

}


// MyAction
type MyAction = any;

export const rootReducer: Reducer<RootState, MyAction> = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}


