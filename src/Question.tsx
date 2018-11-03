/* @flow */
import React, { Component } from "react";

interface Props {
  questionId: string;
  questionText: string;
  answer: string;
  onQuestionClick: (questionId: string) => void;
}

export class Question extends Component<Props> {
  handleQuestionClick = () => {
    const { questionId, onQuestionClick } = this.props;

    onQuestionClick(questionId);
  };
  render() {
    const { questionText, answer } = this.props;
    return (
      <div
        onClick={this.handleQuestionClick}
        style={{ border: "1px solid red", margin: "50px" }}
      >
        <p>{questionText}</p>
        <p>{answer}</p>
      </div>
    );
  }
}
