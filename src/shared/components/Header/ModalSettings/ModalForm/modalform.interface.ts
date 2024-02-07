import React from "react";

export interface IError {
  code: number;
  message: string;
}

export interface IModalForm {
  valueTimePomodoro: string;
  valueTimeShortBreak: string;
  valueTimeLongBreak: string;
  valueFrequencyLongBreak: string;
  valueIsActivePush: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (event: React.FormEvent) => void;
  onClick?: () => void;
  settingsError: IError;
}
