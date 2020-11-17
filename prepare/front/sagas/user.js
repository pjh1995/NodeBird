import { all, fork, put, takeLatest, delay, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOG_IN_TYPE,
  LOG_OUT_TYPE,
  SIGN_UP_TYPE,
  UNFOLLOW_TYPE,
  FOLLOW_TYPE,
  LOAD_USER_TYPE,
  CHANGE_NICKNAME_TYPE,
  LOAD_FOLLOWINGS_TYPE,
  LOAD_FOLLOWERS_TYPE,
} from '../reducers/user';

function loadUserAPI() {
  return axios.get('/user');
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put({
      type: LOAD_USER_TYPE.SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_USER_TYPE.FAILURE,
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
      type: LOG_IN_TYPE.SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_TYPE.FAILURE,
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
      type: LOG_OUT_TYPE.SUCCESS,
      data: true,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_TYPE.FAILURE,
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
      type: SIGN_UP_TYPE.SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGN_UP_TYPE.FAILURE,
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
      type: FOLLOW_TYPE.SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: FOLLOW_TYPE.FAILURE,
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
      type: UNFOLLOW_TYPE.SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UNFOLLOW_TYPE.FAILURE,
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
      type: LOAD_FOLLOWINGS_TYPE.SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_FOLLOWINGS_TYPE.FAILURE,
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
      type: LOAD_FOLLOWERS_TYPE.SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_FOLLOWERS_TYPE.FAILURE,
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
      type: CHANGE_NICKNAME_TYPE.SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: CHANGE_NICKNAME_TYPE.FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_TYPE.REQUEST, loadUser);
}

function* watchLogin() {
  yield takeLatest(LOG_IN_TYPE.REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_TYPE.REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_TYPE.REQUEST, signUp);
}

function* watchFollow() {
  yield takeLatest(FOLLOW_TYPE.REQUEST, follow);
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_TYPE.REQUEST, unfollow);
}

function* watchLoadFollowings() {
  yield takeLatest(LOAD_FOLLOWINGS_TYPE.REQUEST, loadFollowings);
}

function* watchLoadFollowers() {
  yield takeLatest(LOAD_FOLLOWERS_TYPE.REQUEST, loadFollowers);
}

function* watchChangeNickname() {
  yield takeLatest(CHANGE_NICKNAME_TYPE.REQUEST, changeNickname);
}

export default function* userSaga() {
  yield all([
    fork(watchChangeNickname),
    fork(watchLoadUser),
    fork(watchLogin),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchUnfollow),
    fork(watchFollow),
    fork(watchLoadFollowings),
    fork(watchLoadFollowers),
  ]);
}
