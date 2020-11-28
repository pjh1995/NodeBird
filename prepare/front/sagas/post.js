import { all, fork, put, takeLatest, throttle, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  ADD_POST,
  REMOVE_POST,
  ADD_COMMENT,
  LOAD_POSTS,
  LOAD_POST,
  LIKE_POST,
  UN_LIKE_POST,
  UPLOAD_IMAGES,
  RETWEET_POST,
  LOAD_USER_POSTS,
  LOAD_HASHTAG_POSTS,
} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

function loadPostAPI(data) {
  return axios.get(`/post/${data}`);
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data);
    yield put({
      type: LOAD_POST.SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_POST.FAILURE,
      error: err.response ? err.response.data : err,
    });
  }
}

function loadPostsAPI(lastId) {
  return axios.get(`/posts?lastId=${lastId || 0}`);
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.lastId);
    yield put({
      type: LOAD_POSTS.SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_POSTS.FAILURE,
      error: err.response ? err.response.data : err,
    });
  }
}

function loadUserPostsAPI(data, lastId) {
  return axios.get(`/user/${data}/posts?lastId=${lastId || 0}`);
}

function* loadUserPosts(action) {
  try {
    const result = yield call(loadUserPostsAPI, action.data, action.lastId);
    yield put({
      type: LOAD_USER_POSTS.SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_USER_POSTS.FAILURE,
      error: err.response ? err.response.data : err,
    });
  }
}

function loadHashtagPostsAPI(data, lastId) {
  return axios.get(`/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`);
}

function* loadHashtagPosts(action) {
  try {
    const result = yield call(loadHashtagPostsAPI, action.data, action.lastId);
    yield put({
      type: LOAD_HASHTAG_POSTS.SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_HASHTAG_POSTS.FAILURE,
      error: err.response ? err.response.data : err,
    });
  }
}

function addPostAPI(data) {
  return axios.post('/post', data); // formData는 {content:data} 요론 식으로 감싸면 절대 안됨.
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST.SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: ADD_POST.FAILURE,
      error: err.response ? err.response.data : err,
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
      type: REMOVE_POST.SUCCESS,
      data: result.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST.FAILURE,
      error: err.response ? err.response.data : err,
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
      type: ADD_COMMENT.SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_COMMENT.FAILURE,
      error: err.response ? err.response.data : err,
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
      type: LIKE_POST.SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_POST.FAILURE,
      error: err.response ? err.response.data : err,
    });
  }
}

function unLikePostAPI(data) {
  return axios.delete(`/post/${data}/like`);
}

function* unLikePost(action) {
  try {
    const result = yield call(unLikePostAPI, action.data);
    yield put({
      type: UN_LIKE_POST.SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UN_LIKE_POST.FAILURE,
      error: err.response ? err.response.data : err,
    });
  }
}

function uploadImagesAPI(data) {
  return axios.post('/post/images', data);
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES.SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_IMAGES.FAILURE,
      error: err.response ? err.response.data : err,
    });
  }
}

function retweetPostAPI(data) {
  return axios.post(`/post/${data}/retweet`);
}

function* retweetPost(action) {
  try {
    const result = yield call(retweetPostAPI, action.data);
    yield put({
      type: RETWEET_POST.SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: RETWEET_POST.FAILURE,
      error: err.response ? err.response.data : err,
    });
  }
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST.REQUEST, loadPost);
}

function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS.REQUEST, loadPosts);
}

function* watchLoadUserPosts() {
  yield throttle(5000, LOAD_USER_POSTS.REQUEST, loadUserPosts);
}

function* watchLoadHashtagPosts() {
  yield throttle(5000, LOAD_HASHTAG_POSTS.REQUEST, loadHashtagPosts);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST.REQUEST, addPost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST.REQUEST, removePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT.REQUEST, addComment);
}

function* watchUnLikePost() {
  yield takeLatest(UN_LIKE_POST.REQUEST, unLikePost);
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST.REQUEST, likePost);
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES.REQUEST, uploadImages);
}

function* watchRetweetPost() {
  yield takeLatest(RETWEET_POST.REQUEST, retweetPost);
}

export default function* postSaga() {
  yield all([
    fork(watchUploadImages),
    fork(watchLikePost),
    fork(watchUnLikePost),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
    fork(watchLoadPosts),
    fork(watchLoadUserPosts),
    fork(watchLoadHashtagPosts),
    fork(watchLoadPost),
    fork(watchRetweetPost),
  ]);
}
