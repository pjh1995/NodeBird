import { createWrapper } from "next-redux-wrapper";
import { createStore } from "redux"; //중앙 데이터 저장소 역할

const configureStore = () => {
  const store = createStore(reducer);
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
