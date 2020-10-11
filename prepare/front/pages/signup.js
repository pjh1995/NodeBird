import React, { useCallback, useState, useMemo } from "react";
import Head from "next/head";
import { Form, Checkbox, Button } from "antd";

import FormInput from "../components/FormInput";
import AppLayout from "../components/AppLayout";
import useInput from "../hooks/useInput";

const Signup = () => {
  const [id, onChangeId] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordCheck, onChangePasswordCheck] = useInput("");
  const [term, setTerm] = useState("");
  const [error, setError] = useState(null);

  const ErrorMsgStyle = useMemo(() => {
    return { color: "red" };
  }, []);

  const onSubmit = useCallback(() => {
    setError("");
    if (!id || !nickname || !password) {
      setError("모든 값을 입력해주세요");
    } else if (password !== passwordCheck) {
      setError("패스워드가 일치하지 않습니다.");
    } else if (!term) {
      setError("약관에 동의해야만 회원가입이 가능합니다.");
    } else {
      alert("회원가입 완료~~!");
    }
  }, [error]);

  const onChangeTerm = useCallback(
    (e) => {
      setTerm(e.target.checked);
    },
    [term]
  );

  return (
    <AppLayout>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <FormInput
          inputName="user-id"
          labelText="아이디"
          onChange={onChangeId}
          value={id}
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
          <Button style={{ marginTop: 10 }} type="primary" htmlType="submit">
            가입하기
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};
//회원가입 기능 이상해..!

export default Signup;
