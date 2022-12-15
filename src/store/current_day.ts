import { ActionCreator } from "redux";

// CURRENT_DAY
export const CURRENT_DAY = 'CURRENT_DAY';

export type CurrentDayAction = {
  currentDay: number;
  type: typeof CURRENT_DAY;
}

export const updateCurrentDay: ActionCreator<CurrentDayAction> = (currentDay: number) => ({
  type: CURRENT_DAY,
  currentDay
});
