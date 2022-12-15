import { ActionCreator } from "redux";

// UPDATE_CHECK
export const UPDATE_CHECK = 'UPDATE_CHECK';

export type UpdateCheckAction = {
  isCheck: string;
  type: typeof UPDATE_CHECK;
}

export const updateCheck: ActionCreator<UpdateCheckAction> = (isCheck: string) => ({
  type: UPDATE_CHECK,
  isCheck
});
