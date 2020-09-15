declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare interface DataItem {
  uuid: string;

  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  fullAddress: string;

  address: {
    streetAddress: string;
    city: string;
    state: string;
    zip: string;
  };
  description: string;
}

declare type ActionPayload = {
  DATA_FETCH: { dataType: "small" | "big" };
  DATA_FETCH_LOADING: {};
  DATA_FETCH_SUCCESS: DataItem[];
  DATA_FETCH_ERROR: ApiError;

  DATA_SORT: { sortOrder: "ASC" | "DESC"; sortProperty: keyof DataItem };
  DATA_CHANGE_OFFSET: { offset: number };

  DATA_SEARCH: { searchQuery: string };
  DATA_SEARCH_LOADING: {};
  DATA_SEARCH_SUCCESS: { result: number[]; searchQuery: string };
  DATA_SEARCH_ERROR: Error;

  DATA_ITEM_ADD: { item: DataItem };
};

declare type Action<
  A extends keyof ActionPayload = keyof ActionPayload
> = A extends keyof ActionPayload
  ? { type: A; payload: ActionPayload[A] }
  : never;

declare type StateSchema<T, A extends string = null> = {
  action: A | null;
  error: ApiError | null;
} & T;

declare type DataStatus = "idle" | "loading" | "success" | "error";

declare type ApiError = { message: string; statusCode: number };
