import React, { useCallback, useState } from "react";
import Head from "next/head";
import { Form, Checkbox, Button } from "antd";

import FormInput from "../components/FormInput";
import AppLayout from "../components/AppLayout";
import useInput from "../hooks/useInput";
import styled from "styled-components";

const ErrorMsg = styled.div`
  color: red;
`;

const Signup = () => {
  const [id, onChangeId] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordCheck, onChangePasswordCheck] = useInput("");
  const [term, setTerm] = useState("");
  const [errors, setErrors] = useState({
    password: "패스워드가 일치하지 않습니다.",
    term: false,
  });

  const onSubmit = useCallback(() => {
    console.log("submie");
    setErrors({
      password:
        password !== passwordCheck ? "패스워드가 일치하지 않습니다." : null,
      term: !term,
    });
    console.log(errors.password);
    console.log(errors.term);
    if (errors.password || errors.term) {
      return;
    } else {
      alert("회원가입 완료~~!");
    }
  }, [errors]);

  const onChangeTerm = useCallback(
    (e) => {
      setTerm(e.target.checked);
      setErrors({
        password: errors.password,
        term: !term,
      });
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
          error={errors.password}
        />
        <div>
          <Checkbox name="user-term" onChange={onChangeTerm} checked={term}>
            약관 동의
          </Checkbox>
          {errors.term && (
            <ErrorMsg>약관에 동의해야만 회원가입이 가능합니다.</ErrorMsg>
          )}
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

export default Signup;
