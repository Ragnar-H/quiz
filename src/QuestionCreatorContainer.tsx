/* @flow */
import React, { Component } from "react";
import { withFirestore } from "react-firestore";
import { GAME_PATH, QUESTION_PATH } from "./firebasePaths";
import { QuestionCreator } from "./QuestionCreator";

interface Props {
  firestore: any;
  gameId: string;
}

export class QuestionCreatorContainer extends Component<Props> {
  handleSubmitQuestion = (question: string, answer: string) => {
    const { firestore, gameId } = this.props;
    firestore.collection(`${GAME_PATH}${gameId}/${QUESTION_PATH}`).add({
      question,
      answer
    });
  };

  render() {
    return (
      <div>
        <QuestionCreator onSubmitQuestion={this.handleSubmitQuestion} />
      </div>
    );
  }
}

export default withFirestore(QuestionCreatorContainer);
