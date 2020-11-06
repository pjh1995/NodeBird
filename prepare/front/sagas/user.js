import { all, fork, put, takeLatest, delay, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOG_IN_TYPE,
  LOG_OUT_TYPE,
  SIGN_UP_TYPE,
  UNFOLLOW_TYPE,
  FOLLOW_TYPE,
  LOAD_USER_TYPE,
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

function* follow(action) {
  try {
    // const result = yield call(logOutAPI);
    // const result = logOutAPI;;
    yield delay(1000);
    yield put({
      type: FOLLOW_TYPE.SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: FOLLOW_TYPE.FAILURE,
      error: err.response.data,
    });
  }
}

function* unfollow(action) {
  try {
    // const result = yield call(logOutAPI);
    // const result = logOutAPI;
    yield delay(1000);
    yield put({
      type: UNFOLLOW_TYPE.SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: UNFOLLOW_TYPE.FAILURE,
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
export default function* userSaga() {
  yield all([
    fork(watchLoadUser),
    fork(watchLogin),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchUnfollow),
    fork(watchFollow),
  ]);
}
