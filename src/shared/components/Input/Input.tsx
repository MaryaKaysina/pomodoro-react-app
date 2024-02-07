import { ErrorBlock } from "src/shared/components/ErrorBlock";

import { IInput } from "./input.interface";
import styles from "./input.module.css";

export const Input = ({
  label,
  placeholder,
  error,
  id,
  type,
  onChange = () => {},
  value,
  forInput,
}: IInput) => {

  return (
    <div className={styles.inputBlock}>
      <label htmlFor={forInput} className={styles.label}>
        {label}
      </label>
      <input
        className={styles.input}
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />

      {error
        && error.field === id
        && ( <ErrorBlock message={error.message} /> )
      }
    </div>
  );
}
