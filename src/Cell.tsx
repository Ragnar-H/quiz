import React, { Component } from "react";
import styles from "./Cell.module.css";

interface Props {
  children: React.ReactNode;
  column?: number;
  row?: number;
  endColumn?: number;
  endRow?: number;
  onClick?: any;
}

export class Cell extends Component<Props> {
  render() {
    const { column, row, endColumn, endRow, children } = this.props;
    return (
      <div
        className={styles.cell}
        style={{
          gridColumnStart: column,
          gridRowStart: row,
          gridColumnEnd: endColumn,
          gridRowEnd: endRow
        }}
      >
        {children}
      </div>
    );
  }
}
