import React, { Component } from "react";

interface Props {
  buzzes: Array<IBuzz>;
  currentAnsweringId: string | null;
  onSetCurrentAnsweringId: (userId: string) => void;
}

export class BuzzList extends Component<Props> {
  componentDidUpdate = (prevProps: Props) => {
    const { buzzes, currentAnsweringId, onSetCurrentAnsweringId } = this.props;
    if (!this.validateBuzzes(buzzes)) {
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
  };

  validateBuzzes = (buzzes: Array<IBuzz>) => {
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

  render() {
    const { buzzes } = this.props;
    if (buzzes.length === 0 || !this.validateBuzzes(buzzes)) {
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
}
