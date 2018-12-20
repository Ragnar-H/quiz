import React from "react";
import { Cell } from "./Cell";
import styles from "./Gameboard.module.css";
import { Question } from "./Question";
import { Category } from "./Category";

interface Props {
  categories: Array<ICategory>;
  questions: Array<IQuestion>;
  gameId: string;
  onSetCurrentQuestion: (questionId: string) => void;
  onSubmitQuestionEdit: (questionEdit: IQuestionEdit) => void;
  onSubmitCategoryEdit: (categoryEdit: ICategory) => void;
  editMode: boolean;
}

export function Gameboard(props: Props) {
  const {
    categories,
    editMode,
    onSetCurrentQuestion,
    onSubmitCategoryEdit,
    onSubmitQuestionEdit,
    questions
  } = props;
  return (
    <div className={styles.gameboard}>
      {categories.map((category, categoryIndex) => (
        <React.Fragment key={category.id}>
          <Cell row={1} column={categoryIndex + 1}>
            <Category
              categoryId={category.id}
              categoryName={category.name}
              mode={editMode ? "editing" : "answering"}
              onCategoryEdit={onSubmitCategoryEdit}
            />
          </Cell>

          {questions
            .filter(question => question.category === category.id)
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
                  onQuestionClick={onSetCurrentQuestion}
                  onQuestionEdit={onSubmitQuestionEdit}
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
