import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Question } from "./Question";

storiesOf("Components/Question", module)
  .add("editing", () => (
    <Question
      mode="editing"
      questionId="some-id"
      questionText="Who is the president of Romania?"
      answer="James Bond"
      onQuestionClick={action("onQuestionClick")}
      points={500}
    />
  ))
  .add("answered", () => (
    <Question
      mode="answered"
      questionId="some-id"
      questionText="Who is the president of Romania?"
      answer="James Bond"
      onQuestionClick={action("onQuestionClick")}
      points={500}
    />
  ))
  .add("answering", () => (
    <Question
      mode="answering"
      questionId="some-id"
      questionText="Who is the president of Romania?"
      answer="James Bond"
      onQuestionClick={action("onQuestionClick")}
      points={500}
    />
  ))
  .add("unanswered", () => (
    <Question
      mode="unanswered"
      questionId="some-id"
      questionText="Who is the president of Romania?"
      answer="James Bond"
      onQuestionClick={action("onQuestionClick")}
      points={500}
    />
  ));
