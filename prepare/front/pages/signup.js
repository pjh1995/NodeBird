import React, { useCallback, useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';

import { Form, Checkbox, Button } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import { END } from 'redux-saga';
import FormInput from '../components/FormInput';
import AppLayout from '../components/AppLayout';

import useInput from '../hooks/useInput';
import { SIGN_UP, LOAD_MY_INFO } from '../reducers/user';
import wrapper from '../store/configureStore';

const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, sighUpError, me } = useSelector(
    (state) => state.user,
  );

  useEffect(() => {
    if (me && me.id) {
      Router.push('/');
    }
  }, [me && me.id]);

  useEffect(() => {
    if (signUpDone) {
      Router.push('/');
    }
  }, [signUpDone]);

  useEffect(() => {
    if (sighUpError) {
      alert(sighUpError);
    }
  }, [sighUpError]);

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, onChangePasswordCheck] = useInput('');
  const [term, setTerm] = useState('');
  const [error, setError] = useState(null);

  const ErrorMsgStyle = useMemo(() => {
    return { color: 'red' };
  }, []);

  const onSubmit = useCallback(() => {
    setError('');
    if (!email || !nickname || !password) {
      setError('모든 값을 입력해주세요');
    } else if (password !== passwordCheck) {
      setError('패스워드가 일치하지 않습니다.');
    } else if (!term) {
      setError('약관에 동의해야만 회원가입이 가능합니다.');
    } else {
      dispatch({
        type: SIGN_UP.REQUEST,
        data: { email, password, nickname },
      });
    }
  }, [email, password, passwordCheck, term]);

  const onChangeTerm = useCallback(
    (e) => {
      setTerm(e.target.checked);
    },
    [term],
  );

  return (
    <AppLayout>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <FormInput
          inputName="user-email"
          type={email}
          labelText="이메일"
          onChange={onChangeEmail}
          value={email}
        />
        <FormInput
          inputName="user-nickname"
          labelText="닉네임"
          onChange={onChangeNickname}
          value={nickname}
        />
        <FormInput
          inputName="user-password"
          labelText="비밀번호"
          onChange={onChangePassword}
          value={password}
        />
        <FormInput
          inputName="user-password-check"
          labelText="비밀번호 확인"
          onChange={onChangePasswordCheck}
          value={passwordCheck}
        />
        <div>
          <Checkbox name="user-term" onChange={onChangeTerm} checked={term}>
            약관 동의
          </Checkbox>
          {error && <div style={ErrorMsgStyle}>{error}</div>}
        </div>
        <div>
          <Button
            style={{ marginTop: 10 }}
            type="primary"
            htmlType="submit"
            loading={signUpLoading}
          >
            가입하기
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};
// 회원가입 기능 이상해..!

export const getServerSideProps = wrapper.getServerSideProps(
  // 프론트 서버 코드
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = ''; // 프론트 서버 코드는 하나이므로 쿠키를 지웠다가 브라우저에 쿠키 있을 때만 넣어줘야함. 안그러면 쿠키가 모두에게 공유됨..!

    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch({
      type: LOAD_MY_INFO.REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise(); // success될때까지 기다려줌.
  },
); // 페이지가 그려지기 전 실행 됨.

export default Signup;
