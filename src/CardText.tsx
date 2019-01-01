import React from "react";
import { Text } from "@vx/text";

interface Props {
  text: string;
}
export function CardText(props: Props) {
  return (
    <svg viewBox="0 0 100 100" height="100%" width="100%">
      <Text
        scaleToFit={false}
        width={100}
        y={50}
        height={100}
        x={50}
        verticalAnchor="middle"
        textAnchor="middle"
      >
        {props.text}
      </Text>
    </svg>
  );
}
