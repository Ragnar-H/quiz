import React, { useEffect } from "react";

interface Props {
  buzzes: Array<IBuzz>;
  currentAnsweringId: string | null;
  onSetCurrentAnsweringId: (userId: string) => void;
}

export function BuzzList(props: Props) {
  const { buzzes, currentAnsweringId, onSetCurrentAnsweringId } = props;
  useEffect(
    () => {
      if (!validateBuzzes(buzzes)) {
        return;
      }
      const sortedBuzzes = buzzes
        .slice()
        .sort((a, b) => a.timestamp.seconds - b.timestamp.seconds);

      const firstBuzz = sortedBuzzes[0];

      if (currentAnsweringId && currentAnsweringId === firstBuzz.userId) {
        // Its the same user. Lets not update everything
        return;
      }
      onSetCurrentAnsweringId(firstBuzz.userId);
    },
    [props.buzzes, props.currentAnsweringId]
  );

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

  if (buzzes.length === 0 || !validateBuzzes(buzzes)) {
    return null;
  }

  return (
    <React.Fragment>
      {buzzes.map(buzz => (
        <p key={buzz.id}>{buzz.username}</p>
      ))}
    </React.Fragment>
  );
}
