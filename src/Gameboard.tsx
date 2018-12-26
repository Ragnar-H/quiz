import React, { useState } from "react";
import { Cell } from "./Cell";
import styles from "./Gameboard.module.css";
import { Question } from "./Question";
import { Category } from "./Category";
import { ToggleLabel, Toggle } from "./Toggle";

interface Props {
  categories: Array<ICategory>;
  questions: Array<IQuestion>;
  gameId: string;
  currentQuestionId: string | null;
  onSetCurrentQuestion: (questionId: string) => void;
  onSubmitQuestionEdit: (questionEdit: IQuestionEdit) => void;
  onSubmitCategoryEdit: (categoryEdit: ICategory) => void;
  editMode: boolean;
}

export function Gameboard(props: Props) {
  const {
    categories,
    currentQuestionId,
    editMode: initialEditMode,
    onSetCurrentQuestion,
    onSubmitCategoryEdit,
    onSubmitQuestionEdit,
    questions
  } = props;

  const [editMode, setEditMode] = useState(initialEditMode);

  const updateToggle = (label: ToggleLabel) => setEditMode(label.value);
  const editLabels = [
    { label: "Preview mode", value: false },
    { label: "Edit mode", value: true }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.gameControls}>
        <Toggle
          labels={editLabels}
          initialLabel={initialEditMode ? editLabels[1] : editLabels[0]}
          onChange={updateToggle}
        />
      </div>
      <div className={styles.gameboard}>
        {currentQuestionId ? (
          <Cell row={1} column={1} endRow={7} endColumn={7}>
            {questions
              .filter(question => question.id === currentQuestionId)
              .map(question => (
                <Question
                  questionId={question.id}
                  questionText={question.text}
                  answer={question.answer}
                  onQuestionClick={onSetCurrentQuestion}
                  onQuestionEdit={onSubmitQuestionEdit}
                  points={question.points}
                  mode="answering"
                />
              ))}
          </Cell>
        ) : (
          categories.map((category, categoryIndex) => (
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
          ))
        )}
      </div>
    </div>
  );
}
