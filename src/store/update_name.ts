import { ActionCreator } from "redux";

// UPDATE_NAME
export const UPDATE_NAME = 'UPDATE_NAME';

export type UpdateNameAction = {
  text: string;
  type: typeof UPDATE_NAME;
}

export const updateName: ActionCreator<UpdateNameAction> = (text: string) => ({
  type: UPDATE_NAME,
  text
});
