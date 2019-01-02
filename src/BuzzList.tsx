import React, { useEffect } from "react";

interface Props {
  buzzes: Array<IBuzz>;
  currentAnsweringId: string | null;
  onSetCurrentAnsweringId: (userId: string) => void;
}

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
  const { currentAnsweringId, onSetCurrentAnsweringId } = props;
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
    <React.Fragment>
      {sortedBuzzes.map(buzz => (
        <p key={buzz.id}>{buzz.username}</p>
      ))}
    </React.Fragment>
  );
}
