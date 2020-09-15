import { storiesOf } from "@storybook/react";
import React from "react";
import Paginator from ".";
import "../../sass/default.scss";

storiesOf("Components/Paginator", module).add("basic", () => (
  <Paginator
    onPageChange={() => {}}
    currentPage={1}
    totalPages={5}
    jumpLength={3}
  />
));
