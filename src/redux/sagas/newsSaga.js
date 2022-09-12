import i18n from "i18next";
import toast from "react-hot-toast";
import { takeLatest, put, call } from "redux-saga/effects";
import api from "../../services/api.service";
import { setNews, setNewsItem } from "../actions/newsAction";
import { setLoading, setRedirect } from "../reducers/mainReducer";
import {
  GET_NEWS_ITEM,
  LOAD_NEWS,
  POST_NEWS,
  PUT_NEWS,
  REMOVE_NEWS,
} from "../types/newsTypes";

function* loadNewsWorker(action) {
  console.log("get");
  const result = yield call(api.get, `news?page=${action.payload}`);

  yield put(setNews(result.data));
}

function* getNewsItemWorker(action) {
  console.log("get1");

  try {
    const result = yield call(api.get, `news/${action.payload}`);

    yield put(setNewsItem(result.data.data));
  } catch (err) {
    console.log(err);
  }
}

function* postNewsWorker(action) {
  const formData = new FormData();

  formData.append("title", JSON.stringify(action.payload.title));
  formData.append("text", JSON.stringify(action.payload.text));
  formData.append("image", action.payload.image);
  formData.append("main", action.payload.main);
  formData.append("published", action.payload.published);
  formData.append("published_at", action.payload.publishedAt);

  for (var pair of formData.entries()) {
    console.log(pair[0] + ", " + JSON.stringify(pair[1]));
  }

  try {
    const result = yield call(api.post, "news", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: function (event) {
        const progress = (event.loaded / event.total) * 100;
      },
    });
    yield put(setLoading(false));
    yield put(setRedirect(true));
    yield put(setRedirect(false));
    toast.success(i18n.t("success_added"), {
      duration: 2000,
    });
  } catch (err) {
    yield put(setLoading(false));

    toast.error(i18n.t("error_not_added"), {
      duration: 2000,
    });

    console.log(err);
  }
}

function* putNewsWorker(action) {
  const data = {
    title: action.payload.title,
    text: action.payload.text,
    main: action.payload.main,
    published: action.payload.published,
    published_at: action.payload.published_at,
  };

  try {
    yield call(api.put, `news/${action.payload.id}`, data);

    yield put(setLoading(false));
    yield put(setRedirect(false));

    toast.success(i18n.t("success_added"), {
      duration: 2000,
    });
  } catch (err) {
    yield put(setLoading(false));

    toast.error(i18n.t("error_not_saved"), {
      duration: 2000,
    });

    console.log(err);
  }
}

function* removeNewsWorker(action) {
  try {
    yield call(api.delete, `news/${action.payload}`);

    yield put(setLoading(false));

    toast.success(i18n.t("success_deleted"), {
      duration: 2000,
    });

    yield put(setRedirect(true));
    yield put(setRedirect(false));
  } catch (err) {
    yield put(setLoading(false));

    toast.error(i18n.t("error_not_deleted"), {
      duration: 2000,
    });

    console.log(err);
  }
}

export function* loadNewsWatcher() {
  yield takeLatest(LOAD_NEWS, loadNewsWorker);
}

export function* getNewsItemWatcher() {
  yield takeLatest(GET_NEWS_ITEM, getNewsItemWorker);
}

export function* postNewsWatcher() {
  yield takeLatest(POST_NEWS, postNewsWorker);
}

export function* putNewsWatcher() {
  yield takeLatest(PUT_NEWS, putNewsWorker);
}

export function* removeNewsWatcher() {
  yield takeLatest(REMOVE_NEWS, removeNewsWorker);
}
