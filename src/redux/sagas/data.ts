import {
  take,
  all,
  fork,
  cancel,
  race,
  put,
  call,
  takeLatest,
  select,
} from "redux-saga/effects";
import { ActionTypes, getAction, RootState } from "../types";
import * as api from "../../api";

const searchItems = async (query: string, items: DataItem[]) => {
  const result: number[] = [];
  items.forEach((item, i) => {
    if (
      Object.values({
        ...item,
        address: [
          item.address.state,
          item.address.city,
          item.address.streetAddress,
          item.address.zip,
        ].join(", "),
      })
        .join(" ")
        .toLowerCase()
        .includes(query)
    )
      result.push(i);
  });

  return result;
};

function* dataSearch(query?: string) {
  const { items, searchQuery } = yield select((state: RootState) => state.data);

  const newQuery = (query === undefined ? searchQuery : query)
    .trim()
    .toLowerCase();

  try {
    yield put(getAction(ActionTypes.DATA_SEARCH_LOADING));
    const result = yield call(searchItems, newQuery, items);
    yield put(
      getAction(ActionTypes.DATA_SEARCH_SUCCESS, {
        result,
        searchQuery: newQuery,
      })
    );
  } catch (err) {
    yield put(getAction(ActionTypes.DATA_SEARCH_ERROR, err));
  }
}

export default function* watchSagas() {
  yield takeLatest(ActionTypes.DATA_FETCH, dataFetch);
  yield takeLatest(ActionTypes.DATA_FETCH_SUCCESS, function* () {
    yield call(dataSearch);
  });
  yield takeLatest(ActionTypes.DATA_SEARCH, function* (
    action: Action<typeof ActionTypes.DATA_SEARCH>
  ) {
    yield call(dataSearch, action.payload.searchQuery);
  });
}

function* dataFetch(action: Action<typeof ActionTypes.DATA_FETCH>) {
  try {
    yield put(getAction(ActionTypes.DATA_FETCH_LOADING));

    let data: DataItem[];
    if (action.payload.dataType === "small")
      data = (yield call(api.getSmallData)) as DataItem[];
    else data = (yield call(api.getBigData)) as DataItem[];

    yield put(getAction(ActionTypes.DATA_FETCH_SUCCESS, data));
  } catch (err) {
    yield put(getAction(ActionTypes.DATA_FETCH_ERROR, err));
  }
}
