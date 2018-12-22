import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Toggle } from "./Toggle";
import { action } from "@storybook/addon-actions";

const labels = [{ label: "foo", value: true }, { label: "bar", value: false }];
storiesOf("Components/Toggle", module).add("default", () => (
  <Toggle
    initialLabel={labels[0]}
    labels={labels}
    onChange={action("onChange")}
  />
));
