import React, { useState } from "react";

import posed, { PoseGroup } from "react-pose";
import throttle from "lodash.throttle";
import styles from "./Toggle.module.css";

interface Props {
  labels: Array<string>;
  initialLabel: string;
  onChange: (label: string) => void;
}

const ToggleBox = posed.button({
  enter: {
    rotateY: "0deg"
  },
  exit: {
    rotateY: "180deg"
  }
});

const handleOnChange = (
  newValue: string,
  setValue: (value: string) => void,
  onChange: (value: string) => void
) => {
  setValue(newValue);
  onChange(newValue);
};

const throttledHandleOnChange = throttle(handleOnChange, 500, {
  leading: true,
  trailing: false
});

export function Toggle(props: Props) {
  const { initialLabel, onChange, labels } = props;
  const [value, setValue] = useState(initialLabel);

  return (
    <div className={styles.question}>
      <PoseGroup>
        {value === initialLabel && (
          <ToggleBox
            key="front"
            onClick={() =>
              throttledHandleOnChange(labels[1], setValue, onChange)
            }
            style={{
              backgroundColor: "var(--base6)"
            }}
          >
            {value}
          </ToggleBox>
        )}
        {value !== initialLabel && (
          <ToggleBox
            key="back"
            onClick={() =>
              throttledHandleOnChange(labels[0], setValue, onChange)
            }
            style={{
              backgroundColor: "var(--base5)"
            }}
          >
            {value}
          </ToggleBox>
        )}
      </PoseGroup>
    </div>
  );
}
