import React from "react";
import { IError } from "src/utils/js/validate";

export interface IFormAuth {
  valueName: string;
  valueMail: string;
  valueCheck: string;
  authError: IError;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (event: React.FormEvent) => void;
}
