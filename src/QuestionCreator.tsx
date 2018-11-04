/* @flow*/
import React, { Component, SyntheticEvent } from "react";
import { IQuestion } from "./QuestionsContainer";
import shortid from "shortid";

interface Props {
  onSubmitQuestion: (question: IQuestion) => void;
}

interface State {
  question: string;
  answer: string;
  category: string;
  points: number;
}

export class QuestionCreator extends Component<Props, State> {
  state = {
    question: "",
    answer: "",
    category: "",
    points: 0
  };

  handleAddQuestion = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = shortid.generate();
    this.props.onSubmitQuestion({ ...this.state, id });
    this.setState({
      question: "",
      answer: "",
      category: "",
      points: 0
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

  updatePoints = (e: SyntheticEvent<HTMLSelectElement>) => {
    this.setState({
      points: parseInt(e.currentTarget.value, 10)
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
          value={this.state.category}
        >
          <option value="Leo">Leo</option>
          <option value="Technology">Technology</option>
          <option value="Famous people">Famous people</option>
          <option value="Innovation">Innovation</option>
          <option value="Random">Random</option>
          <option value="Spinoffs">Random</option>
        </select>

        <select
          name="points"
          onChange={this.updatePoints}
          value={this.state.points}
        >
          <option value={200}>200</option>
          <option value={400}>400</option>
          <option value={600}>600</option>
          <option value={800}>800</option>
          <option value={1000}>1000</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    );
  }
}
