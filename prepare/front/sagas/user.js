import { all, fork, put, takeLatest, delay } from "redux-saga/effects";
// import axios from "axios";
import { LOG_IN_TYPE, LOG_OUT_TYPE } from "../reducers/user";

// function logInAPI(data) {
//   //   return axios.post("/api/login", data);
// }

function* logIn(action) {
  try {
    console.log("saga login");
    // const result = yield call(logInAPI, action.data); 서버 생기기 전까지 우선 주석
    yield delay(1000);
    yield put({
      type: LOG_IN_TYPE.SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_TYPE.FAILURE,
      data: err.response.data,
    });
  }
}

// function logOutAPI() {
//   //  return axios.post("/api/logout");
// }

function* logOut() {
  try {
    //const result = yield call(logOutAPI);
    // const result = logOutAPI;
    yield delay(1000);
    yield put({
      type: LOG_OUT_TYPE.SUCCESS,
      data: true,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_TYPE.FAILURE,
      data: err.response.data,
    });
  }
}

function* watchLogin() {
  yield takeLatest(LOG_IN_TYPE.REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_TYPE.REQUEST, logOut);
}

export default function* userSaga() {
  console.log("ddassadasdsda");
  yield all([fork(watchLogin), fork(watchLogOut)]);
}
