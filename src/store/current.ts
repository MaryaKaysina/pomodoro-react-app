import { ActionCreator } from "redux";
import { IData } from "./auth/actions";

// CURRENT
export const CURRENT = 'CURRENT';

export type CurrentAction = {
  current: IData;
  type: typeof CURRENT;
}

export const updateCurrent: ActionCreator<CurrentAction> = (current: IData) => ({
  type: CURRENT,
  current
});
