import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Toggle } from "./Toggle";
import { action } from "@storybook/addon-actions";

storiesOf("Components/Toggle", module).add("default", () => (
  <Toggle
    initialLabel="foo"
    labels={["foo", "bar"]}
    onChange={action("onChange")}
  />
));
