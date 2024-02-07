import { EColors, TSizes } from "../Text/text.interface";

export interface IErrorBlock {
  message: string;
  color?: EColors;
  size?: TSizes;
}
