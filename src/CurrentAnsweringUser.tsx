/* @flow */
import React, { Component } from "react";

interface Props {
  userId: string;
}

export class CurrentAnsweringUser extends Component<Props> {
  render() {
    const { userId } = this.props;
    return (
      <div>
        <p>Current answering user id</p>
        <p>{userId}</p>
      </div>
    );
  }
}
