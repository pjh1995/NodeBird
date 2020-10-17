import {
  all,
  fork,
  call,
  // take,
  put,
  // takeEvery,
  takeLatest,
  throttle,
  delay,
} from "redux-saga/effects";
//put === dispatch

//fork 비동기 함수 호출
//call 동기 함수 호출

//take 이벤트리스너 역할 :: 단 한번만 실행 가능 로그인 -> 로그아웃 -> 로그인(불가!!!)
//takeEvery === while(true) :: 실수로 2번 눌리는 경우...? post 2개 생성..ㅠㅠ
//takeLatest 동시 실행시 맨 마지막에 실행된 이벤트의 요청만 받아옴 <--> takeLeading :: 서버에 요청은 모두감! 서버에서도 처리를 해줘야함.
//throttle(event,function,time) 한번 요청을 받으면 time동안은 요청을 받지않음 === 쿨타임
//delay === setTimeOut
//all addListner

//throttleing :: 마지막 함수가 호출 된 후 쿨타임을 줌 === throttle
//debouncing :: 연이어 호출되는 함수들 중 마지막(또는 맨 처음) 함수만 호출하는 것 == takeLastest,takeLeading(얘넨 호출은 함, 응답을 막음)

import axios from "axios";

function logInAPI(data) {
  return axios.post("/api/login", data);
}

// const l = login({ type: "LOGIN_IN_REQUEST", data: { id: "jhpark@gmail.com" } });
// l.next();1
// test하기에 최고
function* logIn(action) {
  try {
    // const result = yield call(logInAPI, action.data); 서버 생기기 전까지 우선 주석
    yield delay(1000);
    yield put({
      type: "LOG_IN_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_IN_FAILURE",
      data: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post("/api/logout");
}

function* logOut() {
  try {
    //const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({
      type: "LOG_OUT_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_OUT_FAILURE",
      data: err.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post("/api/login", data);
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: "ADD_POST_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "ADD_POST_FAILURE",
      data: err.response.data,
    });
  }
}
function* watchLogin() {
  yield takeLatest("LOG_IN_REQUEST", logIn);
}

function* watchLogOut() {
  yield takeLatest("LOG_OUT_REQUEST", logOut);
}

function* watchAddPost() {
  yield throttle("ADD_POST_REQUEST", addPost, 2000);
}

export default function* rootSaga() {
  yield all([fork(watchLogin), fork(watchLogOut), fork(watchAddPost)]);
}
