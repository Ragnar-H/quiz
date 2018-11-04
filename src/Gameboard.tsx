import React from "react";
import { Cell } from "./Cell";
import styles from "./Gameboard.module.css";
import { IQuestion } from "./QuestionsContainer";

type Category = string;

interface Props {
  categories: Array<Category>;
  questions: Array<IQuestion>;
}

interface State {}

export class Gameboard extends React.Component<Props, State> {
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
                  {question.question}
                </Cell>
              ))}
          </React.Fragment>
        ))}
      </div>
    );
  }
}
