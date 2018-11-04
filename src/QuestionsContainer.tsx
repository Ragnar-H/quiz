/* @flow */
import React, { Component } from "react";
import { FirestoreCollection, withFirestore, FireStore } from "react-firestore";
import { GAME_PATH, QUESTION_PATH } from "./firebasePaths";
import { Question } from "./Question";

interface Props {
  firestore: any;
  gameId: string;
}

export interface IQuestion {
  id: string;
  answer: string;
  question: string;
  category: string;
  points: number;
}

export class QuestionsContainer extends Component<Props> {
  handleSetCurrentQuestion = (questionId: string) => {
    const { firestore, gameId } = this.props;

    firestore
      .collection(GAME_PATH)
      .doc(gameId)
      .set({
        currentQuestionId: questionId
      });
  };

  render() {
    const { gameId } = this.props;
    return (
      <FirestoreCollection
        path={`${GAME_PATH}${gameId}/${QUESTION_PATH}`}
        render={({ isLoading, data }: FirestoreRenderProps) => {
          return isLoading ? (
            <p>Loading</p>
          ) : (
            <div>
              <h1>List of questions</h1>
              {data.map((question: IQuestion) => (
                <Question
                  key={question.id}
                  questionId={question.id}
                  questionText={question.question}
                  answer={question.answer}
                  points={question.points}
                  onQuestionClick={this.handleSetCurrentQuestion}
                />
              ))}
            </div>
          );
        }}
      />
    );
  }
}

export default withFirestore(QuestionsContainer);
