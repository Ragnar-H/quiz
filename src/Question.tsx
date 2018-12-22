import React, { useState } from "react";
import posed from "react-pose";
import styles from "./Question.module.css";
import { useEditableInput } from "./useEditableInput";
import { timeline } from "popmotion";

interface Props {
  questionId: string;
  questionText: string;
  answer: string;
  points: number;
  onQuestionClick: (questionId: string) => void;
  onQuestionEdit: (questionEdit: IQuestionEdit) => void;
  mode: "editing" | "answering" | "answered" | "unanswered";
}

const flipSteps: any = {
  scale: [1.1, 1.1, 1],
  rotateX: [0, 180, 180]
};

const FlipCard = posed.div({
  front: {
    scale: 1,
    rotateX: 0
  },
  back: {
    scale: 1,
    rotateX: 180,
    transition: ({ key: track, from }: { key: any; from: any }) => {
      const steps = flipSteps[track];
      return timeline([
        100,
        { track, from, to: steps[0] },
        500,
        { track, to: steps[1] },
        1000,
        { track, to: steps[2] }
      ]).pipe((v: any) => v[track]);
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
          <div className={styles.front}>
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
          </div>
        );
      case "answered":
        return null;
      case "answering":
        return <p>{answer}</p>;
      case "unanswered":
        return (
          <React.Fragment>
            <FlipCard
              className={styles.front}
              pose={isFlipped ? "back" : "front"}
            >
              <p>{points}</p>
            </FlipCard>
            <FlipCard
              className={styles.back}
              pose={isFlipped ? "front" : "back"}
            >
              <p>{answer}</p>
            </FlipCard>
          </React.Fragment>
        );
    }
  };

  return (
    <div className={styles.question} onClick={handleQuestionClick}>
      {getContent()}
    </div>
  );
}
