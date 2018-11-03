/* @flow*/
import React, { Component, SyntheticEvent } from "react";

interface Props {
  submitUser: (name: string, gameId: string) => Promise<void>;
}

interface State {
  name: string;
  gameId: string;
}

export class SignUp extends Component<Props, State> {
  state = {
    name: "",
    gameId: ""
  };

  handleAddUser = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.submitUser(this.state.name, this.state.gameId);
    this.setState({
      name: "",
      gameId: ""
    });
  };

  updateName = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      name: e.currentTarget.value
    });
  };

  updateGameId = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      gameId: e.currentTarget.value
    });
  };

  render() {
    return (
      <div className="section">
        <h1>Join game as a player</h1>
        <form onSubmit={this.handleAddUser}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={this.updateName}
            value={this.state.name}
          />
          <input
            type="text"
            name="gameId"
            placeholder="game-id"
            onChange={this.updateGameId}
            value={this.state.gameId}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
