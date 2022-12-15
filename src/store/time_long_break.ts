import { ActionCreator } from "redux";

// TIME_LONG_BREAK
export const TIME_LONG_BREAK = 'TIME_LONG_BREAK';

export type TimeLongBreakAction = {
  timeLongBreak: string;
  type: typeof TIME_LONG_BREAK;
}

export const updateTimeLongBreak: ActionCreator<TimeLongBreakAction> = (timeLongBreak: string) => ({
  type: TIME_LONG_BREAK,
  timeLongBreak
});
