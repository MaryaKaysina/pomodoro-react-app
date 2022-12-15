import { ActionCreator } from "redux";

// FREQUENCY_LONG_BREAK
export const FREQUENCY_LONG_BREAK = 'FREQUENCY_LONG_BREAK';

export type FrequencyLongBreakAction = {
  frequencyLongBreak: string;
  type: typeof FREQUENCY_LONG_BREAK;
}

export const updateFrequencyLongBreak: ActionCreator<FrequencyLongBreakAction> = (frequencyLongBreak: string) => ({
  type: FREQUENCY_LONG_BREAK,
  frequencyLongBreak
});
