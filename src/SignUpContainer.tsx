/* @flow */
import React, { Component } from "react";
import { withFirestore } from "react-firestore";
import { SignUp } from "./SignUp";
import { GAME_PATH, PLAYER_PATH } from "./firebasePaths";

interface Props {
  firestore: any;
  onJoinGame: (username: string, userId: string, gameId: string) => void;
}

export class SignUpContainer extends Component<Props> {
  handleSubmitUser = async (username: string, gameId: string) => {
    const { firestore, onJoinGame } = this.props;
    const userDoc = await firestore
      .collection(`${GAME_PATH}${gameId}/${PLAYER_PATH}`)
      .add({
        username
      });

    onJoinGame(username, userDoc.id, gameId);
  };

  render() {
    return (
      <div>
        <SignUp submitUser={this.handleSubmitUser} />
      </div>
    );
  }
}

export default withFirestore(SignUpContainer);
