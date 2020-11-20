import { all, fork, put, takeLatest, delay, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOG_IN,
  LOG_OUT,
  SIGN_UP,
  UNFOLLOW,
  FOLLOW,
  LOAD_USER,
  CHANGE_NICKNAME,
  LOAD_FOLLOWINGS,
  LOAD_FOLLOWERS,
  BLOCK_FOLLOWER,
  LOAD_MY_INFO,
} from '../reducers/user';

function loadMyInfoAPI() {
  return axios.get('/user');
}

function* loadMyInfo(action) {
  try {
    const result = yield call(loadMyInfoAPI, action.data);
    yield put({
      type: LOAD_MY_INFO.SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_MY_INFO.FAILURE,
      error: err.response.data,
    });
  }
}

function loadUserAPI(data) {
  return axios.get(`/user/${data}`);
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put({
      type: LOAD_USER.SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_USER.FAILURE,
      error: err.response.data,
    });
  }
}

function logInAPI(data) {
  return axios.post('/user/login', data);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    console.log(result);
    yield put({
      type: LOG_IN.SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN.FAILURE,
      error: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post('/user/logout');
}

function* logOut() {
  try {
    yield call(logOutAPI);
    yield put({
      type: LOG_OUT.SUCCESS,
      data: true,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT.FAILURE,
      error: err.response.data,
    });
  }
}

function signUpAPI(data) {
  return axios.post('/user', data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    console.log(result);
    yield put({
      type: SIGN_UP.SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGN_UP.FAILURE,
      error: err.response.data,
    });
  }
}

function followAPI(data) {
  return axios.patch(`/user/${data}/follow`);
}

function* follow(action) {
  try {
    const result = yield call(followAPI, action.data);
    yield delay(1000);
    yield put({
      type: FOLLOW.SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: FOLLOW.FAILURE,
      error: err.response.data,
    });
  }
}

function unFollowAPI(data) {
  return axios.delete(`/user/${data}/follow`);
}
function* unfollow(action) {
  try {
    const result = yield call(unFollowAPI, action.data);
    yield delay(1000);
    yield put({
      type: UNFOLLOW.SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UNFOLLOW.FAILURE,
      error: err.response.data,
    });
  }
}

function loadFollowingsAPI(data) {
  return axios.get('/user/followings', data);
}
function* loadFollowings(action) {
  try {
    const result = yield call(loadFollowingsAPI, action.data);
    yield delay(1000);
    yield put({
      type: LOAD_FOLLOWINGS.SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_FOLLOWINGS.FAILURE,
      error: err.response.data,
    });
  }
}

function loadFollowersAPI(data) {
  return axios.get('/user/followers', data);
}
function* loadFollowers(action) {
  try {
    const result = yield call(loadFollowersAPI, action.data);
    yield delay(1000);
    yield put({
      type: LOAD_FOLLOWERS.SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_FOLLOWERS.FAILURE,
      error: err.response.data,
    });
  }
}

function blockFollowerAPI(data) {
  return axios.delete(`/user/follower/${data}`);
}
function* blockFollower(action) {
  try {
    const result = yield call(blockFollowerAPI, action.data);
    yield delay(1000);
    yield put({
      type: BLOCK_FOLLOWER.SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: BLOCK_FOLLOWER.FAILURE,
      error: err.response.data,
    });
  }
}

function changeNicknameAPI(data) {
  return axios.patch('/user/nickname', { nickname: data });
}

function* changeNickname(action) {
  try {
    const result = yield call(changeNicknameAPI, action.data);
    yield put({
      type: CHANGE_NICKNAME.SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: CHANGE_NICKNAME.FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO.REQUEST, loadMyInfo);
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER.REQUEST, loadUser);
}

function* watchLogin() {
  yield takeLatest(LOG_IN.REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT.REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP.REQUEST, signUp);
}

function* watchFollow() {
  yield takeLatest(FOLLOW.REQUEST, follow);
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW.REQUEST, unfollow);
}

function* watchLoadFollowings() {
  yield takeLatest(LOAD_FOLLOWINGS.REQUEST, loadFollowings);
}

function* watchLoadFollowers() {
  yield takeLatest(LOAD_FOLLOWERS.REQUEST, loadFollowers);
}

function* watchBlockFollower() {
  yield takeLatest(BLOCK_FOLLOWER.REQUEST, blockFollower);
}

function* watchChangeNickname() {
  yield takeLatest(CHANGE_NICKNAME.REQUEST, changeNickname);
}

export default function* userSaga() {
  yield all([
    fork(watchChangeNickname),
    fork(watchLoadMyInfo),
    fork(watchLoadUser),
    fork(watchLogin),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchUnfollow),
    fork(watchFollow),
    fork(watchLoadFollowings),
    fork(watchLoadFollowers),
    fork(watchBlockFollower),
  ]);
}
