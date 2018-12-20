import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Question } from "./Question";

interface QuestionContainerProps {
  children: any;
}
function QuestionContainer(props: QuestionContainerProps, children: any) {
  return <div style={{ maxWidth: "300px" }}>{props.children}</div>;
}

storiesOf("Components/Question", module)
  .add("editing", () => (
    <QuestionContainer>
      <Question
        mode="editing"
        questionId="some-id"
        questionText="Who is the president of Romania?"
        answer="James Bond"
        onQuestionClick={action("onQuestionClick")}
        points={500}
      />
    </QuestionContainer>
  ))
  .add("answered", () => (
    <QuestionContainer>
      <Question
        mode="answered"
        questionId="some-id"
        questionText="Who is the president of Romania?"
        answer="James Bond"
        onQuestionClick={action("onQuestionClick")}
        points={500}
      />
    </QuestionContainer>
  ))
  .add("answering", () => (
    <QuestionContainer>
      <Question
        mode="answering"
        questionId="some-id"
        questionText="Who is the president of Romania?"
        answer="James Bond"
        onQuestionClick={action("onQuestionClick")}
        points={500}
      />
    </QuestionContainer>
  ))
  .add("unanswered", () => (
    <QuestionContainer>
      <Question
        mode="unanswered"
        questionId="some-id"
        questionText="Who is the president of Romania?"
        answer="James Bond"
        onQuestionClick={action("onQuestionClick")}
        points={500}
      />
    </QuestionContainer>
  ));
