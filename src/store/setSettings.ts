import { ActionCreator } from "redux";

// SET_SETTINGS
export const SET_SETTINGS = 'SET_SETTINGS';

export interface ISettings {
  timePomodoro: number;
  timeShortBreak: number;
  timeLongBreak: number;
  frequencyLongBreak: number;
  isActivePush: boolean;
}

export type SetSettingsAction = {
  settings: ISettings;
  type: typeof SET_SETTINGS;
}

export const settingsRequest: ActionCreator<SetSettingsAction> = (settings: ISettings) => ({
  type: SET_SETTINGS,
  settings
});
