import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Gameboard } from "./Gameboard";
import { Questions, Categories } from "./devQuestions";
import { action } from "@storybook/addon-actions";

storiesOf("Components/Gameboard", module)
  .add("playing", () => (
    <Gameboard
      gameId="some-game-id"
      categories={Categories}
      questions={Questions}
      currentQuestionId={null}
      onSetCurrentQuestion={action("onSetCurrentQuestion")}
      onSubmitQuestionEdit={action("onSubmitQuestionEdit")}
      onSubmitCategoryEdit={action("onSubmitCategoryEdit")}
      editMode={false}
    />
  ))
  .add("editing", () => (
    <Gameboard
      gameId="some-game-id"
      categories={Categories}
      questions={Questions}
      currentQuestionId={null}
      onSetCurrentQuestion={action("onSetCurrentQuestion")}
      onSubmitQuestionEdit={action("onSubmitQuestionEdit")}
      onSubmitCategoryEdit={action("onSubmitCategoryEdit")}
      editMode={true}
    />
  ))
  .add("answering", () => (
    <Gameboard
      gameId="some-game-id"
      categories={Categories}
      questions={Questions}
      currentQuestionId="category-3-question-0"
      onSetCurrentQuestion={action("onSetCurrentQuestion")}
      onSubmitQuestionEdit={action("onSubmitQuestionEdit")}
      onSubmitCategoryEdit={action("onSubmitCategoryEdit")}
      editMode={false}
    />
  ));
