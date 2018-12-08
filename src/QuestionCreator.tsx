/* @flow*/
import React, { Component, SyntheticEvent } from "react";
import shortid from "shortid";

interface Props {
  onSubmitQuestion: (question: IQuestion) => void;
  category: ICategory;
}

interface State {
  text: string;
  answer: string;
  points: number;
}

export class QuestionCreator extends Component<Props, State> {
  state = {
    text: "",
    answer: "",
    points: 0
  };

  handleAddQuestion = (e: SyntheticEvent<HTMLFormElement>) => {
    const { category, onSubmitQuestion } = this.props;
    e.preventDefault();
    const id = shortid.generate();
    onSubmitQuestion({ ...this.state, category, id });
    this.setState({
      text: "",
      answer: "",
      points: 0
    });
  };

  updateQuestion = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      text: e.currentTarget.value
    });
  };

  updateAnswer = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      answer: e.currentTarget.value
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
          value={this.state.text}
        />
        <input
          type="text"
          name="answer"
          placeholder="What is the Southstar"
          onChange={this.updateAnswer}
          value={this.state.answer}
        />
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
