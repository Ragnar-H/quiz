import * as React from "react";
import { storiesOf } from "@storybook/react";
import { QuestionCreator } from "./QuestionCreator";
import { action } from "@storybook/addon-actions";

storiesOf("Components/QuestionCreator", module).add("default", () => (
  <QuestionCreator
    category={{ name: "Leo internals", id: "someid" }}
    onSubmitQuestion={action("onSubmitQuestion")}
  />
));
