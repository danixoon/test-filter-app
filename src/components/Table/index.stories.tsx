import { storiesOf } from "@storybook/react";
import React from "react";
import Table from ".";
import "../../sass/default.scss";

storiesOf("Components/Table", module).add("basic", () => (
  <Table
    items={[
      { name: "Алексей5", age: 10 },
      { name: "Алексей2", age: 120 },
      { name: "Алексей3", age: 10 },
    ]}
    headers={[
      { displayName: "Имя", propertyName: "firstName", sortable: true },
      { displayName: "Возраст", propertyName: "lastName", sortable: true },
    ]}
    sortOrder="ASC"
    onSortChange={() => {}}
    onTableRowClick={() => {}}
  />
));
// .add("primary", () => <Table color="primary">Primary button</Table>)
// .add("multiple", () => (
//   <>
//     <Table>Secondary Button</Table>
//     <Table color="primary">Primary button</Table>
//   </>
// ));
