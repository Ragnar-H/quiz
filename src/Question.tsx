import React, { useState } from "react";
import posed from "react-pose";
import throttle from "lodash.throttle";
import styles from "./Question.module.css";
import { useEditableInput } from "./useEditableInput";
import { timeline } from "popmotion";

const FLIP_DURATION = 1000;
interface Props {
  questionId: string;
  questionText: string;
  answer: string;
  points: number;
  onQuestionClick: (questionId: string) => void;
  onQuestionEdit: (questionEdit: IQuestionEdit) => void;
  mode: "editing" | "answering" | "answered" | "unanswered";
}

const handleQuestionClick = (
  isFlipped: boolean,
  questionId: string,
  setFlipped: (isFlipped: boolean) => void,
  onQuestionClick: (questionId: string) => void
) => {
  setFlipped(!isFlipped);
  onQuestionClick(questionId);
};

const throttledHandleQuestionClick = throttle(
  handleQuestionClick,
  FLIP_DURATION,
  {
    leading: true,
    trailing: false
  }
);

const flipSteps: any = {
  scale: [1, 1.1, 1.1, 1],
  rotateX: [0, 0, 180, 180]
};

const FlipCard = posed.div({
  front: {
    scale: 1,
    rotateX: 0,
    transition: ({ key: track, from }: { key: any; from: any }) => {
      const steps = flipSteps[track];
      return timeline([
        0,
        { track, from, to: steps[3] },
        FLIP_DURATION / 5,
        { track, from, to: steps[2] },
        FLIP_DURATION / 2,
        { track, to: steps[1] },
        FLIP_DURATION,
        { track, to: steps[0] }
      ]).pipe((v: any) => v[track]);
    }
  },
  back: {
    scale: 1,
    rotateX: 180,
    transition: ({ key: track, from }: { key: any; from: any }) => {
      const steps = flipSteps[track];
      return timeline([
        0,
        { track, from, to: steps[0] },
        FLIP_DURATION / 5,
        { track, from, to: steps[1] },
        FLIP_DURATION / 2,
        { track, to: steps[2] },
        FLIP_DURATION,
        { track, to: steps[3] }
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
              onClick={() =>
                throttledHandleQuestionClick(
                  isFlipped,
                  questionId,
                  setFlipped,
                  onQuestionClick
                )
              }
              pose={isFlipped ? "back" : "front"}
            >
              <p>{points}</p>
            </FlipCard>
            <FlipCard
              onClick={() =>
                throttledHandleQuestionClick(
                  isFlipped,
                  questionId,
                  setFlipped,
                  onQuestionClick
                )
              }
              className={styles.back}
              pose={isFlipped ? "front" : "back"}
            >
              <p>{answer}</p>
            </FlipCard>
          </React.Fragment>
        );
    }
  };

  return <div className={styles.question}>{getContent()}</div>;
}
