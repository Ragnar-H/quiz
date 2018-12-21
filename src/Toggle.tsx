import React, { useState } from "react";

import posed, { PoseGroup } from "react-pose";
import throttle from "lodash.throttle";
import styles from "./Toggle.module.css";

export interface ToggleLabel {
  label: string;
  value: boolean;
}

interface Props {
  labels: Array<ToggleLabel>;
  initialLabel: ToggleLabel;
  onChange: (label: ToggleLabel) => void;
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
  newLabel: ToggleLabel,
  setLabel: (label: ToggleLabel) => void,
  onChange: (label: ToggleLabel) => void
) => {
  setLabel(newLabel);
  onChange(newLabel);
};

const throttledHandleOnChange = throttle(handleOnChange, 500, {
  leading: true,
  trailing: false
});

export function Toggle(props: Props) {
  const { initialLabel, onChange, labels } = props;
  const [label, setLabel] = useState(initialLabel);

  return (
    <div className={styles.toggle}>
      <PoseGroup>
        {label.value === labels[0].value && (
          <ToggleBox
            key="front"
            onClick={() =>
              throttledHandleOnChange(labels[1], setLabel, onChange)
            }
            style={{
              backgroundColor: "var(--base6)"
            }}
          >
            {label.label}
          </ToggleBox>
        )}
        {label.value === labels[1].value && (
          <ToggleBox
            key="back"
            onClick={() =>
              throttledHandleOnChange(labels[0], setLabel, onChange)
            }
            style={{
              backgroundColor: "var(--base5)"
            }}
          >
            {label.label}
          </ToggleBox>
        )}
      </PoseGroup>
    </div>
  );
}
