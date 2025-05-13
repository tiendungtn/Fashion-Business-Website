import { Input } from "antd";
import React, { useState } from "react";
import { WrapperInputStyle } from "./style";

const InputForm = (props) => {
  const { valueInput, setValueInput } = useState();
  const { placeholder = "Nhap noi dung", ...rests } = props;
  return (
    <WrapperInputStyle
      placeholder={placeholder}
      value={valueInput}
      {...rests}
    />
  );
};

export default InputForm;
