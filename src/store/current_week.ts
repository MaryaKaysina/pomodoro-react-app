import { ActionCreator } from "redux";

// CURRENT_WEEK
export const CURRENT_WEEK = 'CURRENT_WEEK';

export type CurrentWeekAction = {
  currentWeek: number;
  type: typeof CURRENT_WEEK;
}

export const updateCurrentWeek: ActionCreator<CurrentWeekAction> = (currentWeek: number) => ({
  type: CURRENT_WEEK,
  currentWeek
});
