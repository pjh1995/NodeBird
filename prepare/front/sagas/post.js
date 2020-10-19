import { all, fork, put, takeLatest } from 'redux-saga/effects';
// import axios from "axios";

import { ADD_POST_TYPE, ADD_COMMENT_TYPE } from '../reducers/post';

// function addPostAPI(data) {
//   return axios.post("/api/login", data);
// }

function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_TYPE.SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_TYPE.FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_TYPE.REQUEST, addPost);
}

function* addComment(action) {
  try {
    // const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_COMMENT_TYPE.SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_TYPE.FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_TYPE.REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment)]);
}
