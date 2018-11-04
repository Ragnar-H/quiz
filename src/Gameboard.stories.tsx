import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Gameboard } from "./Gameboard";
import { Questions } from "./devQuestions";
import { action } from "@storybook/addon-actions";

const CATEGORIES = [
  "Leo",
  "Technology",
  "Famous people",
  "Innovation",
  "Random",
  "Spinoffs"
];
const QUESTIONS = Questions;

storiesOf("Components/Gameboard", module).add("default", () => (
  <Gameboard
    gameId="some-game-id"
    categories={CATEGORIES}
    questions={QUESTIONS}
    handleSetCurrentQuestion={action("handleSetCurrentQuestion")}
  />
));
