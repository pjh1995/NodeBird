import { all, fork, put, takeLatest, throttle, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  ADD_POST_TYPE,
  REMOVE_POST_TYPE,
  ADD_COMMENT_TYPE,
  LOAD_POSTS_TYPE,
  LIKE_POST_TYPE,
  UN_LIKE_POST_TYPE,
} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

function loadPostAPI(data) {
  return axios.get('/posts', data);
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostAPI, action.data);
    yield put({
      type: LOAD_POSTS_TYPE.SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_POSTS_TYPE.FAILURE,
      error: err.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post('/post', { content: data });
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_TYPE.SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_TYPE.FAILURE,
      error: err.response.data,
    });
  }
}

function removePostAPI(data) {
  return axios.delete(`/post/${data}`);
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_TYPE.SUCCESS,
      data: result.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_TYPE.FAILURE,
      error: err.response.data,
    });
  }
}

function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_TYPE.SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_COMMENT_TYPE.FAILURE,
      error: err.response.data,
    });
  }
}

function likePostAPI(data) {
  return axios.patch(`/post/${data}/like`);
}

function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);
    yield put({
      type: LIKE_POST_TYPE.SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_POST_TYPE.FAILURE,
      error: err.response.data,
    });
  }
}

function unLikePostAPI(data) {
  return axios.patch(`/post/${data}/unlike`);
}

function* unLikePost(action) {
  try {
    const result = yield call(unLikePostAPI, action.data);
    yield put({
      type: UN_LIKE_POST_TYPE.SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UN_LIKE_POST_TYPE.FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_TYPE.REQUEST, loadPosts);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_TYPE.REQUEST, addPost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_TYPE.REQUEST, removePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_TYPE.REQUEST, addComment);
}

function* watchUnLikePost() {
  yield takeLatest(UN_LIKE_POST_TYPE.REQUEST, unLikePost);
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_TYPE.REQUEST, likePost);
}
export default function* postSaga() {
  yield all([
    fork(watchLikePost),
    fork(watchUnLikePost),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
    fork(watchLoadPosts),
  ]);
}
