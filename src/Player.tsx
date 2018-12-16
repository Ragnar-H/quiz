import React, { Component } from "react";

interface Props {
  name: string;
}

export class Player extends Component<Props> {
  render() {
    const { name } = this.props;
    return (
      <div>
        <p>{name}</p>
      </div>
    );
  }
}
