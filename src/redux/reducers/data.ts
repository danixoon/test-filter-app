import { Reducer } from "redux";
import { ActionTypes, DataState } from "../types";
import { setError, setAction } from "../store";

const defaultState: () => DataState = () => ({
  action: null,
  error: null,
  items: [],
  sortProperty: null,
  sortOrder: "ASC",
  dataType: "small",

  searchQuery: "",
  searchResult: [],

  offset: 0,
});



export const dataReducer: Reducer<DataState, Action> = (
  state = defaultState(),
  action
) => {
  switch (action.type) {
    case ActionTypes.DATA_FETCH:
      return { ...state, dataType: action.payload.dataType };
    case ActionTypes.DATA_FETCH_ERROR:
      return { ...state, ...setError(action.payload) };
    case ActionTypes.DATA_FETCH_LOADING:
      return { ...state, ...setAction("fetch") };
    case ActionTypes.DATA_FETCH_SUCCESS:
      return {
        ...defaultState(),
        dataType: state.dataType,
        items: action.payload,
      };

    case ActionTypes.DATA_CHANGE_OFFSET:
      return {
        ...state,
        ...setAction(),
        offset: action.payload.offset,
      };

    case ActionTypes.DATA_SORT:
      return {
        ...state,
        ...setAction(),
        sortOrder: action.payload.sortOrder,
        sortProperty: action.payload.sortProperty,
      };

    case ActionTypes.DATA_SEARCH_LOADING:
      return {
        ...state,
        ...setAction("search"),
      };
    case ActionTypes.DATA_SEARCH_SUCCESS:
      return {
        ...state,
        searchQuery: action.payload.searchQuery,
        searchResult: action.payload.result,
        offset: 0,
        ...setAction(),
      };

    default:
      return state;
  }
};
