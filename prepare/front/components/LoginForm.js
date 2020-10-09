import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "antd";
import Link from "next/link";
import styled from "styled-components";
import FormInput from "./FormInput";
import useInput from "../hooks/useInput";

// const ButtonWrapper = styled.div`
//   margin-top: 10px;
// `;
// const FormWrapper = styled(Form)`
//   padding: 10px;
// `;

const LoginForm = ({ setIsLoggedIn }) => {
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
    setIsLoggedIn(true);
  }, [id, password]);

  return (
    <Form style={{ padding: "10px" }} onFinish={onSubmitForm}>
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
      <div style={{ marginTop: "10px" }}>
        <Button type="primary" htmlType="submit" loading={false}>
          로그인
        </Button>
        <Link href="/signup">
          <a>회원가입</a>
        </Link>
      </div>
    </Form>
  );
};

LoginForm.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default LoginForm;
