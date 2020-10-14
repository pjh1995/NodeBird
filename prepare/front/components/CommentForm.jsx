import React, { useCallback } from "react";
import { Form, Input, Button } from "antd";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const CommentForm = ({ post }) => {
  const id = useSelector((state) => state.user.me?.id);
  const [commentText, onChangeCommentText] = useInput("");
  const onSubmitComment = useCallback(() => {
    // callback;
  }, [commentText]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item>
        <Input.TextArea
          style={{ position: "relative", margin: 0 }}
          value={commentText}
          onChange={onChangeCommentText}
          row={4}
        />
        <Button type="primary" htmlType="submit">
          삐약
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.shape({
      id: PropTypes.string,
      nickname: PropTypes.string,
    }),
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default CommentForm;
