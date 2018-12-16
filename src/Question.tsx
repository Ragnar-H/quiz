import React, { useState } from "react";
import posed from "react-pose";
import styles from "./Question.module.css";

interface Props {
  questionId: string;
  questionText: string;
  answer: string;
  points: number;
  onQuestionClick: (questionId: string) => void;
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
    points,
    questionId,
    questionText
  } = props;

  const [isFlipped, setFlipped] = useState(false);
  const handleQuestionClick = () => {
    setFlipped(!isFlipped);
    onQuestionClick(questionId);
  };

  const getContent = () => {
    switch (mode) {
      case "editing":
        return (
          <React.Fragment>
            <p>{questionText}</p>
            <p>{answer}</p>
            <p>{points}</p>
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
