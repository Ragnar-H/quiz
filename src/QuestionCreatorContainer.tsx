/* @flow */
import React, { Component } from "react";
import { withFirestore } from "react-firestore";
import { GAME_PATH, QUESTION_PATH } from "./firebasePaths";
import { QuestionCreator } from "./QuestionCreator";
interface Props {
  firestore: any;
  gameId: string;
  category: ICategory;
}

export class QuestionCreatorContainer extends Component<Props> {
  handleSubmitQuestion = (question: IQuestion) => {
    const { firestore, gameId } = this.props;
    firestore.collection(`${GAME_PATH}${gameId}/${QUESTION_PATH}`).add({
      ...question
    });
  };

  render() {
    return (
      <div>
        <QuestionCreator
          category={this.props.category}
          onSubmitQuestion={this.handleSubmitQuestion}
        />
      </div>
    );
  }
}

export default withFirestore(QuestionCreatorContainer);
