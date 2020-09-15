import * as React from "react";
import { ConnectedProps } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Button from "../../components/Button";
import Form from "../../components/Form";
import Input from "../../components/Input";
import LoadingBanner from "../../components/LoadingBanner";
import Paginator from "../../components/Paginator";
import Table from "../../components/Table";
import { rootContainerEnchancer } from "../../containers/RootContainer";
import { useRadioInput } from "../../hooks/useRadioInput";
import { useInput } from "../../hooks/useInput";

import "./styles.scss";

export type RootLayoutProps = ConnectedProps<typeof rootContainerEnchancer>;

const RootLayout: React.FC<RootLayoutProps> = (props) => {
  const {
    items,
    currentPage,
    totalPages,
    action,
    dataType,
    sortOrder,
    sortProperty,
    sortItems,
    setPage,
    setDataType,
    searchData,
  } = props;

  const [bind, input] = useInput({ searchQuery: null as string | null });

  const handleSearch = () => {
    searchData({ searchQuery: input.searchQuery || "" });
  };

  return (
    <>
      <div className="root-layout">
        <Form onSubmit={handleSearch}>
          <div className="data-type">
            <label>
              <input
                onChange={() => setDataType({ dataType: "small" })}
                type="radio"
                name="smallData"
                checked={dataType === "small"}
              />
              Мало данных
            </label>
            <label>
              <input
                onChange={() => setDataType({ dataType: "big" })}
                type="radio"
                checked={dataType === "big"}
                name="bigData"
              />
              Много данных
            </label>
          </div>
          <div className="search">
            <Input
              name="searchQuery"
              placeholder="запрос"
              disabled={action !== null}
              {...bind}
              value={input.searchQuery || ""}
            />
            <Button disabled={action !== null} role="submit">
              Найти
            </Button>
          </div>
        </Form>
        <hr />
        <LoadingBanner
          isLoading={action !== null}
          style={{ minHeight: "300px" }}
        />

        <Paginator
          onPageChange={(page) => setPage(page)}
          className="root-layout__table-paginator"
          currentPage={currentPage}
          totalPages={totalPages}
          jumpLength={8}
        />

        <Table
          onTableRowClick={() => {}}
          selectedRow={1}
          className="root-layout__table"
          onSortChange={(sortOrder, sortProperty) =>
            sortItems({ sortOrder, sortProperty })
          }
          sortOrder={sortOrder}
          sortProperty={sortProperty}
          items={items}
          headers={[
            { displayName: "Ид.", propertyName: "id" },
            { displayName: "Имя", propertyName: "firstName" },
            { displayName: "Фамилия", propertyName: "lastName" },
            { displayName: "Почта", propertyName: "email" },
            { displayName: "Адрес", propertyName: "address" },
            { displayName: "Описание", propertyName: "description" },
          ].map((v) => ({ ...v, sortable: true }))}
        />
      </div>
    </>
  );
};

export default RootLayout;