import React from "react";
import { Cell } from "./Cell";
import styles from "./Gameboard.module.css";
import { IQuestion } from "./QuestionsContainer";
import { Question } from "./Question";

type Category = string;

interface Props {
  categories: Array<Category>;
  questions: Array<IQuestion>;
  gameId: string;
  handleSetCurrentQuestion: (questionId: string) => void;
}

interface State {}

export class Gameboard extends React.Component<Props, State> {
  render() {
    const { categories, questions, handleSetCurrentQuestion } = this.props;
    return (
      <div className={styles.gameboard}>
        {categories.map((category, categoryIndex) => (
          <React.Fragment key={categoryIndex}>
            <Cell row={1} column={categoryIndex}>
              {category}
            </Cell>
            {questions
              .filter(question => question.category === category)
              .sort((a, b) => a.points - b.points)
              .map((question, questionIndex) => (
                <Cell
                  key={question.id}
                  row={questionIndex + 2}
                  column={categoryIndex}
                >
                  <Question
                    questionId={question.id}
                    questionText={question.question}
                    answer={question.answer}
                    onQuestionClick={handleSetCurrentQuestion}
                    points={question.points}
                  />
                </Cell>
              ))}
          </React.Fragment>
        ))}
      </div>
    );
  }
}
