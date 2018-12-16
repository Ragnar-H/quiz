import React from "react";
import styles from "./Question.module.css";

interface Props {
  questionId: string;
  questionText: string;
  answer: string;
  points: number;
  onQuestionClick: (questionId: string) => void;
  mode: "editing" | "answering" | "answered" | "unanswered";
}

export function Question(props: Props) {
  const {
    answer,
    mode,
    onQuestionClick,
    points,
    questionId,
    questionText
  } = props;
  const handleQuestionClick = () => {
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
    <div onClick={handleQuestionClick} className={styles.question}>
      {getContent()}
    </div>
  );
}
