import { storiesOf } from "@storybook/react";
import React from "react";
import Input from ".";
import { useInput } from "../../hooks/useInput";

storiesOf("Components/Input", module).add("simple", () => (
  <Input name="simple" placeholder="текст" />
));
