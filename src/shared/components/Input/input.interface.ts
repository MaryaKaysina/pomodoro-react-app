import React from "react";
import { IError } from "src/utils/js/validate";

export interface IInput {
  label: string,
  placeholder: string,
  value: string,
  error?: IError,
  id: string,
  type: string,
  forInput: string,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
