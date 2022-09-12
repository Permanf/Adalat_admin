import { takeLatest, put, call } from "redux-saga/effects";
import api from "../../services/api.service";
import { setYears } from "../actions/yearAction";
import { LOAD_YEARS } from "../types/yearTypes";

function* loadYearsWorker() {
  const result = yield call(api.get, "years");

  yield put(setYears(result.data.data));
}

export function* loadYearsWatcher() {
  yield takeLatest(LOAD_YEARS, loadYearsWorker);
}
