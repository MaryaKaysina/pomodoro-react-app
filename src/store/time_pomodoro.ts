import { ActionCreator } from "redux";

// TIME_POMODORO
export const TIME_POMODORO = 'TIME_POMODORO';

export type TimePomodoroAction = {
  timePomodoro: string;
  type: typeof TIME_POMODORO;
}

export const updateTimePomodoro: ActionCreator<TimePomodoroAction> = (timePomodoro: string) => ({
  type: TIME_POMODORO,
  timePomodoro
});
