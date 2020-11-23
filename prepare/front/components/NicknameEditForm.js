import { Input, Form } from 'antd';
// import styled from "styled-components";
import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useInput from '../hooks/useInput';
import { CHANGE_NICKNAME } from '../reducers/user';

// const NicknameForm = styled(Form)`
//   margin-bottom: 20px;
//   border: 1px solid #d9d9d9;
//   padding: 10px;
// `;

const NicknameEditForm = () => {
  const { me } = useSelector((state) => state.user);
  const [nickname, onChangeNickname] = useInput(me?.nickname || '');
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME.REQUEST,
      data: nickname,
    });
  }, [nickname]);

  const NicknameFormStyle = useMemo(() => {
    return {
      marginBottom: '20px',
      border: '1px solid #d9d9d9',
      padding: '10px',
    };
  }, []);

  return (
    <Form style={NicknameFormStyle}>
      <Input.Search
        value={nickname}
        onChange={onChangeNickname}
        addonBefore="닉네임"
        enterButton="수정."
        onSearch={onSubmit}
      />
    </Form>
  );
};

export default NicknameEditForm;
