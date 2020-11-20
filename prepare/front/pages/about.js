import React from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { END } from 'redux-saga';

import { Avatar, Card } from 'antd';
import AppLayout from '../components/AppLayout';
import wrapper from '../store/configureStore';
import { LOAD_USER } from '../reducers/user';

const About = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <AppLayout>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      {userInfo ? (
        <Card
          actions={[
            <div key="twit">
              짹짹
              <br />
              {userInfo.Posts ? userInfo.Posts.length : 0}
            </div>,
            <div key="followings">
              팔로잉
              <br />
              {userInfo.Followings ? userInfo.Followings.length : 0}
            </div>,
            <div key="follower">
              팔로워
              <br />
              {userInfo.Followers ? userInfo.Followers.length : 0}
            </div>,
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
            title={userInfo.nickname}
            description="노드버드 매니아"
          />
        </Card>
      ) : null}
    </AppLayout>
  );
};

// 웬만하면 안바뀌는 정보들을 브라우저 렌더링 전에 받아올 때 사용
// html로 만들어놔 줌.
export const getStaticProps = wrapper.getStaticProps(async (context) => {
  context.store.dispatch({
    type: LOAD_USER.REQUEST,
    data: 1,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default About;
