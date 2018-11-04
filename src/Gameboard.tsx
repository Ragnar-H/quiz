import React from "react";
import { Cell } from "./Cell";
import { withFirestore } from "react-firestore";
import styles from "./Gameboard.module.css";
import { IQuestion } from "./QuestionsContainer";
import { Question } from "./Question";
import { GAME_PATH } from "./firebasePaths";

type Category = string;

interface Props {
  categories: Array<Category>;
  questions: Array<IQuestion>;
  firestore?: any;
  gameId: string;
}

interface State {}

export class Gameboard extends React.Component<Props, State> {
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
    const { categories, questions } = this.props;
    return (
      <div className={styles.gameboard}>
        {categories.map((category, categoryIndex) => (
          <React.Fragment>
            <Cell row={1} column={categoryIndex}>
              {category}
            </Cell>
            {questions
              .filter(question => question.category === category)
              .sort((a, b) => a.points - b.points)
              .map((question, questionIndex) => (
                <Cell row={questionIndex + 2} column={categoryIndex}>
                  <Question
                    questionId={question.id}
                    questionText={question.question}
                    answer={question.answer}
                    onQuestionClick={this.handleSetCurrentQuestion}
                  />
                </Cell>
              ))}
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default withFirestore(Gameboard);
