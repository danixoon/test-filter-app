import * as React from "react";
import { ActionTypes, getActionCreator, RootState } from "../redux/types";
import RootLayout, { RootLayoutProps } from "../layout/RootLayout";
import { connect } from "react-redux";
import { clamp } from "../utils";

const maxResultsPerPage = 8;

const sortItems = (
  items: DataItem[],
  sortOrder: "ASC" | "DESC",
  sortProperty: keyof DataItem
): DataItem[] => {
  const order = sortOrder === "ASC" ? 1 : -1;
  return items.sort(
    (itemA, itemB) =>
      (itemA[sortProperty] > itemB[sortProperty] ? 1 : -1) * order
  );
};

const mapStateToProps = ({ data }: RootState) => {
  const filteredItems = data.searchQuery
    ? data.searchResult.reduce(
        (arr, id) => [...arr, data.items[id]],
        [] as DataItem[]
      )
    : data.items;

  const sortedItems =
    data.sortProperty === null
      ? filteredItems
      : sortItems(filteredItems, data.sortOrder, data.sortProperty);

  const slicedItems = sortedItems
    .slice(data.offset, data.offset + maxResultsPerPage)
    .map((item, i) => ({
      ...item,
    }));

  return {
    action: data.action,
    currentPage: Math.floor(data.offset / maxResultsPerPage) + 1,
    totalPages: Math.floor(filteredItems.length / maxResultsPerPage),
    dataType: data.dataType,
    sortOrder: data.sortOrder,
    sortProperty: data.sortProperty,
    items: slicedItems,
  };
};

const mapDispatchToProps = {
  setPage: (id: number) =>
    getActionCreator(ActionTypes.DATA_CHANGE_OFFSET)({
      offset: clamp((id - 1) * maxResultsPerPage, 0, Infinity),
    }),
  sortItems: getActionCreator(ActionTypes.DATA_SORT),
  setDataType: getActionCreator(ActionTypes.DATA_FETCH),
  searchData: getActionCreator(ActionTypes.DATA_SEARCH),
  addItem: getActionCreator(ActionTypes.DATA_ITEM_ADD),
};

export const rootContainerEnchancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default rootContainerEnchancer(RootLayout);
