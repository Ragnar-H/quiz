import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { Gameboard } from "./Gameboard";
import { Questions, Categories } from "./devQuestions";
import { action } from "@storybook/addon-actions";
import { firestore } from "firebase";

const firstTimestamp = new firestore.Timestamp(100000, 232);
const secondTimestamp = new firestore.Timestamp(200000, 232);
const thirdTimestamp = new firestore.Timestamp(300000, 232);

function createBuzzes() {
  let currentId = 0;
  return function createBuzz(): IBuzz {
    currentId++;
    return {
      id: `some-id-${currentId}`,
      username: "Stephen",
      userId: "stephens-id",
      timestamp: thirdTimestamp
    };
  };
}
const BUZZES: IBuzz[] = [
  {
    id: "some-third-id",
    username: "Loki",
    userId: "Loki-user-id",
    timestamp: thirdTimestamp
  },
  {
    id: "some-buzz-id",
    username: "Betty (the same)",
    userId: "some-user-id",
    timestamp: firstTimestamp
  },
  {
    id: "some-other-id",
    username: "Betty (the same)",
    userId: "some-user-id",
    timestamp: secondTimestamp
  }
];

const buzzCreator = createBuzzes();

function GameboardContainer(props: any) {
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(
    null
  );
  const [currenAnsweringtUserId, setCurrentAnsweringUserId] = useState<
    string | null
  >(null);

  const [buzzes, setBuzzes] = useState<IBuzz[]>(BUZZES);
  return (
    <div>
      <button onClick={() => setBuzzes([...buzzes, buzzCreator()])}>
        Add buzz
      </button>
      <Gameboard
        gameId="some-game-id"
        categories={Categories}
        questions={Questions}
        currentQuestionId={currentQuestionId}
        onSetCurrentQuestion={setCurrentQuestionId}
        onSubmitQuestionEdit={action("onSubmitQuestionEdit")}
        onSubmitCategoryEdit={action("onSubmitCategoryEdit")}
        editMode={false}
        buzzes={buzzes}
        currentAnsweringId={currenAnsweringtUserId}
        onSetCurrentAnsweringId={setCurrentAnsweringUserId}
        onCorrectAnswer={(userId: string) => setBuzzes([])}
        onWrongAnswer={(userId: string) =>
          setBuzzes(buzzes.slice(0, buzzes.length - 1))
        }
      />
    </div>
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
      onCorrectAnswer={action("onCorrectAnswer")}
      onWrongAnswer={action("onWrongAnswer")}
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
      onCorrectAnswer={action("onCorrectAnswer")}
      onWrongAnswer={action("onWrongAnswer")}
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
      onCorrectAnswer={action("onCorrectAnswer")}
      onWrongAnswer={action("onWrongAnswer")}
    />
  ));
