import { createWrapper } from "next-redux-wrapper";
import { createStore, compose, applyMiddleware } from "redux"; //중앙 데이터 저장소 역할
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "../reducers";

const configureStore = () => {
  const middlewares = [];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  //composeWithDevTools redux chrome_extension을 사용가능. 보안문제 때문에 develop에서만 사용
  //applyMiddleware([]) --> TypeError: middleware is not a function
  const store = createStore(reducer, enhancer);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;

//redux :: 코드량은 많지만 앱이 안정적
//모벡스? :: 코드량은 줄지만 실수하면 큰일남 ( 전문가용 )

//비동기 : 요청,성공,실패
//컴포넌트에서는 데이터 불러오는거랑 분리하는게 좋다!
//중앙 저장소도 쪼개야한다.
