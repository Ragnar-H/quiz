/* @flow */
import React from "react";
import styles from "./Question.module.css";

interface Props {
  questionId: string;
  questionText: string;
  answer: string;
  points: number;
  onQuestionClick: (questionId: string) => void;
}

export function Question(props: Props) {
  const handleQuestionClick = () => {
    const { questionId, onQuestionClick } = props;
    onQuestionClick(questionId);
  };

  const { points } = props;
  return (
    <div onClick={handleQuestionClick} className={styles.question}>
      <p>{points}</p>
    </div>
  );
}
