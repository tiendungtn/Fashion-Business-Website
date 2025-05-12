import { Input } from "antd";
import React from "react";

const InputComponent = ({ size, placeholder, style, ...rests }) => {
  return (
    <div>
      <Input size={size} placeholder={placeholder} style={style} {...rests} />
    </div>
  );
};

export default InputComponent;
