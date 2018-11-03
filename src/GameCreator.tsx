/* @flow */
import React, { Component, SyntheticEvent } from "react";

interface Props {
  onJoinGameAsHost: (gameId: string) => void;
  onGameCreation: () => Promise<void>;
}
interface NamedInput {
  target: { name: string };
}

interface State {
  gameId: string;
}

export class GameCreator extends Component<Props, State> {
  state = {
    gameId: ""
  };

  handleGameJoin = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { gameId } = this.state;
    const { onJoinGameAsHost } = this.props;
    onJoinGameAsHost(gameId);
  };

  updateInput = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      gameId: e.currentTarget.value
    });
  };

  render() {
    const { onGameCreation } = this.props;
    return (
      <div className="section">
        <h1>Host a game</h1>
        <button onClick={onGameCreation}>Create game</button>
        <p>Or host an ongoing one</p>
        <form onSubmit={this.handleGameJoin}>
          <input
            type="text"
            name="gameId"
            placeholder="game-id"
            onChange={this.updateInput}
            value={this.state.gameId}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default GameCreator;
