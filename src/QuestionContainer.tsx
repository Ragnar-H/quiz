import React, { Component } from "react";
import { FirestoreDocument } from "react-firestore";
import { GAME_PATH, QUESTION_PATH } from "./firebasePaths";

interface Props {
  questionId: string;
  gameId: string;
}

export class QuestionContainer extends Component<Props> {
  render() {
    const { questionId, gameId } = this.props;
    return (
      <FirestoreDocument
        path={`${GAME_PATH}${gameId}/${QUESTION_PATH}${questionId}`}
        render={({ isLoading, data }: FirestoreRenderProps) => {
          return isLoading ? (
            <p>Loading</p>
          ) : (
            <div>
              <p>Question : {data.question}</p>
              <p>Answer : {data.answer}</p>
            </div>
          );
        }}
      />
    );
  }
}
