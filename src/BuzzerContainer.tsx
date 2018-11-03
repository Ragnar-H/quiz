/* @flow */
import React, { Component } from "react";
import firebase from "firebase/app";
import { withFirestore } from "react-firestore";
import { GAME_PATH, QUESTION_PATH } from "./firebasePaths";

interface Props {
  firestore: any;
  questionId: string;
  username: string;
  userId: string;
  gameId: string;
}

export class BuzzerContainer extends Component<Props> {
  handleBuzz = () => {
    const { firestore, questionId, username, userId, gameId } = this.props;

    firestore
      .collection(`${GAME_PATH}${gameId}/${QUESTION_PATH}${questionId}/buzzes`)
      .add({
        username,
        userId,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
  };
  render() {
    return (
      <div>
        <button onClick={this.handleBuzz}>Buzz!</button>
      </div>
    );
  }
}

export default withFirestore(BuzzerContainer);
