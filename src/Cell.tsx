import React, { Component } from "react";
import styles from "./Cell.module.css";

interface Props {
  children: React.ReactNode;
  onClick?: any;
}

export class Cell extends Component<Props> {
  render() {
    const { onClick, children } = this.props;
    return (
      <div onClick={onClick} className={styles.cell}>
        {children}
      </div>
    );
  }
}
