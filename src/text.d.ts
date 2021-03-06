declare module "@vx/text" {
  import React from "react";

  interface TextProps extends React.SVGAttributes<SVGTextElement> {
    children: string;
    scaleToFit?: boolean;
    angle?: number;
    textAnchor?: "start" | "middle" | "end" | "inherit";
    verticalAnchor?: "start" | "middle" | "end";
    x?: number | string;
    y?: number | string;
    dx?: number | string;
    dy?: number | string;
    lineHeight?: number | string;
    capHeight?: number | string;
  }

  const Text: React.ComponentType<TextProps>;
}
