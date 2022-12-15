import { updateFrequencyLongBreak } from "../../store/frequency_long_break";
import { updateTimeLongBreak } from "../../store/time_long_break";
import { updateTimePomodoro } from "../../store/time_pomodoro";
import { updateTimeShortBreak } from "../../store/time_short_break";

export interface IUpdateFormInput {
  field: string;
  value: string;
}

export function updateFormInputSetting(field: string, value: string) {
  if (field === 'timePomodoro') {
    return updateTimePomodoro(value);
  }
  if (field === 'timeShortBreak') {
    return updateTimeShortBreak(value);
  }
  if (field === 'timeLongBreak') {
    return updateTimeLongBreak(value);
  }
  if (field === 'frequencyLongBreak') {
    return updateFrequencyLongBreak(value);
  }
}
