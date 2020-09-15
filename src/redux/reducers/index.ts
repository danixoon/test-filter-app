import { Reducer, combineReducers } from "redux";
import { RootState } from "../types";

import { dataReducer } from "./data";

const rootReducer: Reducer<RootState, Action> = combineReducers({
  data: dataReducer,
});

export default rootReducer;
