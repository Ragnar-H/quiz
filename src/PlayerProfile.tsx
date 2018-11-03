/* @flow */
import React, { Component } from "react";
import { UserContext } from "./App";

interface Props {}

export class PlayerProfile extends Component<Props> {
  render() {
    return (
      <UserContext.Consumer>
        {({ username, userId }) => (
          <div>
            <p>Player name - {username}</p>
            <p>Player id - {userId}</p>
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}
