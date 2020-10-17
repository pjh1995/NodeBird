import { all, fork, call, put, throttle } from "redux-saga/effects";
import axios from "axios";

import { ADD_POST_TYPE } from "../reducers/post";

function addPostAPI(data) {
  return axios.post("/api/login", data);
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_TYPE.SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_TYPE.FAILURE,
      data: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield throttle(ADD_POST_TYPE.REQUEST, addPost, 2000);
}

export default function* postSaga() {
  //   yield all([fork(watchAddPost)]);
}
