import React from "react";
import { IError } from "src/utils/js/validate";

export interface IForm {
  value: string;
  error: IError | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent) => void;
}
