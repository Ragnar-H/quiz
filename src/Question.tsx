import React, { useState } from "react";
import posed from "react-pose";
import styles from "./Question.module.css";

interface Props {
  questionId: string;
  questionText: string;
  answer: string;
  points: number;
  onQuestionClick: (questionId: string) => void;
  onQuestionEdit: (questionEdit: IQuestionEdit) => void;
  mode: "editing" | "answering" | "answered" | "unanswered";
}

const Box = posed.div({
  front: {
    rotateY: "0deg",
    transition: {
      ease: "easeOut",
      duration: 300
    }
  },
  back: {
    rotateY: "180deg",
    transition: {
      ease: "easeOut",
      duration: 300
    }
  }
});

export function Question(props: Props) {
  const {
    answer,
    mode,
    onQuestionClick,
    onQuestionEdit,
    points,
    questionId,
    questionText
  } = props;

  const [isDirty, setDirty] = useState(false);
  const [editText, setEditText] = useState(questionText);
  const [editAnswer, setEditAnswer] = useState(answer);

  const [isFlipped, setFlipped] = useState(false);
  const handleQuestionClick = () => {
    if (mode === "editing") {
      return;
    }
    setFlipped(!isFlipped);
    onQuestionClick(questionId);
  };

  const handleOnEditSubmit = () =>
    onQuestionEdit({
      id: questionId,
      text: editText,
      answer: editAnswer
    });

  const getContent = () => {
    switch (mode) {
      case "editing":
        return (
          <React.Fragment>
            <textarea
              value={editText}
              onChange={event => {
                setDirty(true);
                setEditText(event.currentTarget.value);
              }}
            />
            <textarea
              value={editAnswer}
              onChange={event => {
                setDirty(true);
                setEditAnswer(event.currentTarget.value);
              }}
            />
            <p>{points}</p>
            {isDirty && (
              <button onClick={handleOnEditSubmit}>Save changes</button>
            )}
          </React.Fragment>
        );
      case "answered":
        return null;
      case "answering":
        return <p>{answer}</p>;
      case "unanswered":
        return <p>{points}</p>;
    }
  };

  return (
    <Box
      onClick={handleQuestionClick}
      className={styles.question}
      pose={isFlipped ? "back" : "front"}
    >
      {getContent()}
    </Box>
  );
}
