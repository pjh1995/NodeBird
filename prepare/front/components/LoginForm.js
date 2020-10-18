import React, { useCallback, useState } from "react";
import { Form, Button } from "antd";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
// import styled from "styled-components";

import FormInput from "./FormInput";
import useInput from "../hooks/useInput";
import { loginRequestAction } from "../reducers/user";

// const ButtonWrapper = styled.div`
//   margin-top: 10px;
// `;
// const FormWrapper = styled(Form)`
//   padding: 10px;
// `;

const LoginForm = () => {
  const dispatch = useDispatch();
  const { logInLoading } = useSelector((state) => state.user);
  const [id, onChangeId] = useInput("");
  const [password, setPassword] = useState("");

  const errors = {
    id: null,
    password: null,
  };

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [password]
  );

  const onSubmitForm = useCallback(() => {
    //e.preventDefault(); 이미 적용 되어있음.
    dispatch(loginRequestAction({ id, password }));
  }, [id, password]);

  return (
    <Form onFinish={onSubmitForm}>
      <FormInput
        inputName="user-id"
        labelText="아이디"
        onChange={onChangeId}
        value={id}
      />
      <FormInput
        inputName="user-password"
        labelText="비밀번호"
        type="password"
        onChange={onChangePassword}
        error={errors.password}
        value={password}
      />
      <div>
        <Button type="primary" htmlType="submit" loading={logInLoading}>
          로그인
        </Button>
        <Link href="/signup">
          <a>회원가입</a>
        </Link>
      </div>
    </Form>
  );
};

LoginForm.propTypes = {};

export default LoginForm;
