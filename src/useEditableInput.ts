import { useState } from "react";

interface EditableInput<T> {
  isDirty: boolean;
  value: T;
  setValue: (arg0: T) => void;
}

export function useEditableInput<T>(initialValue: T): EditableInput<T> {
  const [isDirty, setDirty] = useState(false);
  const [value, setInnerValue] = useState(initialValue);
  const setValue = (val: T) => {
    setDirty(true);
    setInnerValue(val);
  };
  return {
    isDirty,
    value,
    setValue
  };
}
