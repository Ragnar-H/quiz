/* @flow */
import React, { Component } from "react";
import { withFirestore } from "react-firestore";
import shortid from "shortid";
import { GameCreator } from "./GameCreator";
import { GAME_PATH } from "./firebasePaths";
import { loadStaticQuestionsToFirestore } from "./devQuestions";

interface Props {
  firestore: any;
  onJoinGameAsHost: (gameId: string) => void;
}

export class GameCreatorContainer extends Component<Props> {
  handleGameCreation = async () => {
    const { firestore, onJoinGameAsHost } = this.props;
    const gameId = shortid.generate();
    await firestore
      .collection(GAME_PATH)
      .doc(gameId)
      .set({
        currentQuestionId: ""
      });

    onJoinGameAsHost(gameId);

    await loadStaticQuestionsToFirestore(firestore, gameId);
  };

  render() {
    const { onJoinGameAsHost } = this.props;
    return (
      <GameCreator
        onJoinGameAsHost={onJoinGameAsHost}
        onGameCreation={this.handleGameCreation}
      />
    );
  }
}

export default withFirestore(GameCreatorContainer);
