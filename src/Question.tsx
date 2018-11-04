/* @flow */
import React, { Component } from "react";
import { Cell } from "./Cell";

interface Props {
  questionId: string;
  questionText: string;
  answer: string;
  points: number;
  onQuestionClick: (questionId: string) => void;
}

export class Question extends Component<Props> {
  handleQuestionClick = () => {
    const { questionId, onQuestionClick } = this.props;

    onQuestionClick(questionId);
  };
  render() {
    const { questionText, answer, points } = this.props;
    return (
      <div onClick={this.handleQuestionClick}>
        <p>{points}</p>
      </div>
    );
  }
}
