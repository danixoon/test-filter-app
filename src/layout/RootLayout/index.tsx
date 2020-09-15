import * as React from "react";
import { v4 as uuid } from "uuid";
import { ConnectedProps } from "react-redux";
import Button from "../../components/Button";
import Form from "../../components/Form";
import Input from "../../components/Input";
import LoadingBanner from "../../components/LoadingBanner";
import Paginator from "../../components/Paginator";
import Table from "../../components/Table";
import { rootContainerEnchancer } from "../../containers/RootContainer";
import { useInput } from "../../hooks/useInput";

import "./styles.scss";

const ItemInfo: React.FC<{ item: DataItem }> = (props) => {
  const { item } = props;
  return (
    <div className="item-info">
      Выбран пользователь
      <b>
        {item.firstName} {item.lastName}
      </b>
      Описание:
      <textarea readOnly={true} value={item.description} />
      Адрес проживания: <b>{item.address.streetAddress}</b>
      Город: <b>{item.address.city}</b>
      Штат: <b>{item.address.state}</b>
      Индекс: <b>{item.address.zip}</b>
    </div>
  );
};

const AddItemPopup: React.FC<{
  opened: boolean;
  setOpened: (state: boolean) => void;
  addItem: (item: DataItem) => void;
}> = ({ opened, setOpened, addItem }) => {
  const [bindPopup, popupInput] = useInput({
    id: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    state: "",
    city: "",
    streetAddress: "",
    zip: "",
    description: "",
  });

  const valid = Object.values(popupInput).every((v) => v);
  const handleAddItem = () => {
    const {
      state,
      city,
      streetAddress,
      zip,
      firstName,
      lastName,
      id,
      email,
      phone,
      description,
    } = popupInput;
    const item: DataItem = {
      uuid: uuid(),
      firstName,
      lastName,
      id: Number(id),
      email,
      phone,
      description,
      fullAddress: [state, city, streetAddress, zip].join(", "),
      address: {
        state,
        city,
        streetAddress,
        zip,
      },
    };

    if (isNaN(item.id)) return alert("Неверный ид.");

    addItem(item);
  };

  return opened ? (
    <div className="add-item__container">
      <Form className="add-item__popup">
        <div className="add-item__group">
          <label>
            Ид.
            <Input {...bindPopup} value={popupInput.id} name="id" />
          </label>
          <label>
            Имя
            <Input
              {...bindPopup}
              value={popupInput.firstName}
              name="firstName"
            />
          </label>
          <label>
            Фамилия
            <Input {...bindPopup} value={popupInput.lastName} name="lastName" />
          </label>
          <label>
            Почта
            <Input {...bindPopup} value={popupInput.email} name="email" />
          </label>
          <label>
            Телефон
            <Input {...bindPopup} value={popupInput.phone} name="phone" />
          </label>
          <label>
            Описание
            <Input
              {...bindPopup}
              value={popupInput.description}
              name="description"
            />
          </label>
        </div>
        <div className="add-item__group">
          <label>
            Штат
            <Input {...bindPopup} value={popupInput.state} name="state" />
          </label>
          <label>
            Город
            <Input {...bindPopup} value={popupInput.city} name="city" />
          </label>
          <label>
            Улица
            <Input
              {...bindPopup}
              value={popupInput.streetAddress}
              name="streetAddress"
            />
          </label>
          <label>
            Индекс
            <Input {...bindPopup} value={popupInput.zip} name="zip" />
          </label>
          <Button
            onClick={handleAddItem}
            disabled={!valid}
            style={{ float: "right" }}
          >
            Добавить
          </Button>
          <Button onClick={() => setOpened(false)} style={{ float: "right" }}>
            Отмена
          </Button>
        </div>
      </Form>
    </div>
  ) : (
    <> </>
  );
};

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
    addItem,
  } = props;

  const [bind, input] = useInput({ searchQuery: null as string | null });
  const [selectedItem, setSelectedRow] = React.useState<null | DataItem>(
    () => null
  );
  const [popupOpened, setPopupOpened] = React.useState(() => false);

  const handleSearch = () => {
    searchData({ searchQuery: input.searchQuery || "" });
  };

  const handleRowSelect = (item: DataItem) => {
    setSelectedRow(item);
  };

  const handleDataTypeSelect = (dataType: "big" | "small") => {
    setDataType({ dataType });
    setPopupOpened(false);
  };

  React.useEffect(() => {
    setSelectedRow(null);
  }, [items]);

  return (
    <>
      <div className="root-layout">
        <Form onSubmit={handleSearch}>
          <div className="data-type">
            <label>
              <input
                onChange={() => handleDataTypeSelect("small")}
                type="radio"
                name="smallData"
                checked={dataType === "small"}
              />
              Мало данных
            </label>
            <label>
              <input
                onChange={() => handleDataTypeSelect("big")}
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
        <div>
          <LoadingBanner
            isLoading={action !== null}
            style={{ minHeight: "300px" }}
          />
          <AddItemPopup
            addItem={(item) => addItem({ item })}
            opened={popupOpened}
            setOpened={setPopupOpened}
          />

          <div className="control">
            <Paginator
              onPageChange={(page) => setPage(page)}
              className="control__table-paginator"
              currentPage={currentPage}
              totalPages={totalPages}
              jumpLength={8}
            />
            <Button
              onClick={() => setPopupOpened(true)}
              className="control__add-item"
            >
              Добавить
            </Button>
          </div>

          <Table
            onTableRowClick={handleRowSelect}
            selectedRowId={selectedItem?.uuid || undefined}
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
              { displayName: "Адрес", propertyName: "fullAddress" },
              { displayName: "Описание", propertyName: "description" },
            ].map((v) => ({ ...v, sortable: true }))}
          />

          {selectedItem && <ItemInfo item={selectedItem} />}
        </div>
      </div>
    </>
  );
};

export default RootLayout;
