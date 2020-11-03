import React, { useCallback, useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
import { Form, Checkbox, Button } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import FormInput from '../components/FormInput';
import AppLayout from '../components/AppLayout';

import useInput from '../hooks/useInput';
import { SIGN_UP_TYPE } from '../reducers/user';

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
        type: SIGN_UP_TYPE.REQUEST,
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

export default Signup;
