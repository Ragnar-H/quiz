import React, { useState } from "react";

import posed, { PoseGroup } from "react-pose";
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

export function Toggle(props: Props) {
  const { initialLabel, onChange, labels } = props;
  const [value, setValue] = useState(initialLabel);

  const handleOnChange = (newValue: string) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={styles.question}>
      <PoseGroup>
        {value === initialLabel && (
          <ToggleBox
            key="front"
            onClick={() => handleOnChange(labels[1])}
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
            onClick={() => handleOnChange(labels[0])}
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
