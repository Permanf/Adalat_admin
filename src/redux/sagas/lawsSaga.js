// import toast from 'react-hot-toast'
import toast from "react-hot-toast";
import i18n from "i18next";
import { takeLatest, call, put } from "redux-saga/effects";
import { setLoading, setRedirect } from "../reducers/mainReducer";
import api from "../../services/api.service";

import {
  addLaw,
  setLaw,
  setLaws,
  setLawFile,
  setLawConfirmDepartments,
  setLastUpdated,
  setFiles,
} from "../actions/lawsAction";

import {
  ADD_LAW_FILE_IMAGE,
  DELETE_LAW,
  DELETE_LAW_FILE,
  GET_FILES,
  GET_LAST_UPDATED,
  GET_LAW,
  GET_LAW_FILE,
  LOAD_LAWS,
  LOAD_LAW_CONFIRM_DEPARTMENTS,
  POST_LAW,
  POST_LAW_CATEGORY,
  PUT_LAW,
  PUT_LAW_CATEGORY,
  SAVE_LAST_UPDATED,
} from "../types/lawsTypes";

function* getFilesWorker(action) {
  try {
    const result = yield call(api.get, `/law/${action.payload}/documents`);
    yield put(setFiles(result.data.files));
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));

    // console.log(err)
  }
}

function* loadLawsWorker(action) {
  try {
    const result = yield call(api.get, `laws?page=${action.payload}`);

    yield put(setLaws(result.data));
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));

    console.log(err);
  }
}

function* loadLawConfirmDepartmentsWorker() {
  try {
    const result = yield call(api.get, "law_confirm_department");

    yield put(setLawConfirmDepartments(result.data.data));
  } catch (err) {
    console.log(err);
  }
}

function* getLawWorker(action) {
  try {
    const result = yield call(api.get, `laws/${action.payload}`);

    yield put(setLaw(result.data.data));
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));

    console.log(err);
  }
}

function* getLawFileWorker(action) {
  try {
    const result = yield call(api.get, `law/${action.payload}/file`);
    console.log(result);

    yield put(setLawFile(result.data.data));
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));

    console.log(err);
  }
}

function* postLawCategoryWorker(action) {
  try {
    const data = {
      title: {
        tm: action.payload.tm,
        ru: action.payload.ru,
        en: action.payload.en,
      },
    };
    const result = yield call(api.post, "laws", data);

    yield put(addLaw(result.data.law));
    yield put(setLoading(false));

    toast.success(i18n.t("success_added"), {
      duration: 2000,
    });
  } catch (err) {
    console.log(err);
  }
}

function* putLawCategoryWorker(action) {
  try {
    const data = {
      title: {
        tm: action.payload.title.tm,
        ru: action.payload.title.ru,
        en: action.payload.title.en,
      },
    };
    const result = yield call(api.put, `laws/${action.payload.id}`, data);

    yield put(setLoading(false));

    toast.success(i18n.t("success_saved"), {
      duration: 2000,
    });
  } catch (err) {
    console.log(err);
  }
}

function* deleteLawCategoryWorker(action) {
  try {
    yield call(api.delete, `laws/${action.payload}`);
    yield put(setLoading(false));

    toast.success(i18n.t("success_deleted"), {
      duration: 2000,
    });
  } catch (err) {
    yield put(setLoading(false));

    toast.error(i18n.t("success_deleted"), {
      duration: 2000,
    });

    console.log(err);
  }
}

function* postLawWorker(action) {
  try {
    const result = yield call(
      api.post,
      `laws/${action.payload.id}/file`,
      action.payload
    );

    yield put(addLaw(result.data.law));
    yield put(setLoading(false));
    yield put(setRedirect(false));

    toast.success(i18n.t("success_added"), {
      duration: 2000,
    });
  } catch (err) {
    console.log(err);
  }
}

function* putLawWorker(action) {
  try {
    const result = yield call(
      api.put,
      `law/${action.payload.id}/file`,
      action.payload
    );

    // yield put(addLaw(result.data.law))
    yield put(setLoading(false));
    yield put(setRedirect(false));

    toast.success(i18n.t("success_added"), {
      duration: 2000,
    });
  } catch (err) {
    yield put(setLoading(false));
    yield put(setRedirect(false));

    toast.error(i18n.t("error_not_saved"), {
      duration: 2000,
    });

    console.log(err);
  }
}

function* addImageLawFileWorker(action) {
  const formData = new FormData();
  formData.append("image", action.payload.image);

  try {
    const result = yield call(
      api.post,
      `law/${action.payload.id}/image/save`,
      formData
    );

    yield put(setLoading(false));
    yield put(setRedirect(false));

    toast.success(i18n.t("success_added"), {
      duration: 2000,
    });
  } catch (err) {
    yield put(setLoading(false));
    yield put(setRedirect(false));

    toast.error(i18n.t("error_not_added"), {
      duration: 2000,
    });

    console.log(err);
  }
}

function* deleteLawFileWorker(action) {
  try {
    yield call(api.delete, `laws/${action.payload}/file`);
    yield put(setLoading(false));
    yield put(setRedirect(false));

    toast.success(i18n.t("success_deleted"), {
      duration: 2000,
    });
  } catch (err) {
    yield put(setLoading(false));
    yield put(setRedirect(false));

    toast.error(i18n.t("error_not_deleted"), {
      duration: 2000,
    });

    console.log(err);
  }
}

function* getLastUpdatedWorker() {
  try {
    const result = yield call(api.get, "law/last_updated");

    yield put(setLastUpdated(result.data));
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));

    console.log(err);
  }
}

function* saveLastUpdatedWorker(action) {
  try {
    const result = yield call(api.post, "law/last_updated", {
      last_updated: action.payload,
    });

    yield put(setLastUpdated(result.data.last_updated));
    yield put(setLoading(false));

    toast.success(i18n.t("success_saved"), {
      duration: 2000,
    });
  } catch (err) {
    yield put(setLoading(false));

    toast.error(i18n.t("errot_not_saved"), {
      duration: 2000,
    });

    console.log(err);
  }
}

export function* getFilesWatcher() {
  yield takeLatest(GET_FILES, getFilesWorker);
}

export function* loadLawsWatcher() {
  yield takeLatest(LOAD_LAWS, loadLawsWorker);
}

export function* loadLawConfirmDepartmentsWatcher() {
  yield takeLatest(
    LOAD_LAW_CONFIRM_DEPARTMENTS,
    loadLawConfirmDepartmentsWorker
  );
}

export function* getLawWatcher() {
  yield takeLatest(GET_LAW, getLawWorker);
}

export function* getLawFileWatcher() {
  yield takeLatest(GET_LAW_FILE, getLawFileWorker);
}

export function* postLawCategoryWatcher() {
  yield takeLatest(POST_LAW_CATEGORY, postLawCategoryWorker);
}

export function* putLawCategoryWatcher() {
  yield takeLatest(PUT_LAW_CATEGORY, putLawCategoryWorker);
}

export function* addImageLawFileWatcher() {
  yield takeLatest(ADD_LAW_FILE_IMAGE, addImageLawFileWorker);
}

export function* deleteLawCategoryWatcher() {
  yield takeLatest(DELETE_LAW, deleteLawCategoryWorker);
}

export function* postLawWatcher() {
  yield takeLatest(POST_LAW, postLawWorker);
}

export function* putLawWatcher() {
  yield takeLatest(PUT_LAW, putLawWorker);
}

export function* deleteLawFileWatcher() {
  yield takeLatest(DELETE_LAW_FILE, deleteLawFileWorker);
}

export function* getLastUpdatedWatcher() {
  yield takeLatest(GET_LAST_UPDATED, getLastUpdatedWorker);
}

export function* saveLastUpdatedWatcher() {
  yield takeLatest(SAVE_LAST_UPDATED, saveLastUpdatedWorker);
}
