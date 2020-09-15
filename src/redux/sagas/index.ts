import {
  put,
  takeLatest,
  all,
  fork,
  CallEffect,
  select,
} from "redux-saga/effects";
import { ActionTypes, getAction, RootState } from "../types";

import dataSaga from "./data";

export default function* rootSaga() {
  yield all([fork(dataSaga)]);

  const dataType = yield select((state: RootState) => state.data.dataType);
  yield put(getAction(ActionTypes.DATA_FETCH, { dataType }));
}
