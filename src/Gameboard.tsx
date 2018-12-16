import React from "react";
import { Cell } from "./Cell";
import styles from "./Gameboard.module.css";
import { Question } from "./Question";

interface Props {
  categories: Array<ICategory>;
  questions: Array<IQuestion>;
  gameId: string;
  handleSetCurrentQuestion: (questionId: string) => void;
  editMode: boolean;
}

export function Gameboard(props: Props) {
  const { categories, questions, handleSetCurrentQuestion, editMode } = props;
  return (
    <div className={styles.gameboard}>
      {categories.map((category, categoryIndex) => (
        <React.Fragment key={category.id}>
          <Cell row={1} column={categoryIndex + 1}>
            {category.name}
          </Cell>
          {questions
            .filter(question => question.category.id === category.id)
            .sort((a, b) => a.points - b.points)
            .map((question, questionIndex) => (
              <Cell
                key={question.id}
                row={questionIndex + 2}
                column={categoryIndex + 1}
              >
                <Question
                  questionId={question.id}
                  questionText={question.text}
                  answer={question.answer}
                  onQuestionClick={handleSetCurrentQuestion}
                  points={question.points}
                  mode={editMode ? "editing" : "unanswered"}
                />
              </Cell>
            ))}
        </React.Fragment>
      ))}
    </div>
  );
}
