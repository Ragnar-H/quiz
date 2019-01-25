import React, { useEffect } from "react";
import posed, { PoseGroup } from "react-pose";
import styles from "./BuzzList.module.css";
import { CardText } from "./CardText";

interface Props {
  buzzes: Array<IBuzz>;
  currentAnsweringId: string | null;
  onSetCurrentAnsweringId: (userId: string) => void;
  onCorrectAnswer: (userId: string) => void;
  onWrongAnswer: (userId: string) => void;
}

const Box = posed.div({
  enter: { y: 0, opacity: 1 },
  exit: { y: 50, opacity: 0 }
});

const validateBuzzes = (buzzes: Array<IBuzz>) => {
  if (buzzes.length === 0) {
    return false;
  }

  let isValid = true;
  buzzes.forEach(buzz => {
    if (!buzz.timestamp) {
      isValid = false;
    }
  });
  return isValid;
};

export function BuzzList(props: Props) {
  const {
    currentAnsweringId,
    onSetCurrentAnsweringId,
    onCorrectAnswer,
    onWrongAnswer
  } = props;
  if (!validateBuzzes(props.buzzes)) {
    return null;
  }
  const sortedBuzzes = props.buzzes
    .slice()
    .sort((a, b) => a.timestamp.seconds - b.timestamp.seconds);

  useEffect(
    () => {
      const firstBuzz = sortedBuzzes[0];

      if (currentAnsweringId && currentAnsweringId === firstBuzz.userId) {
        // Its the same user. Lets not update everything
        return;
      }
      onSetCurrentAnsweringId(firstBuzz.userId);
    },
    [props.buzzes, props.currentAnsweringId]
  );

  return (
    <div className={styles.buzzList}>
      <div className={styles.controlsContainer}>
        <button
          className={styles.correct}
          onClick={() =>
            currentAnsweringId && onCorrectAnswer(currentAnsweringId)
          }
          disabled={!currentAnsweringId}
        >
          Correct!
        </button>
        <button
          className={styles.incorrect}
          onClick={() =>
            currentAnsweringId && onWrongAnswer(currentAnsweringId)
          }
          disabled={!currentAnsweringId}
        >
          Wrong!
        </button>
      </div>
      <PoseGroup>
        {sortedBuzzes.map(buzz => (
          <Box key={buzz.id} className={styles.buzzItem}>
            <CardText text={buzz.username} />
          </Box>
        ))}
      </PoseGroup>
    </div>
  );
}
