export const getAction = <A extends keyof ActionPayload>(
  type: A,
  payload: ActionPayload[A] = {} as ActionPayload[A]
) => ({ type, payload });

export const getActionCreator = <A extends keyof ActionPayload>(type: A) => (
  payload: ActionPayload[A] = {} as ActionPayload[A]
) => getAction(type, payload);

export const ActionTypes: { [K in keyof ActionPayload]: K } = {
  DATA_FETCH: "DATA_FETCH",
  DATA_FETCH_LOADING: "DATA_FETCH_LOADING",
  DATA_FETCH_SUCCESS: "DATA_FETCH_SUCCESS",
  DATA_FETCH_ERROR: "DATA_FETCH_ERROR",

  DATA_SORT: "DATA_SORT",
  DATA_CHANGE_OFFSET: "DATA_CHANGE_OFFSET",

  DATA_SEARCH: "DATA_SEARCH",
  DATA_SEARCH_LOADING: "DATA_SEARCH_LOADING",
  DATA_SEARCH_SUCCESS: "DATA_SEARCH_SUCCESS",
  DATA_SEARCH_ERROR: "DATA_SEARCH_ERROR",

  DATA_ITEM_ADD: "DATA_ITEM_ADD",
} as const;

export type DataState = StateSchema<
  {
    items: DataItem[];
    offset: number;
    sortOrder: "ASC" | "DESC";
    sortProperty: keyof DataItem | null;
    dataType: "small" | "big";
    searchQuery: string;
    searchResult: number[];
  },
  "fetch" | "search"
>;

export interface RootState {
  data: DataState;
}
