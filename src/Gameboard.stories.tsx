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
      handleSetCurrentQuestion={action("handleSetCurrentQuestion")}
      editMode={false}
    />
  ))
  .add("editing", () => (
    <Gameboard
      gameId="some-game-id"
      categories={Categories}
      questions={Questions}
      handleSetCurrentQuestion={action("handleSetCurrentQuestion")}
      editMode={true}
    />
  ));
