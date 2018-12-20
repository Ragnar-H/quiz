import { useState } from "react";
import { equals } from "ramda";

interface EditableInput<T> {
  isDirty: boolean;
  value: T;
  setValue: (arg0: T) => void;
}

export function useEditableInput<T>(initialValue: T): EditableInput<T> {
  const [value, setInnerValue] = useState(initialValue);
  const setValue = (val: T) => {
    setInnerValue(val);
  };

  const isDirty = !equals(value, initialValue);
  return {
    isDirty,
    value,
    setValue
  };
}
