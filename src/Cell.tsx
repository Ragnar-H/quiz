import React, { Component } from "react";
import styles from "./Cell.module.css";

interface Props {
  children: React.ReactNode;
  column?: number;
  row?: number;
  endColumn?: number;
  endRow?: number;
  zIndex?: number;
  fullscreen?: boolean;
  onClick?: any;
}

export class Cell extends Component<Props> {
  render() {
    const {
      column,
      row,
      endColumn,
      endRow,
      zIndex,
      fullscreen,
      children
    } = this.props;
    return (
      <div
        style={
          fullscreen
            ? {}
            : {
                gridColumnStart: column,
                gridRowStart: row,
                gridColumnEnd: endColumn,
                gridRowEnd: endRow,
                zIndex
              }
        }
        className={fullscreen ? styles.cellFullscreen : styles.cell}
      >
        {children}
      </div>
    );
  }
}
