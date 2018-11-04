import React, { Component } from "react";
import styles from "./Cell.module.css";

interface Props {
  children: React.ReactNode;
  column?: number;
  row?: number;
  onClick?: any;
}

export class Cell extends Component<Props> {
  render() {
    const { onClick, column, row, children } = this.props;
    return (
      <div
        onClick={onClick}
        className={styles.cell}
        style={{
          gridColumnStart: column,
          gridRowStart: row
        }}
      >
        {children}
      </div>
    );
  }
}
