import React, { useState, useRef, useEffect } from "react";
import * as animateCSSGrid from "animate-css-grid";
import { Cell } from "./Cell";
import styles from "./Gameboard.module.css";
import { Question, FLIP_DURATION } from "./Question";
import { Category } from "./Category";
import { ToggleLabel, Toggle } from "./Toggle";
import { BuzzList } from "./BuzzList";
import { ScoreList } from "./ScoreList";

interface Props {
  categories: Array<ICategory>;
  questions: Array<IQuestion>;
  buzzes: Array<IBuzz> | null;
  players: Array<IPlayer>;
  gameId: string;
  currentQuestionId: string | null;
  currentAnsweringId: string | null;

  onSetCurrentAnsweringId: (userId: string) => void;
  onCorrectAnswer: (userId: string, buzzId: string) => void;
  onWrongAnswer: (userId: string, buzzId: string) => void;
  onSetCurrentQuestion: (questionId: string | null) => void;
  onSubmitQuestionEdit: (questionEdit: IQuestionEdit) => void;
  onSubmitCategoryEdit: (categoryEdit: ICategory) => void;
  editMode: boolean;
}

const FULLSCREEN_BUFFER = 300;
export function Gameboard(props: Props) {
  const {
    categories,
    currentQuestionId,
    editMode: initialEditMode,
    onSetCurrentQuestion,
    onSubmitCategoryEdit,
    onSubmitQuestionEdit,
    questions,
    buzzes,
    currentAnsweringId,
    onSetCurrentAnsweringId,
    onCorrectAnswer,
    onWrongAnswer
  } = props;

  const gameboardGrid = useRef(null);

  useEffect(() => {
    animateCSSGrid.wrapGrid(gameboardGrid.current, {
      easing: "backOut",
      stagger: 0,
      duration: 700
    });
  }, []);

  const [editMode, setEditMode] = useState(initialEditMode);

  const [delayedCurrentQuestion, setDelayedCurrentQuestion] = useState<
    string | null
  >(null);

  useEffect(
    () => {
      setTimeout(
        () => setDelayedCurrentQuestion(currentQuestionId),
        FLIP_DURATION + FULLSCREEN_BUFFER
      );
    },
    [currentQuestionId]
  );
  const updateToggle = (label: ToggleLabel) => setEditMode(label.value);
  const editLabels = [
    { label: "Preview mode", value: false },
    { label: "Edit mode", value: true }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.gameControls}>
        <p>{`Join game at: ${props.gameId}`}</p>
        <Toggle
          labels={editLabels}
          initialLabel={initialEditMode ? editLabels[1] : editLabels[0]}
          onChange={updateToggle}
        />
        {currentQuestionId && (
          <div>
            <button onClick={() => onSetCurrentQuestion(null)}>
              Click me to clear question
            </button>
          </div>
        )}
      </div>
      <div
        className={editMode ? styles.gameboard : styles.gameboardPlaying}
        ref={gameboardGrid}
      >
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
                  column={categoryIndex + 1}
                  row={questionIndex + 2}
                  fullscreen={delayedCurrentQuestion === question.id}
                >
                  <Question
                    questionId={question.id}
                    questionText={question.text}
                    answer={question.answer}
                    onQuestionClick={onSetCurrentQuestion}
                    onQuestionEdit={onSubmitQuestionEdit}
                    points={question.points}
                    mode={
                      editMode
                        ? "editing"
                        : delayedCurrentQuestion === question.id
                          ? "answering"
                          : question.status
                    }
                  />
                </Cell>
              ))}
          </React.Fragment>
        ))}
      </div>
      <div className={styles.buzzer}>
        <BuzzList
          buzzes={buzzes || []}
          onSetCurrentAnsweringId={onSetCurrentAnsweringId}
          currentAnsweringId={currentAnsweringId}
          onCorrectAnswer={onCorrectAnswer}
          onWrongAnswer={onWrongAnswer}
        />
      </div>
      <div className={styles.scores}>
        <ScoreList players={props.players} />
      </div>
    </div>
  );
}
