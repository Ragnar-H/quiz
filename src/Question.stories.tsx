import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Question } from "./Question";

storiesOf("Components/Question", module).add("default", () => (
  <Question
    questionId="some-id"
    questionText="Who is the president of Romania?"
    answer="James Bond"
    onQuestionClick={action("onQuestionClick")}
    points={500}
  />
));
