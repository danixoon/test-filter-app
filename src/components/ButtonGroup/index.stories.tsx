import { storiesOf } from "@storybook/react";
import React from "react";
import ButtonGroup from ".";
import Button from "../Button";

storiesOf("Components/Button Group", module).add("basic", () => (
  <ButtonGroup>
    <Button> ого </Button>
    <Button> ога </Button>
    <Button> угу </Button>
  </ButtonGroup>
));
