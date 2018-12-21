import React, { useState } from "react";
import posed from "react-pose";
import styles from "./Question.module.css";
import { useEditableInput } from "./useEditableInput";

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

  const initialQuestion = {
    id: questionId,
    text: questionText,
    answer: answer
  };

  const { isDirty, value, setValue } = useEditableInput<IQuestionEdit>(
    initialQuestion
  );

  const [isFlipped, setFlipped] = useState(false);
  const handleQuestionClick = () => {
    if (mode === "editing") {
      return;
    }
    setFlipped(!isFlipped);
    onQuestionClick(questionId);
  };

  const handleOnEditSubmit = () => onQuestionEdit(value);

  const getContent = () => {
    switch (mode) {
      case "editing":
        return (
          <React.Fragment>
            <p>{points}</p>
            <input
              type="text"
              value={value.text}
              onChange={event =>
                setValue({ ...value, text: event.currentTarget.value })
              }
            />
            <input
              type="text"
              value={value.answer}
              onChange={event =>
                setValue({ ...value, answer: event.currentTarget.value })
              }
            />
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
