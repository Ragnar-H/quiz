/* @flow */
import React, { Component } from "react";
import { FirestoreCollection } from "react-firestore";
import { Player } from "./Player";
import { GAME_PATH, PLAYER_PATH } from "./firebasePaths";

interface Props {
  gameId: string;
}

interface IPlayer {
  id: string;
  username: string;
}
export class PlayersContainer extends Component<Props> {
  render() {
    const { gameId } = this.props;
    return (
      <FirestoreCollection
        path={`${GAME_PATH}${gameId}/${PLAYER_PATH}`}
        render={({ isLoading, data }: FirestoreRenderProps) => {
          return isLoading ? (
            <p>Loading</p>
          ) : (
            <div>
              <h1>List of players</h1>
              {data.map((player: IPlayer) => (
                <Player key={player.id} name={player.username} />
              ))}
            </div>
          );
        }}
      />
    );
  }
}
