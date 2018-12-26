import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { Gameboard } from "./Gameboard";
import { Questions, Categories } from "./devQuestions";
import { action } from "@storybook/addon-actions";

function GameboardContainer(props: any) {
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(
    null
  );
  return (
    <Gameboard
      gameId="some-game-id"
      categories={Categories}
      questions={Questions}
      currentQuestionId={currentQuestionId}
      onSetCurrentQuestion={setCurrentQuestionId}
      onSubmitQuestionEdit={action("onSubmitQuestionEdit")}
      onSubmitCategoryEdit={action("onSubmitCategoryEdit")}
      editMode={false}
    />
  );
}
storiesOf("Components/Gameboard", module)
  .add("interactive", () => <GameboardContainer />)
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
