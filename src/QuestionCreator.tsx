/* @flow*/
import React, { Component, SyntheticEvent } from "react";

interface Props {
  onSubmitQuestion: (question: string, answer: string) => void;
}

interface State {
  question: string;
  answer: string;
}

export class QuestionCreator extends Component<Props, State> {
  state = {
    question: "",
    answer: ""
  };

  handleAddQuestion = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.onSubmitQuestion(this.state.question, this.state.answer);
    this.setState({
      question: "",
      answer: ""
    });
  };

  updateQuestion = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      question: e.currentTarget.value
    });
  };

  updateAnswer = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      answer: e.currentTarget.value
    });
  };

  render() {
    return (
      <form onSubmit={this.handleAddQuestion}>
        <input
          type="text"
          name="question"
          placeholder="Diagnosis for everyone"
          onChange={this.updateQuestion}
          value={this.state.question}
        />
        <input
          type="text"
          name="answer"
          placeholder="What is the Southstar"
          onChange={this.updateAnswer}
          value={this.state.answer}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
