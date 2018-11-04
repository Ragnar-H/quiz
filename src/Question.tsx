/* @flow */
import React, { Component } from "react";
import { Cell } from "./Cell";

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
      <Cell onClick={this.handleQuestionClick}>
        <p>{questionText}</p>
        <p>{answer}</p>
      </Cell>
    );
  }
}
