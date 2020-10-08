import React from "react";
import PropTypes from "prop-types";
import { Input } from "antd";
import styled from "styled-components";

const ErrorMsg = styled.div`
  color: red;
`;

const FormInput = ({
  inputName,
  labelText,
  onChange,
  type = "text",
  value,
  isrequire = "true",
  error,
}) => {
  return (
    <div>
      <label htmlFor={inputName}>{labelText}</label>
      <br />
      <Input
        name={inputName}
        isrequire={isrequire}
        onChange={onChange}
        type={type}
        value={value}
      />
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </div>
  );
};

FormInput.propTypes = {
  inputName: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  isrequire: PropTypes.bool,
  value: PropTypes.any,
  error: PropTypes.string,
};

export default FormInput;
