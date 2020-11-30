import React from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
// import { END } from 'redux-saga';

import AppLayout from '../components/AppLayout';
import UserCard from '../components/UserCard';

// import wrapper from '../store/configureStore';
// import { LOAD_USER } from '../reducers/user';

const About = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <AppLayout>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      {userInfo ? <UserCard User={userInfo} /> : null}
    </AppLayout>
  );
};

// 웬만하면 안바뀌는 정보들을 브라우저 렌더링 전에 받아올 때 사용
// html로 만들어놔 줌.
// export const getStaticProps = wrapper.getStaticProps(async (context) => {
//   context.store.dispatch({
//     type: LOAD_USER.REQUEST,
//     data: 1,
//   });
//   context.store.dispatch(END);
//   await context.store.sagaTask.toPromise();
// });

export default About;
