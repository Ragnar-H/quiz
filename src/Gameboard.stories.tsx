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

storiesOf("Components/Gameboard", module).add("default", () => (
  <Gameboard categories={CATEGORIES} questions={QUESTIONS} />
));
