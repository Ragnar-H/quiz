/* @flow*/
import React, { Component, SyntheticEvent } from "react";
import { IQuestion } from "./QuestionsContainer";

interface Props {
  onSubmitQuestion: (question: IQuestion) => void;
}

interface State {
  question: string;
  answer: string;
  category: string;
}

export class QuestionCreator extends Component<Props, State> {
  state = {
    question: "",
    answer: "",
    category: ""
  };

  handleAddQuestion = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.onSubmitQuestion({ ...this.state });
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

  updateCategory = (e: SyntheticEvent<HTMLSelectElement>) => {
    this.setState({
      category: e.currentTarget.value
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
        <select
          name="category"
          placeholder="What is the Southstar"
          onChange={this.updateCategory}
          value={this.state.answer}
        >
          <option value="Leo">Leo</option>
          <option value="Technology">Technology</option>
          <option value="Famous people">Famous people</option>
          <option value="Innovation">Innovation</option>
          <option value="Random">Random</option>
          <option value="Spinoffs">Random</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    );
  }
}
