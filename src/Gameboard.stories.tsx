import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { Gameboard } from "./Gameboard";
import { Questions, Categories } from "./devQuestions";
import { action } from "@storybook/addon-actions";

const BUZZES: IBuzz[] = [
  {
    id: "some-buzz-id",
    username: "Betty (the same)",
    userId: "some-user-id",
    timestamp: Date.now()
  },
  {
    id: "some-other-id",
    username: "Betty (the same)",
    userId: "some-user-id",
    timestamp: Date.now()
  },
  {
    id: "some-third-id",
    username: "Loki",
    userId: "Loki-user-id",
    timestamp: Date.now()
  }
];

function GameboardContainer(props: any) {
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(
    null
  );
  const [currenAnsweringtUserId, setCurrentAnsweringUserId] = useState<
    string | null
  >(null);
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
      buzzes={BUZZES}
      currentAnsweringId={currenAnsweringtUserId}
      onSetCurrentAnsweringId={setCurrentAnsweringUserId}
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
      buzzes={BUZZES}
      currentAnsweringId="some-id"
      onSetCurrentAnsweringId={action("onSetCurrentAnweringId")}
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
      buzzes={[]}
      currentAnsweringId={null}
      onSetCurrentAnsweringId={action("onSetCurrentAnweringId")}
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
      buzzes={BUZZES}
      currentAnsweringId="some-id"
      onSetCurrentAnsweringId={action("onSetCurrentAnweringId")}
    />
  ));
