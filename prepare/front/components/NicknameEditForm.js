import { Input, Form } from "antd";
import styled from "styled-components";
import React from "react";

const NicknameForm = styled(Form)`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 10px;
`;

const NicknameEditForm = () => {
  return (
    <NicknameForm>
      <Input.Search addonBefore="닉네임" enterButton="수정" />
    </NicknameForm>
  );
};

export default NicknameEditForm;
