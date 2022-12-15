import { ActionCreator } from "redux";

// TIME_SHORT_BREAK
export const TIME_SHORT_BREAK = 'TIME_SHORT_BREAK';

export type TimeShortBreakAction = {
  timeShortBreak: string;
  type: typeof TIME_SHORT_BREAK;
}

export const updateTimeShortBreak: ActionCreator<TimeShortBreakAction> = (timeShortBreak: string) => ({
  type: TIME_SHORT_BREAK,
  timeShortBreak
});
