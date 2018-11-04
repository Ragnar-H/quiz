import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Gameboard } from "./Gameboard";
import { Questions } from "./devQuestions";

const CATEGORIES = [
  "Leo",
  "Technology",
  "Famous people",
  "Innovation",
  "Random",
  "Spinoffs"
];
const QUESTIONS = Questions;
const FIRESTORE = {};

storiesOf("Components/Gameboard", module).add("default", () => (
  <Gameboard
    gameId="some-game-id"
    firestore={FIRESTORE}
    categories={CATEGORIES}
    questions={QUESTIONS}
  />
));
