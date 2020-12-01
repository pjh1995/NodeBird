import {
  all,
  fork,
  // call,
  // take,
  // put,
  // takeEvery,
  // takeLatest,
  // throttle,
  // delay,
} from 'redux-saga/effects';
import axios from 'axios';

import postSaga from './post';
import userSaga from './user';

import { backUrl } from '../config/config';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true; // 쿠키전달할 때 필요

// put === dispatch

// fork 비동기 함수 호출
// call 동기 함수 호출

// take 이벤트리스너 역할 :: 단 한번만 실행 가능 로그인 -> 로그아웃 -> 로그인(불가!!!)
// takeEvery === while(true) :: 실수로 2번 눌리는 경우...? post 2개 생성..ㅠㅠ
// takeLatest 동시 실행시 맨 마지막에 실행된 이벤트의 요청만 받아옴 <--> takeLeading :: 서버에 요청은 모두감! 서버에서도 처리를 해줘야함.
// throttle(event,function,time) 한번 요청을 받으면 time동안은 요청을 받지않음 === 쿨타임
// delay === setTimeOut
// all addListner

// throttleing :: 마지막 함수가 호출 된 후 쿨타임을 줌 === throttle
// debouncing :: 연이어 호출되는 함수들 중 마지막(또는 맨 처음) 함수만 호출하는 것 == takeLatest,takeLeading(얘넨 호출은 함, 응답을 막음)

// const l = login({ type: "LOGIN_IN_REQUEST", data: { id: "jhpark@gmail.com" } });
// l.next();1
// test하기에 최고

export default function* rootSaga() {
  console.log('rootSaga');
  yield all([fork(postSaga), fork(userSaga)]);
}
