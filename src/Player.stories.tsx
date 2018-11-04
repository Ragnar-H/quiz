import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Player } from "./Player";

storiesOf("Components/Player", module).add("default", () => (
  <Player name="Morty" />
));
